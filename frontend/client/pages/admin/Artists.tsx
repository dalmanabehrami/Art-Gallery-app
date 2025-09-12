import { useQuery } from "@tanstack/react-query";
import { ArtistsApi, type Artist } from "@/api/artists";
import { ArtworksApi, type Artwork } from "@/api/artworks";
import { OrdersApi } from "@/api/orders";

export default function AdminArtists() {
  const artistsQ = useQuery<Artist[]>({ queryKey: ["artists"], queryFn: () => ArtistsApi.list() });
  const artworksQ = useQuery<Artwork[]>({ queryKey: ["artworks"], queryFn: () => ArtworksApi.list() });
  const reportQ = useQuery({ queryKey: ["sales"], queryFn: () => OrdersApi.report() });

  const counts = new Map<string, number>();
  (artworksQ.data || []).forEach((w) => counts.set(w.artistId, (counts.get(w.artistId) || 0) + 1));
  const sales = new Map((reportQ.data?.byArtist || []).map((x: any) => [x.artistId, x] as const));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl">Artists</h1>
          <p className="text-sm text-muted-foreground">Roster overview and performance</p>
        </div>
        <a className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90" href="/artists/new">Add Artist</a>
      </div>
      <div className="mt-4 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-left">
            <tr>
              <th className="p-3">Artist</th>
              <th className="p-3 text-right">Artworks</th>
              <th className="p-3 text-right">Orders</th>
              <th className="p-3 text-right">Revenue</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(artistsQ.data || []).map((a) => {
              const s = sales.get(a.id!);
              return (
                <tr key={a.id} className="border-t">
                  <td className="p-3">{a.name}</td>
                  <td className="p-3 text-right">{counts.get(a.id!) || 0}</td>
                  <td className="p-3 text-right">{s?.count || 0}</td>
                  <td className="p-3 text-right">€{(s?.revenue || 0).toFixed(2)}</td>
                  <td className="p-3 text-right">
                    <a className="rounded-md border px-2 py-1 text-xs" href={`/admin/artists/${a.id}`}>Manage</a>
                    <a className="ml-2 rounded-md border px-2 py-1 text-xs" href={`/admin/artists/${a.id}#orders`}>View Orders</a>
                    <a className="ml-2 rounded-md border px-2 py-1 text-xs" href={`/admin/artists/${a.id}#artworks`}>View Artworks</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
