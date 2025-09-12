import { useQuery } from "@tanstack/react-query";
import { ExhibitionsApi, type Exhibition } from "@/api/exhibitions";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Images } from "lucide-react";
import { Button } from "@/components/ui/button";

function formatRange(s: string, e: string) {
  const sd = new Date(s);
  const ed = new Date(e);
  const sFmt = sd.toLocaleDateString(undefined, { month: "short", day: "2-digit" });
  const eFmt = ed.toLocaleDateString(undefined, { month: "short", day: "2-digit" });
  return `${sFmt} – ${eFmt}`;
}

function ExhibitionCard({ ex }: { ex: Exhibition }) {
  const artworksCount = ex.artworks.length;
  return (
    <Link to={`/exhibitions/${ex.id}`} className="group block overflow-hidden rounded-lg border bg-card shadow-sm">
      <img src={ex.coverImage} alt={ex.title} className="h-48 w-full object-cover transition-transform group-hover:scale-[1.02]" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">#{ex.id}</div>
            <div className="mt-0.5 text-base font-medium group-hover:underline">{ex.title}</div>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{ex.description}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {formatRange(ex.startDate, ex.endDate)}</span>
              <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {ex.venue.name}{ex.venue.city ? `, ${ex.venue.city}` : ""}</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-muted-foreground"><Images className="h-3.5 w-3.5" /> {artworksCount}</span>
        </div>
      </div>
    </Link>
  );
}

export default function ExhibitionsIndex() {
  const q = useQuery<Exhibition[]>({ queryKey: ["exhibitions"], queryFn: () => ExhibitionsApi.list() });
  return (
    <div className="container py-10 md:py-14">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl">Exhibitions</h1>
          <p className="text-sm text-muted-foreground">All exhibitions with dates, venues, and included artworks.</p>
        </div>
        <Button asChild variant="secondary"><Link to="/artworks">Browse Artworks</Link></Button>
      </div>

      {q.isLoading ? (
        <div className="mt-6 text-muted-foreground">Loading...</div>
      ) : q.data && q.data.length ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {q.data.map((ex) => (
            <ExhibitionCard key={ex.id} ex={ex} />
          ))}
        </div>
      ) : (
        <div className="mt-6 text-sm text-muted-foreground">No exhibitions yet.</div>
      )}
    </div>
  );
}
