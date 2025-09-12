import { useQuery } from "@tanstack/react-query";
import { ReviewsApi, type Review } from "@/api/reviews";
import { ArtworksApi, type Artwork } from "@/api/artworks";

export default function AdminReviews() {
  const recentQ = useQuery<Review[]>({ queryKey: ["reviews", "recent"], queryFn: () => ReviewsApi.listAll() });
  const artworksQ = useQuery<Artwork[]>({ queryKey: ["artworks"], queryFn: () => ArtworksApi.list() });
  const map = new Map((artworksQ.data || []).map((a) => [a.id, a] as const));

  return (
    <div>
      <h1 className="font-display text-2xl">Reviews</h1>
      <p className="text-sm text-muted-foreground">Clients and visitors who left ratings/comments</p>
      <div className="mt-4 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-left">
            <tr>
              <th className="p-3">Reviewer</th>
              <th className="p-3">Artwork</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Comment</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {(recentQ.data || []).map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.name}</td>
                <td className="p-3">{map.get(r.artworkId)?.title || r.artworkId}</td>
                <td className="p-3">{"★".repeat(r.rating)}</td>
                <td className="p-3 max-w-md truncate" title={r.comment}>{r.comment}</td>
                <td className="p-3">{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {recentQ.data?.length ? null : (
              <tr><td className="p-4 text-muted-foreground" colSpan={5}>No reviews yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
