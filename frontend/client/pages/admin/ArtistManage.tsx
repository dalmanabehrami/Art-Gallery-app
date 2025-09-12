import { useParams, Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArtistsApi, type Artist } from "@/api/artists";
import { ArtworksApi, type Artwork } from "@/api/artworks";
import { OrdersApi, type Order } from "@/api/orders";
import { ReviewsApi, type Review } from "@/api/reviews";
import ArtistForm from "@/components/forms/ArtistForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminArtistManage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const artistQ = useQuery<Artist>({ queryKey: ["artist", id], enabled: !!id, queryFn: () => ArtistsApi.get(id) });
  const artworksQ = useQuery<Artwork[]>({ queryKey: ["artist", id, "artworks"], enabled: !!id, queryFn: () => ArtworksApi.byArtist(id) });
  const ordersQ = useQuery<Order[]>({ queryKey: ["artist", id, "orders"], enabled: !!id, queryFn: () => OrdersApi.listByArtist(id) });
  const reviewsQ = useQuery<Review[]>({ queryKey: ["artist", id, "reviews"], enabled: !!id, queryFn: () => ReviewsApi.byArtist(id) });

  const buyers = useMemo(() => {
    const s = new Map<string, { email: string; name: string; count: number }>();
    (ordersQ.data || []).forEach((o) => {
      const e = o.buyerEmail || "unknown@example.com";
      s.set(e, { email: e, name: o.buyerName, count: (s.get(e)?.count || 0) + 1 });
    });
    return Array.from(s.values()).sort((a, b) => b.count - a.count);
  }, [ordersQ.data]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl">Artist Management</h1>
          <p className="text-sm text-muted-foreground">Manage artworks, orders, buyers, and reviews</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>Back</Button>
      </div>

      {!artistQ.data ? (
        <div className="mt-6 text-sm text-muted-foreground">Loading…</div>
      ) : (
        <div className="mt-6 grid gap-6">
          <div className="rounded-lg border p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase text-muted-foreground">Edit Artist</div>
                <div className="mt-1 text-lg font-semibold">{artistQ.data.name}</div>
              </div>
              <div className="flex items-center gap-2">
                <a className="rounded-md border px-2 py-1 text-xs" href="/artists/new">New Artist</a>
                <Button
                  variant="ghost"
                  className="text-destructive"
                  onClick={async () => {
                    if (!confirm("Delete this artist?")) return;
                    try {
                      await ArtistsApi.delete(artistQ.data!.id!);
                      await qc.invalidateQueries({ queryKey: ["artists"] });
                      toast.success("Artist deleted");
                      navigate("/admin/artists");
                    } catch (e: any) {
                      toast.error("Failed to delete", { description: e.message });
                    }
                  }}
                >Delete</Button>
              </div>
            </div>
            <ArtistForm
              defaultValues={artistQ.data}
              submittingText="Saving..."
              onSubmit={async (values) => {
                try {
                  await ArtistsApi.update(artistQ.data!.id!, values);
                  await qc.invalidateQueries({ queryKey: ["artist", id] });
                  await qc.invalidateQueries({ queryKey: ["artists"] });
                  toast.success("Artist updated");
                } catch (e: any) {
                  toast.error("Failed to update", { description: e.message });
                }
              }}
            />
          </div>

          <div className="rounded-lg border p-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <div className="text-xs uppercase text-muted-foreground">Artist</div>
                <div className="mt-1 text-lg font-semibold">{artistQ.data.name}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-muted-foreground">Artworks</div>
                <div className="mt-1 text-lg font-semibold">{artworksQ.data?.length || 0}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-muted-foreground">Transactions</div>
                <div className="mt-1 text-lg font-semibold">{ordersQ.data?.length || 0}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="rounded-lg border">
          <div className="border-b p-4 font-medium">Artworks</div>
          <div className="grid gap-3 p-4 sm:grid-cols-2">
            {(artworksQ.data || []).map((w) => (
              <div key={w.id} className="rounded-md border p-3">
                <div className="truncate text-sm font-medium">{w.title}</div>
                <div className="text-xs text-muted-foreground">€{(w.price || 0).toFixed(2)}</div>
                <Link className="mt-2 inline-block text-xs underline" to={`/artworks/${w.id}`}>View</Link>
              </div>
            ))}
            {artworksQ.data?.length ? null : <div className="p-4 text-sm text-muted-foreground">No artworks.</div>}
          </div>
        </section>

        <section className="rounded-lg border">
          <div className="border-b p-4 font-medium">Orders <span className="text-xs text-muted-foreground">({ordersQ.data?.length || 0} total)</span></div>
          <div className="divide-y">
            {(ordersQ.data || []).slice().reverse().map((o) => (
              <div key={o.id} className="grid grid-cols-4 items-center gap-2 p-3 text-sm">
                <div className="truncate">{artworksQ.data?.find((w) => w.id === o.artworkId)?.title || o.artworkId}</div>
                <div className="truncate">{o.buyerName}</div>
                <div className="truncate">€{(o.price || 0).toFixed(2)}</div>
                <div className="truncate">{new Date(o.createdAt).toLocaleString()}</div>
              </div>
            ))}
            {ordersQ.data?.length ? null : <div className="p-4 text-sm text-muted-foreground">No orders.</div>}
          </div>
        </section>

        <section className="rounded-lg border">
          <div className="border-b p-4 font-medium">Buyers</div>
          <div className="divide-y">
            {buyers.map((b) => (
              <div key={b.email} className="grid grid-cols-3 items-center gap-2 p-3 text-sm">
                <div className="truncate">{b.name}</div>
                <div className="truncate">{b.email}</div>
                <div className="truncate text-right">{b.count} orders</div>
              </div>
            ))}
            {buyers.length ? null : <div className="p-4 text-sm text-muted-foreground">No buyers yet.</div>}
          </div>
        </section>

        <section className="rounded-lg border">
          <div className="border-b p-4 font-medium">Reviews</div>
          <div className="divide-y">
            {(reviewsQ.data || []).map((r) => (
              <div key={r.id} className="p-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{"★".repeat(r.rating)}</div>
                </div>
                {r.comment ? <p className="mt-1 text-xs text-muted-foreground">{r.comment}</p> : null}
                <div className="mt-1 text-[11px] text-muted-foreground">{new Date(r.createdAt).toLocaleString()}</div>
              </div>
            ))}
            {reviewsQ.data?.length ? null : <div className="p-4 text-sm text-muted-foreground">No reviews.</div>}
          </div>
        </section>
      </div>
    </div>
  );
}
