import { useQuery } from "@tanstack/react-query";
import { ArtworksApi, type Artwork } from "@/api/artworks";
import { ArtistsApi, type Artist } from "@/api/artists";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { OrdersApi } from "@/api/orders";
import { ReviewsApi } from "@/api/reviews";
import { useAuth } from "@/context/AuthContext";

export default function ArtworksIndex() {
  const artworksQ = useQuery<Artwork[]>({ queryKey: ["artworks"], queryFn: () => ArtworksApi.list() });
  const artistsQ = useQuery<Artist[]>({ queryKey: ["artists"], queryFn: () => ArtistsApi.list() });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { role } = useAuth();

  const map = new Map((artistsQ.data || []).map((a) => [a.id!, a] as const));
  const activeArtistId = searchParams.get("artist") || "";
  const activeArtist = activeArtistId ? map.get(activeArtistId) : undefined;

  const list = artworksQ.data?.filter((w) => (activeArtistId ? w.artistId === activeArtistId : true)) || [];

  const [buyId, setBuyId] = useState<string | null>(null);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [firstTime, setFirstTime] = useState(false);

  const [reviewId, setReviewId] = useState<string | null>(null);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);

  async function openReview(id: string) {
    if (!role) {
      if (confirm("Please sign in to write a review. Go to Sign In?")) navigate("/signin");
      return;
    }
    setReviewId(id);
    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
    try {
      const r = await ReviewsApi.listByArtwork(id);
      setReviews(r);
    } catch {}
  }

  return (
    <div className="container py-10 md:py-14">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="mb-2"><BackButton /></div>
          <h1 className="font-display text-2xl sm:text-3xl">Artworks</h1>
          <p className="text-sm text-muted-foreground">
            {activeArtist ? `Works by ${activeArtist.name}` : "All works from all artists."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="h-10 rounded-md border bg-background px-3 text-sm"
            value={activeArtistId}
            onChange={(e) => {
              const v = e.currentTarget.value;
              if (v) setSearchParams({ artist: v });
              else setSearchParams({});
            }}
          >
            <option value="">All artists</option>
            {(artistsQ.data || []).map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
          {activeArtistId ? (
            <button
              className="h-10 rounded-md border px-3 text-sm"
              onClick={() => setSearchParams({})}
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>

      {artworksQ.isLoading ? (
        <div className="mt-6 text-muted-foreground">Loading...</div>
      ) : list && list.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((w) => {
            const artist = map.get(w.artistId);
            return (
              <Link key={w.id} to={`/artworks/${w.id}`} className="group block">
                <figure className="overflow-hidden rounded-lg border bg-card">
                  <img src={w.imageUrl} alt={w.title} className="h-56 w-full object-cover transition-transform group-hover:scale-[1.02]" />
                  <figcaption className="px-3 py-2">
                    <div className="text-sm font-medium truncate group-hover:underline">{w.title}</div>
                    <div className="text-xs text-muted-foreground">{artist?.name || "Unknown Artist"}</div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">€{(w.price || 0).toFixed(2)}</span>
                      {role ? (
                        <span className="flex gap-2">
                          <Button variant="secondary" size="sm" className="h-7 px-2 text-xs" onClick={(e) => { e.preventDefault(); setBuyId(w.id); }}>
                            Buy
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 px-2 text-xs" onClick={(e) => { e.preventDefault(); openReview(w.id); }}>
                            Review
                          </Button>
                        </span>
                      ) : null}
                    </div>
                  </figcaption>
                </figure>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 text-sm text-muted-foreground">No artworks yet.</div>
      )}
      {/* Buy dialog */}
      <Dialog open={!!buyId} onOpenChange={(v) => { if (!v) setBuyId(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Purchase</DialogTitle>
            <DialogDescription>Enter your details to buy this artwork.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-2">
              <label className="text-sm">Name</label>
              <Input value={buyerName} onChange={(e) => setBuyerName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Email</label>
              <Input value={buyerEmail} onChange={async (e) => { const v = e.target.value; setBuyerEmail(v); if (v && v.includes("@")) { try { const prev = await OrdersApi.ordersByBuyer(v); setFirstTime(prev.length === 0); } catch { setFirstTime(false); } } else { setFirstTime(false); } }} placeholder="you@example.com" />
              {firstTime ? <div className="text-xs text-accent">Welcome! 20% off automatically applied to your first purchase.</div> : null}
            </div>
          </div>
          {buyId ? (
            <div className="mt-2 rounded-md border p-3 text-sm">
              {(() => {
                const w = list.find((x) => x.id === buyId);
                const base = w?.price || 0;
                const total = firstTime ? Math.round(base * 0.8 * 100) / 100 : base;
                return (
                  <div className="flex items-center justify-between">
                    <span>{w?.title}</span>
                    <span>{firstTime ? (<><s className="mr-2 opacity-70">€{base.toFixed(2)}</s> <b>€{total.toFixed(2)}</b></>) : <>€{base.toFixed(2)}</>}</span>
                  </div>
                );
              })()}
            </div>
          ) : null}
          <DialogFooter>
            <Button
              onClick={async () => {
                if (!buyId) return;
                if (!role) { if (confirm("Please sign in to purchase. Go to Sign In?")) navigate("/signin"); return; }
                try {
                  await OrdersApi.create({ artworkId: buyId, buyerName, buyerEmail, discountPercent: firstTime ? 20 : 0 });
                  setBuyId(null);
                  setBuyerName("");
                  setBuyerEmail("");
                  setFirstTime(false);
                  alert("Order placed! View it in Admin > Dashboard.");
                } catch (e: any) {
                  alert(e.message || "Failed to place order");
                }
              }}
            >
              Pay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review dialog */}
      <Dialog open={!!reviewId} onOpenChange={(v) => { if (!v) setReviewId(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Artwork Reviews</DialogTitle>
            <DialogDescription>Read and submit a review.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="max-h-40 overflow-auto rounded-md border p-3 text-sm">
              {reviews.length ? (
                <ul className="space-y-2">
                  {reviews.map((r) => (
                    <li key={r.id} className="border-b pb-2 last:border-b-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{r.name}</span>
                        <span className="text-xs text-muted-foreground">{"★".repeat(r.rating)}</span>
                      </div>
                      {r.comment ? <p className="text-xs text-muted-foreground">{r.comment}</p> : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-muted-foreground">No reviews yet.</div>
              )}
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Your name</label>
              <Input value={reviewName} onChange={(e) => setReviewName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Rating (1-5)</label>
              <Input type="number" min={1} max={5} value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Comment</label>
              <Textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                if (!reviewId) return;
                try {
                  await ReviewsApi.create({ artworkId: reviewId, name: reviewName || "Anonymous", rating: reviewRating, comment: reviewComment });
                  const r = await ReviewsApi.listByArtwork(reviewId);
                  setReviews(r);
                  setReviewName("");
                  setReviewComment("");
                  setReviewRating(5);
                } catch (e: any) {
                  alert(e.message || "Failed to submit review");
                }
              }}
            >
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
