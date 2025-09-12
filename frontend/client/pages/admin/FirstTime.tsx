import { useQuery } from "@tanstack/react-query";
import { OrdersApi, type ClientSummary, type Order } from "@/api/orders";

export default function AdminFirstTime() {
  const clientsQ = useQuery<ClientSummary[]>({ queryKey: ["clients"], queryFn: () => OrdersApi.clients() });
  const ordersQ = useQuery<Order[]>({ queryKey: ["orders"], queryFn: () => OrdersApi.list() });

  const firstTimers = (clientsQ.data || []).filter((c) => c.totalPurchases === 1);
  const withDiscount = new Set((ordersQ.data || []).filter((o) => (o.discountPercent || 0) > 0).map((o) => o.buyerEmail));

  return (
    <div>
      <h1 className="font-display text-2xl">First-time Buyers</h1>
      <p className="text-sm text-muted-foreground">Clients on their first purchase and discount usage</p>
      <div className="mt-4 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-right">Purchases</th>
              <th className="p-3">Discount Applied</th>
              <th className="p-3">Last Purchase</th>
            </tr>
          </thead>
          <tbody>
            {firstTimers.map((c) => (
              <tr key={c.buyerEmail} className="border-t">
                <td className="p-3">{c.buyerName}</td>
                <td className="p-3">{c.buyerEmail}</td>
                <td className="p-3 text-right">{c.totalPurchases}</td>
                <td className="p-3">{withDiscount.has(c.buyerEmail) ? "Yes (20%)" : "No"}</td>
                <td className="p-3">{c.lastPurchaseAt ? new Date(c.lastPurchaseAt).toLocaleString() : "-"}</td>
              </tr>
            ))}
            {firstTimers.length ? null : (
              <tr><td className="p-4 text-muted-foreground" colSpan={5}>No first-time buyers yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
