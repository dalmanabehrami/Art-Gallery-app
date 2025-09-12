import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArtworksApi, type Artwork } from "@/api/artworks";
import { ArtistsApi, type Artist } from "@/api/artists";
import { ReviewsApi, type Review } from "@/api/reviews";
import { OrdersApi, type Order } from "@/api/orders";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ArtworkShow() {
  const { id } = useParams();

  const artQ = useQuery<Artwork>({ queryKey: ["artwork", id], enabled: !!id, queryFn: () => ArtworksApi.get(id!) });
  const artistsQ = useQuery<Artist[]>({ queryKey: ["artists"], queryFn: () => ArtistsApi.list() });
  const reviewsQ = useQuery<Review[]>({ queryKey: ["reviews", id], enabled: !!id, queryFn: () => ReviewsApi.listByArtwork(id!) });
  const ordersQ = useQuery<Order[]>({ queryKey: ["orders", id], enabled: !!id, queryFn: () => OrdersApi.listByArtwork(id!) });

  const artist = artistsQ.data?.find((a) => a.id === artQ.data?.artistId);

  const avg = reviewsQ.data && reviewsQ.data.length
    ? reviewsQ.data.reduce((s, r) => s + r.rating, 0) / reviewsQ.data.length
    : 0;
  const count = reviewsQ.data?.length || 0;

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");

  return (
    <div className="container py-10 md:py-14">
      {artQ.isLoading ? (
        <div className="text-muted-foreground">Loading...</div>
      ) : artQ.data ? (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <img src={artQ.data.imageUrl} alt={artQ.data.title} className="w-full rounded-lg border object-cover" />
          </div>
          <aside className="space-y-4">
            <div>
              <h1 className="font-display text-2xl">{artQ.data.title}</h1>
              <div className="text-sm text-muted-foreground">
                by <Link className="underline" to={`/artists/${artQ.data.artistId}`}>{artist?.name || artQ.data.artistId}</Link>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <span>{"★".repeat(Math.round(avg) || 0)}{avg ? "" : "☆"}</span>
                <span>
                  {avg ? avg.toFixed(1) : "No rating"} · {count} review{count === 1 ? "" : "s"}
                </span>
              </div>
              <div className="mt-2 text-lg font-semibold">€{(artQ.data.price || 0).toFixed(2)}</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="font-medium">Buy this artwork</div>
              <div className="mt-3 grid gap-2">
                <Input placeholder="Your name" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} />
                <Input placeholder="you@example.com" value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} />
                <Button
                  onClick={async () => {
                    if (!id) return;
                    try {
                      await OrdersApi.create({ artworkId: id, buyerName, buyerEmail });
                      setBuyerName("");
                      setBuyerEmail("");
                      await ordersQ.refetch();
                      alert("Order placed!");
                    } catch (e: any) {
                      alert(e.message || "Failed to place order");
                    }
                  }}
                >
                  Pay €{(artQ.data.price || 0).toFixed(2)}
                </Button>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="font-medium">Leave a review</div>
              <div className="mt-3 grid gap-2">
                <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} />
                <Textarea placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                <Button
                  onClick={async () => {
                    if (!id) return;
                    try {
                      await ReviewsApi.create({ artworkId: id, name: name || "Anonymous", rating, comment });
                      setName("");
                      setRating(5);
                      setComment("");
                      await reviewsQ.refetch();
                    } catch (e: any) {
                      alert(e.message || "Failed to submit review");
                    }
                  }}
                >
                  Submit review
                </Button>
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border">
          <div className="border-b p-4 font-medium">Reviews</div>
          <div className="divide-y">
            {(reviewsQ.data || []).length ? (
              reviewsQ.data!.slice().reverse().map((r) => (
                <div key={r.id} className="p-4 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{"★".repeat(r.rating)}</div>
                  </div>
                  {r.comment ? <p className="mt-1 text-muted-foreground">{r.comment}</p> : null}
                  <div className="mt-1 text-[11px] text-muted-foreground">{new Date(r.createdAt).toLocaleString()}</div>
                </div>
              ))
            ) : (
              <div className="p-4 text-sm text-muted-foreground">No reviews yet.</div>
            )}
          </div>
        </div>
        <div className="rounded-lg border">
          <div className="border-b p-4 font-medium">Transactions</div>
          <div className="divide-y">
            {(ordersQ.data || []).length ? (
              ordersQ.data!.slice().reverse().map((o) => (
                <div key={o.id} className="grid grid-cols-3 items-center gap-2 p-3 text-sm">
                  <div className="truncate">{o.buyerName}</div>
                  <div className="truncate">{new Date(o.createdAt).toLocaleString()}</div>
                  <div className="text-right">€{(o.price || 0).toFixed(2)}</div>
                </div>
              ))
            ) : (
              <div className="p-4 text-sm text-muted-foreground">No transactions yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
