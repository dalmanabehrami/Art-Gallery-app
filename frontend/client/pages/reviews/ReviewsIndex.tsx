import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ArtworksApi, type Artwork } from "@/api/artworks";
import { ReviewsApi, type Review } from "@/api/reviews";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function ReviewsIndex() {
  const { role } = useAuth();
  const artworksQ = useQuery<Artwork[]>({ queryKey: ["artworks"], queryFn: () => ArtworksApi.list() });
  const [artworkId, setArtworkId] = useState<string>("");

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const recentQ = useQuery<Review[]>({ queryKey: ["reviews", "recent"], queryFn: () => ReviewsApi.listAll() });
  const reviewsQ = useQuery<Review[]>({
    queryKey: ["reviews", artworkId],
    queryFn: () => ReviewsApi.listByArtwork(artworkId),
    enabled: !!artworkId,
  });

  useEffect(() => {
    setName("");
    setRating(5);
    setComment("");
  }, [artworkId]);

  const options = useMemo(() => (artworksQ.data || []).map((a) => ({ value: a.id, label: a.title })), [artworksQ.data]);

  async function submitReview() {
    if (!artworkId) return alert("Select an artwork to review.");
    try {
      setSubmitting(true);
      await ReviewsApi.create({ artworkId, name: name || "Anonymous", rating, comment });
      const updated = await ReviewsApi.listByArtwork(artworkId);
      reviewsQ.refetch();
      setName("");
      setRating(5);
      setComment("");
      alert("Review submitted!");
    } catch (e: any) {
      alert(e.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container py-10 md:py-14">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl">Reviews</h1>
          <p className="text-sm text-muted-foreground">Read and write reviews for artworks and exhibitions.</p>
        </div>
        <Button asChild variant="link" className="px-0"><Link to="/artworks">Explore Artworks</Link></Button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 shadow-sm lg:col-span-1">
          <div className="text-sm text-muted-foreground">Filter by artwork</div>
          <div className="mt-2">
            <Select value={artworkId} onValueChange={setArtworkId}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Choose artwork" /></SelectTrigger>
              <SelectContent>
                {options.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-medium">Write a review</h2>
            {role ? (
              <div className="mt-3 grid gap-3">
                <div className="grid gap-1">
                  <label className="text-xs text-muted-foreground">Your name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                </div>
                <div className="grid gap-1">
                  <label className="text-xs text-muted-foreground">Rating (1-5)</label>
                  <Input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} />
                </div>
                <div className="grid gap-1">
                  <label className="text-xs text-muted-foreground">Comment</label>
                  <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience" />
                </div>
                <Button onClick={submitReview} disabled={submitting || !artworkId}>Submit</Button>
              </div>
            ) : (
              <div className="mt-3 rounded-md border p-3 text-sm">
                <div className="font-medium">Sign in required</div>
                <p className="mt-1 text-muted-foreground">Please sign in to leave a comment and rating.</p>
                <Button asChild className="mt-3"><Link to="/signin">Sign In</Link></Button>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium">Recent Reviews</h2>
              {artworkId ? (
                <Badge variant="secondary">Artwork: {options.find((o) => o.value === artworkId)?.label}</Badge>
              ) : (
                <Badge variant="secondary">Select an artwork</Badge>
              )}
            </div>
            {artworkId ? (
              reviewsQ.isLoading ? (
                <div className="mt-4 text-sm text-muted-foreground">Loading…</div>
              ) : reviewsQ.data && reviewsQ.data.length ? (
                <ul className="mt-4 space-y-3">
                  {reviewsQ.data.map((r) => (
                    <li key={r.id} className="rounded-md border p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{"★".repeat(r.rating)}</div>
                      </div>
                      {r.comment ? <p className="mt-1 text-sm text-muted-foreground">{r.comment}</p> : null}
                      <div className="mt-1 text-[11px] text-muted-foreground">{new Date(r.createdAt).toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4 text-sm text-muted-foreground">No reviews yet for this artwork.</div>
              )
            ) : (
              recentQ.isLoading ? (
                <div className="mt-4 text-sm text-muted-foreground">Loading…</div>
              ) : recentQ.data && recentQ.data.length ? (
                <ul className="mt-4 space-y-3">
                  {recentQ.data.map((r) => (
                    <li key={r.id} className="rounded-md border p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{"★".repeat(r.rating)}</div>
                      </div>
                      {r.comment ? <p className="mt-1 text-sm text-muted-foreground">{r.comment}</p> : null}
                      <div className="mt-1 text-[11px] text-muted-foreground">{new Date(r.createdAt).toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4 text-sm text-muted-foreground">No recent reviews yet.</div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
