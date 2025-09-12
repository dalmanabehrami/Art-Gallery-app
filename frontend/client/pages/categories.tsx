import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, Link } from "react-router-dom";
import { ArtworksApi, type Artwork } from "@/api/artworks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Filter, Share2, X, Rows, Square } from "lucide-react";

const TYPES = [
  "Painting",
  "Sculpture",
  "Photography",
  "Digital Art",
  "Drawing",
  "Mixed Media",
  "Printmaking",
] as const;

const STYLES = [
  "Abstract",
  "Realism",
  "Impressionism",
  "Surrealism",
  "Expressionism",
  "Minimalism",
  "Conceptual Art",
] as const;

const PERIODS = [
  "Contemporary",
  "Modern",
  "Classical",
  "Renaissance",
  "Baroque",
] as const;

const THEMES = [
  "Landscape",
  "Portrait",
  "Still Life",
  "Street Art",
  "Cultural / Heritage",
] as const;

type Taxonomy = {
  type: typeof TYPES[number];
  style: typeof STYLES[number];
  period: typeof PERIODS[number];
  theme: typeof THEMES[number];
};

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

function categorize(art: Artwork): Taxonomy {
  const seed = hash(art.id + (art.title || ""));
  const t = TYPES[seed % TYPES.length];
  const s = STYLES[(seed >> 3) % STYLES.length];
  const p = PERIODS[(seed >> 5) % PERIODS.length];
  const th = THEMES[(seed >> 7) % THEMES.length];
  return { type: t, style: s, period: p, theme: th };
}

export default function Categories() {
  const { data: artworks, isLoading } = useQuery<Artwork[]>({ queryKey: ["artworks"], queryFn: () => ArtworksApi.list() });
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [view, setView] = useState<"grid" | "compact">((params.get("view") as any) || "grid");

  const active = {
    type: (params.get("type") || "") as Taxonomy["type"] | "",
    style: (params.get("style") || "") as Taxonomy["style"] | "",
    period: (params.get("period") || "") as Taxonomy["period"] | "",
    theme: (params.get("theme") || "") as Taxonomy["theme"] | "",
  };

  function updateParam(key: string, value: string | null) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "q" && query) next.set("q", query);
    next.set("view", view);
    setParams(next, { replace: true });
  }

  const list = useMemo(() => {
    const withTax = (artworks || []).map((a) => ({ art: a, tax: categorize(a) }));
    return withTax
      .filter((x) => (active.type ? x.tax.type === active.type : true))
      .filter((x) => (active.style ? x.tax.style === active.style : true))
      .filter((x) => (active.period ? x.tax.period === active.period : true))
      .filter((x) => (active.theme ? x.tax.theme === active.theme : true))
      .filter((x) => (query ? `${x.art.title}`.toLowerCase().includes(query.toLowerCase()) : true));
  }, [artworks, active.type, active.style, active.period, active.theme, query]);

  function clearAll() {
    setParams({ view }, { replace: true });
    setQuery("");
  }

  function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied. Share this filtered view!");
    });
  }

  return (
    <div className="container py-10 md:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Categories</h1>
          <p className="text-sm text-muted-foreground max-w-prose">Explore artworks by type, style, period, and theme. Mix filters and share a link to the current view.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => { const v = view === "grid" ? "compact" : "grid"; setView(v as any); updateParam("view", v); }} aria-label="Toggle view">
            {view === "grid" ? <Rows className="h-4 w-4" /> : <Square className="h-4 w-4" />} View
          </Button>
          <Button variant="secondary" onClick={copyLink}><Share2 className="mr-2 h-4 w-4" /> Share</Button>
        </div>
      </div>

      <div className="mt-6 rounded-xl border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 p-4 shadow-lg sticky top-20 md:top-24 z-30">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Filter className="h-4 w-4" /> Filters</div>
          <div className="flex flex-1 flex-wrap gap-3">
            <Select value={active.type} onValueChange={(v) => updateParam("type", v)}>
              <SelectTrigger className="w-44"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                {TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={active.style} onValueChange={(v) => updateParam("style", v)}>
              <SelectTrigger className="w-44"><SelectValue placeholder="Style" /></SelectTrigger>
              <SelectContent>
                {STYLES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={active.period} onValueChange={(v) => updateParam("period", v)}>
              <SelectTrigger className="w-44"><SelectValue placeholder="Period" /></SelectTrigger>
              <SelectContent>
                {PERIODS.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={active.theme} onValueChange={(v) => updateParam("theme", v)}>
              <SelectTrigger className="w-44"><SelectValue placeholder="Theme" /></SelectTrigger>
              <SelectContent>
                {THEMES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="ml-auto flex items-center gap-2 md:ml-0">
              <Input value={query} onChange={(e) => { setQuery(e.target.value); updateParam("q", e.target.value || null); }} placeholder="Search titles" className="w-48" />
              <Button variant="ghost" onClick={clearAll} className="text-muted-foreground">Clear</Button>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {active.type ? (
            <Badge variant="secondary" className="inline-flex items-center gap-1">Type: {active.type}<button className="ml-1" aria-label="Clear type" onClick={() => updateParam("type", null)}><X className="h-3.5 w-3.5" /></button></Badge>
          ) : null}
          {active.style ? (
            <Badge variant="secondary" className="inline-flex items-center gap-1">Style: {active.style}<button className="ml-1" aria-label="Clear style" onClick={() => updateParam("style", null)}><X className="h-3.5 w-3.5" /></button></Badge>
          ) : null}
          {active.period ? (
            <Badge variant="secondary" className="inline-flex items-center gap-1">Period: {active.period}<button className="ml-1" aria-label="Clear period" onClick={() => updateParam("period", null)}><X className="h-3.5 w-3.5" /></button></Badge>
          ) : null}
          {active.theme ? (
            <Badge variant="secondary" className="inline-flex items-center gap-1">Theme: {active.theme}<button className="ml-1" aria-label="Clear theme" onClick={() => updateParam("theme", null)}><X className="h-3.5 w-3.5" /></button></Badge>
          ) : null}
          {!active.type && !active.style && !active.period && !active.theme && !query ? (
            <span className="text-xs text-muted-foreground">No filters applied</span>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">{isLoading ? "Loading..." : `${list.length} result${list.length === 1 ? "" : "s"}`}</div>
        <div className="text-sm">
          <Button asChild variant="link" className="px-0"><Link to="/">Back to Home</Link></Button>
          <span className="mx-2 text-muted-foreground">•</span>
          <Button asChild variant="link" className="px-0"><Link to="/artworks">Explore Artworks</Link></Button>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-8 text-muted-foreground">Loading artworks…</div>
      ) : list.length ? (
        <div className={view === "grid" ? "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"}>
          {list.map(({ art, tax }) => (
            <Link key={art.id} to={`/artworks/${art.id}`} className="group block">
              <figure className="overflow-hidden rounded-xl border border-transparent bg-card/80 ring-1 ring-border/50 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/60 transition-all hover:shadow-lg hover:-translate-y-0.5">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className={view === "grid" ? "h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" : "h-36 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"}
                />
                <figcaption className="px-3 py-2">
                  <div className="truncate text-sm font-medium group-hover:underline">{art.title}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{tax.type}</span>
                    <span>•</span>
                    <span>{tax.style}</span>
                  </div>
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-lg border p-8 text-center text-sm text-muted-foreground">
          No artworks match these filters.
        </div>
      )}
    </div>
  );
}
