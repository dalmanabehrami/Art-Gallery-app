import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArtistsApi, type Artist } from "@/api/artists";
import { ArtworksApi, type Artwork } from "@/api/artworks";
import { Button } from "@/components/ui/button";

export default function ArtistShow() {
  const { id } = useParams();

  const artistQ = useQuery<Artist>({
    queryKey: ["artist", id],
    enabled: !!id,
    queryFn: () => ArtistsApi.get(id!),
  });

  const artworksQ = useQuery<Artwork[]>({
    queryKey: ["artworks", id],
    enabled: !!id,
    queryFn: () => ArtworksApi.byArtist(id!),
  });

  return (
    <div className="container py-10 md:py-14">
      {artistQ.isLoading ? (
        <div className="text-muted-foreground">Loading...</div>
      ) : artistQ.data ? (
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          <div className="md:col-span-1">
            <img
              src={artistQ.data.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop"}
              alt={artistQ.data.name}
              className="h-64 w-full rounded-lg object-cover"
            />
            <h1 className="mt-4 font-display text-2xl">{artistQ.data.name}</h1>
            {artistQ.data.nationality ? (
              <div className="text-sm text-muted-foreground">{artistQ.data.nationality}</div>
            ) : null}
            {artistQ.data.biography ? (
              <p className="mt-4 text-sm text-muted-foreground whitespace-pre-line">{artistQ.data.biography}</p>
            ) : null}
            <div className="mt-6 flex gap-2">
              <Button asChild>
                <Link to={`/artists/${id}/edit`}>Edit</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/artists">Back to list</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to={`/artworks?artist=${id}`}>View Works</Link>
              </Button>
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="font-display text-xl">Artworks</h2>
            {artworksQ.isLoading ? (
              <div className="mt-4 text-muted-foreground">Loading artworks...</div>
            ) : artworksQ.data && artworksQ.data.length ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {artworksQ.data.map((w) => (
                  <figure key={w.id} className="overflow-hidden rounded-lg border bg-card">
                    <img src={w.imageUrl} alt={w.title} className="h-52 w-full object-cover" />
                    <figcaption className="px-3 py-2 text-sm">{w.title}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="mt-4 text-sm text-muted-foreground">No artworks yet.</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
