import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ExhibitionsApi, type Exhibition } from "@/api/exhibitions";
import type { Artwork } from "@/api/artworks";
import { CalendarDays, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function formatRange(s: string, e: string) {
  const sd = new Date(s);
  const ed = new Date(e);
  const sFmt = sd.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: 'numeric' });
  const eFmt = ed.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: 'numeric' });
  return `${sFmt} – ${eFmt}`;
}

export default function ExhibitionShow() {
  const { id = "" } = useParams();
  const exQ = useQuery<Exhibition>({ queryKey: ["exhibition", id], queryFn: () => ExhibitionsApi.get(id), enabled: !!id });
  const artsQ = useQuery<Artwork[]>({ queryKey: ["exhibition", id, "artworks"], queryFn: () => ExhibitionsApi.artworks(id), enabled: !!id });

  if (exQ.isLoading) return <div className="container py-10 md:py-14">Loading...</div>;
  if (!exQ.data) return <div className="container py-10 md:py-14">Not found.</div>;
  const ex = exQ.data;

  return (
    <div className="container py-10 md:py-14">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl">{ex.title}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {formatRange(ex.startDate, ex.endDate)}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {ex.venue.name}{ex.venue.city ? `, ${ex.venue.city}` : ""}{ex.venue.country ? `, ${ex.venue.country}` : ""}</span>
          </div>
        </div>
        <Button asChild variant="outline"><Link to="/exhibitions"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link></Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border">
        <img src={ex.coverImage} alt={ex.title} className="h-64 w-full object-cover md:h-80" />
      </div>

      <p className="mt-6 max-w-3xl text-sm text-muted-foreground">{ex.description}</p>

      <h2 className="mt-8 font-display text-xl">Artworks</h2>
      {artsQ.isLoading ? (
        <div className="mt-4 text-sm text-muted-foreground">Loading artworks...</div>
      ) : artsQ.data && artsQ.data.length ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {artsQ.data.map((w) => (
            <Link key={w.id} to={`/artworks/${w.id}`} className="group block">
              <figure className="overflow-hidden rounded-lg border bg-card">
                <img src={w.imageUrl} alt={w.title} className="h-48 w-full object-cover transition-transform group-hover:scale-[1.02]" />
                <figcaption className="px-3 py-2">
                  <div className="truncate text-sm font-medium group-hover:underline">{w.title}</div>
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-4 text-sm text-muted-foreground">No artworks listed for this exhibition.</div>
      )}
    </div>
  );
}
