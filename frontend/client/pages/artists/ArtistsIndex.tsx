import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ArtistCard from "@/components/artists/ArtistCard";
import { ArtistsApi, type Artist } from "@/api/artists";
import { toast } from "sonner";

const BALKANS = [
  "Albania",
  "Kosovo",
  "North Macedonia",
  "Montenegro",
  "Croatia",
  "Slovenia",
  "Greece",
];

export default function ArtistsIndex() {
  const { data, isLoading, isError, error } = useQuery<Artist[], Error>({
    queryKey: ["artists"],
    queryFn: async () => {
      try {
        return await ArtistsApi.list();
      } catch (e: any) {
        toast.error("Failed to load artists", { description: e.message });
        throw e;
      }
    },
  });


  const [params, setParams] = useSearchParams();
  const selected = params.get("country") || "";
  const setCountry = (c: string | null) => {
    const next = new URLSearchParams(params);
    if (c) next.set("country", c);
    else next.delete("country");
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    const arr = (data || []).slice();
    if (!selected) return arr;
    const s = selected.toLowerCase();
    return arr.filter((a) => (a.nationality || "").toLowerCase().includes(s));
  }, [data, selected]);


  return (
    <div className="container py-10 md:py-14">
      <div className="mt-4 grid items-center gap-6 md:grid-cols-2 md:gap-10">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Meet our artists.</h1>
          <p className="mt-2 max-w-prose text-sm text-muted-foreground">
            Discover creators from across the Balkans and beyond. Explore their stories, techniques, and influences.
          </p>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1280&auto=format&fit=crop"
            alt="Artist painting on canvas"
            className="h-56 w-full rounded-xl border object-cover shadow-md md:h-72"
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="text-base font-semibold mb-2">Countries</div>
        <ul className="space-y-2">
          {BALKANS.map((c) => (
            <li key={c}>
              <Link className="text-sm hover:underline" to={`/artists/country/${encodeURIComponent(c)}`}>{c}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        {isLoading ? "Loading..." : `${list.length} artist${list.length === 1 ? "" : "s"}${selected ? ` in ${selected}` : ""}`}
      </div>

      {isLoading ? (
        <div className="mt-8 text-muted-foreground">Loading artists…</div>
      ) : isError ? (
        <div className="mt-8 text-destructive">{error?.message}</div>
      ) : list && list.length ? (
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {list.map((a) => (
            <ArtistCard key={a.id || a.name} artist={a} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-md border p-6 text-sm text-muted-foreground">
          {selected ? `No artists found for ${selected}.` : "No artists yet."}
        </div>
      )}
    </div>
  );
}
