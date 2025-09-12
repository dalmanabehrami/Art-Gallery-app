import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { OrdersApi, type Order } from "@/api/orders";
import { ArtworksApi, type Artwork } from "@/api/artworks";

export default function ClientTransactions() {
  const { email } = useParams();
  const ordersQ = useQuery<Order[]>({ queryKey: ["client-orders", email], enabled: !!email, queryFn: () => OrdersApi.ordersByBuyer(email!) });
  const artworksQ = useQuery<Artwork[]>({ queryKey: ["artworks"], queryFn: () => ArtworksApi.list() });

  const map = new Map((artworksQ.data || []).map((a) => [a.id, a] as const));

  return (
    <div className="container py-10 md:py-14">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Transactions</h1>
          <p className="text-sm text-muted-foreground">{decodeURIComponent(email || "")}</p>
        </div>
        <Link className="underline" to="/admin/clients">Back to clients</Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-left">
            <tr>
              <th className="p-3">Artwork</th>
              <th className="p-3 text-right">Price Paid</th>
              <th className="p-3">Date</th>
              <th className="p-3">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {(ordersQ.data || []).slice().reverse().map((o) => (
              <tr key={o.id} className="border-t">
                <td className="p-3">{map.get(o.artworkId)?.title || o.artworkId}</td>
                <td className="p-3 text-right">€{(o.price || 0).toFixed(2)}</td>
                <td className="p-3">{new Date(o.createdAt).toLocaleString()}</td>
                <td className="p-3">{o.paymentMethod}</td>
              </tr>
            ))}
            {ordersQ.data?.length ? null : (
              <tr><td className="p-4 text-muted-foreground" colSpan={4}>No transactions.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
