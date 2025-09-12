import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArtistsApi, type Artist } from "@/api/artists";
import { ArtworksApi, type Artwork } from "@/api/artworks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/ui/back-button";

const PORTRAITS = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520975922323-3d1a92e1b3cf?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
];

function h(str: string) {
  let x = 0;
  for (let i = 0; i < str.length; i++) x = (x << 5) - x + str.charCodeAt(i);
  return Math.abs(x);
}

function portraitFor(a: Artist) {
  const i = h((a.id || a.name || "").toString()) % PORTRAITS.length;
  return PORTRAITS[i];
}

const MEDIUMS = ["oil", "acrylic", "mixed media", "digital", "sculpture", "photography"];
const THEMES = ["landscape", "portrait", "abstract", "expressionist", "surreal", "minimalist"];

function bioFor(a: Artist) {
  const m = MEDIUMS[h(a.name || "0") % MEDIUMS.length];
  const t = THEMES[h((a.nationality || "0") + a.name) % THEMES.length];
  const nat = a.nationality || "the region";
  return `${a.name} is an artist from ${nat}, working primarily in ${m}. Their recent work explores ${t} motifs with a focus on texture, color, and form.`;
}

export default function ArtistsByCountry() {
  const { country = "" } = useParams();

  const { data: artists, isLoading: loadingA, error: errA } = useQuery<Artist[], Error>({
    queryKey: ["artists"],
    queryFn: () => ArtistsApi.list(),
  });
  const { data: artworks, isLoading: loadingW, error: errW } = useQuery<Artwork[], Error>({
    queryKey: ["artworks"],
    queryFn: () => ArtworksApi.list(),
  });

  const filtered = useMemo(() => {
    const list = artists || [];
    if (!country) return list;
    const s = country.toLowerCase();
    return list.filter((a) => (a.nationality || "").toLowerCase().includes(s));
  }, [artists, country]);


  const byArtist = useMemo(() => {
    const map: Record<string, Artwork[]> = {};
    for (const a of artworks || []) {
      if (!a.artistId) continue;
      if (!map[a.artistId]) map[a.artistId] = [];
      map[a.artistId].push(a);
    }
    return map;
  }, [artworks]);


  const title = country ? `Artists from ${country}` : "Artists";

  return (
    <div className="container py-10 md:py-14">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="mb-2"><BackButton /></div>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">Browse creators by country and explore their works.</p>
        </div>
        <Button asChild variant="ghost"><Link to="/artists">All artists</Link></Button>
      </div>

      {loadingA || loadingW ? (
        <div className="mt-8 text-muted-foreground">Loading…</div>
      ) : errA ? (
        <div className="mt-8 text-destructive">{errA.message}</div>
      ) : errW ? (
        <div className="mt-8 text-destructive">{errW.message}</div>
      ) : filtered.length ? (
        <div className="mt-8 space-y-10">
          {filtered.map((artist) => {
            const works = byArtist[artist.id || ""] || [];
            return (
              <section key={artist.id || artist.name} className="rounded-xl border p-4 shadow-sm bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/40">
                <div className="grid gap-4 md:grid-cols-[220px_1fr] md:gap-6">
                  <img
                    src={artist.avatarUrl || portraitFor(artist)}
                    alt={artist.name}
                    className="h-48 w-full rounded-lg object-cover md:h-56"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold">{artist.name}</h2>
                      {artist.nationality ? <Badge variant="secondary">{artist.nationality}</Badge> : null}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">{artist.biography && artist.biography.trim() ? artist.biography : bioFor(artist)}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-sm font-medium">Their artworks</div>
                    <Button asChild size="sm" variant="ghost"><Link to={`/artworks?artist=${artist.id}`}>See more</Link></Button>
                  </div>
                  {works.length ? (
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {works.slice(0,4).map((w) => (
                        <Link key={w.id} to={`/artworks/${w.id}`} className="group block overflow-hidden rounded-lg border bg-card">
                          <img src={w.imageUrl} alt={w.title} className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                          <div className="px-2 py-1 text-xs font-medium truncate group-hover:underline">{w.title}</div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-md border p-4 text-sm text-muted-foreground">No artworks yet.</div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="mt-10 rounded-md border p-6 text-sm text-muted-foreground">No artists found for {country}.</div>
      )}
    </div>
  );
}
