import { useQuery } from "@tanstack/react-query";
import { OrdersApi, type Order } from "@/api/orders";
import { ArtworksApi, type Artwork } from "@/api/artworks";
import { ArtistsApi, type Artist } from "@/api/artists";

export default function AdminOrders() {
  const ordersQ = useQuery<Order[]>({ queryKey: ["orders"], queryFn: () => OrdersApi.list() });
  const artworksQ = useQuery<Artwork[]>({ queryKey: ["artworks"], queryFn: () => ArtworksApi.list() });
  const artistsQ = useQuery<Artist[]>({ queryKey: ["artists"], queryFn: () => ArtistsApi.list() });
  const aMap = new Map((artworksQ.data || []).map((a) => [a.id, a] as const));
  const artistMap = new Map((artistsQ.data || []).map((a) => [a.id!, a] as const));

  return (
    <div>
      <h1 className="font-display text-2xl">Transactions</h1>
      <p className="text-sm text-muted-foreground">All transactions</p>
      <div className="mt-2 text-sm text-muted-foreground">Total: {(ordersQ.data || []).length}</div>
      <div className="mt-4 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-left">
            <tr>
              <th className="p-3">Artwork</th>
              <th className="p-3">Artist</th>
              <th className="p-3">Buyer</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3">Discount</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {(ordersQ.data || []).slice().reverse().map((o) => (
              <tr key={o.id} className="border-t">
                <td className="p-3">{aMap.get(o.artworkId)?.title || o.artworkId}</td>
                <td className="p-3">{artistMap.get(o.artistId)?.name || o.artistId}</td>
                <td className="p-3">{o.buyerName} ({o.buyerEmail || "-"})</td>
                <td className="p-3 text-right">€{(o.price || 0).toFixed(2)}</td>
                <td className="p-3">{o.discountPercent ? `${o.discountPercent}%` : "-"}</td>
                <td className="p-3">{new Date(o.createdAt).toLocaleString()}</td>
                <td className="p-3 text-right"><a className="rounded-md border px-2 py-1 text-xs" href={`/admin/transactions/${o.id}`}>View</a></td>
              </tr>
            ))}
            {ordersQ.data?.length ? null : (
              <tr><td className="p-4 text-muted-foreground" colSpan={6}>No orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
