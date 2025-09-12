import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { OrdersApi, type Order } from "@/api/orders";
import { ArtistsApi, type Artist } from "@/api/artists";
import { ArtworksApi, type Artwork } from "@/api/artworks";
import { ReviewsApi, type Review } from "@/api/reviews";
import { ExhibitionsApi, type Exhibition } from "@/api/exhibitions";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Star, Paintbrush, Users, ShoppingCart, Plus, Search } from "lucide-react";

function monthKey(d: Date) {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  return `${y}-${m}`;
}

const lastNMonths = (n: number) => {
  const now = new Date();
  const months: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(monthKey(d));
  }
  return months;
};

export default function AdminDashboard() {
  const ordersQ = useQuery<Order[]>({ queryKey: ["orders"], queryFn: () => OrdersApi.list() });
  const reportQ = useQuery({ queryKey: ["sales"], queryFn: () => OrdersApi.report() });
  const artistsQ = useQuery<Artist[]>({ queryKey: ["artists"], queryFn: () => ArtistsApi.list() });
  const artworksQ = useQuery<Artwork[]>({ queryKey: ["artworks"], queryFn: () => ArtworksApi.list() });
  const reviewsQ = useQuery<Review[]>({ queryKey: ["reviews", "recent"], queryFn: () => ReviewsApi.listAll() });
  const exhibitionsQ = useQuery<Exhibition[]>({ queryKey: ["exhibitions"], queryFn: () => ExhibitionsApi.list() });

  const [searchQ, setSearchQ] = useState("");
  const [artistFilter, setArtistFilter] = useState<string>("all");
  const [range, setRange] = useState<"30" | "90" | "365">("90");

  const artistMap = useMemo(() => new Map((artistsQ.data || []).map((a) => [a.id!, a] as const)), [artistsQ.data]);
  const artworkMap = useMemo(() => new Map((artworksQ.data || []).map((a) => [a.id, a] as const)), [artworksQ.data]);

  const filteredOrders = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - Number(range));
    return (ordersQ.data || []).filter((o) => {
      const okDate = new Date(o.createdAt) >= cutoff;
      const okArtist = artistFilter === "all" || o.artistId === artistFilter;
      const q = searchQ.trim().toLowerCase();
      const art = artworkMap.get(o.artworkId);
      const artist = artistMap.get(o.artistId);
      const okSearch = !q ||
        o.buyerName.toLowerCase().includes(q) ||
        (art?.title || "").toLowerCase().includes(q) ||
        (artist?.name || "").toLowerCase().includes(q);
      return okDate && okArtist && okSearch;
    });
  }, [ordersQ.data, range, artistFilter, searchQ, artworkMap, artistMap]);

  const totalClients = useMemo(() => new Set((ordersQ.data || []).map((o) => o.buyerEmail || o.buyerName)).size, [ordersQ.data]);

  const avgRating = useMemo(() => {
    const arr = reviewsQ.data || [];
    if (!arr.length) return 0;
    const sum = arr.reduce((s, r) => s + (r.rating || 0), 0);
    return Math.round((sum / arr.length) * 10) / 10;
  }, [reviewsQ.data]);

  const monthlySales = useMemo(() => {
    const months = lastNMonths(12);
    const bucket = new Map(months.map((m) => [m, { month: m, revenue: 0, orders: 0 }] as const));
    for (const o of filteredOrders) {
      const k = monthKey(new Date(o.createdAt));
      if (!bucket.has(k)) continue;
      const cur = bucket.get(k)!;
      bucket.set(k, { month: k, revenue: cur.revenue + (o.price || 0), orders: cur.orders + 1 });
    }
    return months.map((m) => bucket.get(m)!);
  }, [filteredOrders]);

  const topArtists = useMemo(() => {
    const map = new Map<string, { artistId: string; count: number; revenue: number }>();
    for (const o of filteredOrders) {
      const a = map.get(o.artistId) || { artistId: o.artistId, count: 0, revenue: 0 };
      a.count += 1;
      a.revenue += o.price || 0;
      map.set(o.artistId, a);
    }
    return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [filteredOrders]);

  const topArtworks = useMemo(() => {
    const map = new Map<string, { artworkId: string; count: number; revenue: number }>();
    for (const o of filteredOrders) {
      const a = map.get(o.artworkId) || { artworkId: o.artworkId, count: 0, revenue: 0 };
      a.count += 1;
      a.revenue += o.price || 0;
      map.set(o.artworkId, a);
    }
    return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [filteredOrders]);

  const buyersPerExhibition = useMemo(() => {
    const result: { id: string; title: string; buyers: number }[] = [];
    const orders = ordersQ.data || [];
    const byEx = (exhibitionsQ.data || []).map((ex) => {
      const set = new Set<string>();
      const artSet = new Set(ex.artworks);
      for (const o of orders) if (artSet.has(o.artworkId) && o.buyerEmail) set.add(o.buyerEmail);
      return { id: ex.id, title: ex.title, buyers: set.size };
    });
    for (const r of byEx) result.push(r);
    return result;
  }, [ordersQ.data, exhibitionsQ.data]);

  return (
    <div className="container py-10 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Insights, sales, and engagement</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700" href="/artists/new">
            <Plus size={16} /> Add Artist
          </a>
          <a className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700" href="/admin/artworks">
            <Paintbrush size={16} /> Manage Artworks
          </a>
          <a className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600" href="/admin/clients">
            <Users size={16} /> Manage Clients
          </a>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-blue-50 p-4 text-blue-800">
          <div className="flex items-center justify-between text-xs uppercase opacity-80"><span>Artworks</span><Paintbrush size={16} /></div>
          <div className="mt-2 text-2xl font-semibold">{artworksQ.data?.length || 0}</div>
          <div className="text-xs opacity-70">Total artworks</div>
        </div>
        <div className="rounded-lg border bg-green-50 p-4 text-green-800">
          <div className="flex items-center justify-between text-xs uppercase opacity-80"><span>Revenue</span><ShoppingCart size={16} /></div>
          <div className="mt-2 text-2xl font-semibold">€{(reportQ.data?.totalRevenue || 0).toFixed(2)}</div>
          <div className="text-xs opacity-70">{reportQ.data?.totalOrders || 0} transactions</div>
        </div>
        <div className="rounded-lg border bg-amber-50 p-4 text-amber-800">
          <div className="flex items-center justify-between text-xs uppercase opacity-80"><span>Visitors</span><Users size={16} /></div>
          <div className="mt-2 text-2xl font-semibold">{totalClients}</div>
          <div className="text-xs opacity-70">Unique buyers</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between text-xs uppercase text-muted-foreground"><span>Avg Rating</span><Star size={16} className="text-yellow-500" /></div>
          <div className="mt-2 text-2xl font-semibold">{avgRating.toFixed(1)}</div>
          <div className="text-xs text-muted-foreground">Based on recent reviews</div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 rounded-lg border p-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={16} className="pointer-events-none absolute left-3 top-2.5 text-muted-foreground" />
            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search artworks, artists, buyers"
              className="w-full rounded-md border bg-background pl-9 pr-3 py-2 text-sm"
            />
          </div>
          <select
            value={artistFilter}
            onChange={(e) => setArtistFilter(e.target.value)}
            className="rounded-md border bg-background px-2 py-2 text-sm"
          >
            <option value="all">All artists</option>
            {(artistsQ.data || []).map((a) => (
              <option key={a.id} value={a.id!}>{a.name}</option>
            ))}
          </select>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as any)}
            className="rounded-md border bg-background px-2 py-2 text-sm"
          >
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last 12 months</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border p-4 md:col-span-2">
          <div className="mb-3 font-medium">Monthly Sales</div>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySales} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `€${v}`} tick={{ fontSize: 12 }} width={60} />
                <Tooltip formatter={(v: any) => [`€${Number(v).toFixed(2)}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#16a34a" fillOpacity={1} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-lg border">
          <div className="border-b p-4 font-medium">Buyers per Exhibition</div>
          <div className="divide-y">
            {(buyersPerExhibition || []).map((r) => (
              <div key={r.id} className="grid grid-cols-2 items-center gap-2 p-3 text-sm">
                <div className="truncate">{r.title}</div>
                <div className="text-right">{r.buyers} buyers</div>
              </div>
            ))}
            {buyersPerExhibition.length ? null : (
              <div className="p-4 text-sm text-muted-foreground">No data.</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border">
          <div className="border-b p-4 font-medium">Top Artists by Revenue</div>
          <div className="divide-y">
            {topArtists.map((r) => (
              <div key={r.artistId} className="grid grid-cols-3 items-center gap-2 p-3 text-sm">
                <div className="truncate">{artistMap.get(r.artistId)?.name || r.artistId}</div>
                <div className="text-right">{r.count} txns</div>
                <div className="text-right">€{r.revenue.toFixed(2)}</div>
              </div>
            ))}
            {topArtists.length ? null : (
              <div className="p-4 text-sm text-muted-foreground">No data.</div>
            )}
          </div>
        </div>

        <div className="rounded-lg border">
          <div className="border-b p-4 font-medium">Top Artworks by Revenue</div>
          <div className="divide-y">
            {topArtworks.map((r) => (
              <div key={r.artworkId} className="grid grid-cols-3 items-center gap-2 p-3 text-sm">
                <div className="truncate">{artworkMap.get(r.artworkId)?.title || r.artworkId}</div>
                <div className="text-right">{r.count} txns</div>
                <div className="text-right">€{r.revenue.toFixed(2)}</div>
              </div>
            ))}
            {topArtworks.length ? null : (
              <div className="p-4 text-sm text-muted-foreground">No data.</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border">
        <div className="border-b p-4 font-medium">Recent Transactions</div>
        <div className="divide-y">
          {filteredOrders.slice().reverse().slice(0, 12).map((o) => {
            const art = artworkMap.get(o.artworkId);
            const artist = artistMap.get(o.artistId);
            return (
              <div key={o.id} className="grid grid-cols-6 items-center gap-2 p-3 text-sm">
                <div className="col-span-2 truncate">{art?.title || o.artworkId}</div>
                <div className="truncate">{artist?.name || o.artistId}</div>
                <div className="truncate">{o.buyerName}</div>
                <div className="truncate">{new Date(o.createdAt).toLocaleDateString()}</div>
                <div className="text-right">€{(o.price || 0).toFixed(2)}</div>
              </div>
            );
          })}
          {filteredOrders.length ? null : (
            <div className="p-4 text-sm text-muted-foreground">No transactions yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
