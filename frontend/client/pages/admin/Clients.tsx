import { useQuery } from "@tanstack/react-query";
import { OrdersApi, type ClientSummary } from "@/api/orders";
import { Link } from "react-router-dom";

export default function AdminClients() {
  const clientsQ = useQuery<ClientSummary[]>({ queryKey: ["clients"], queryFn: () => OrdersApi.clients() });

  return (
    <div className="container py-10 md:py-14">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Client Management</h1>
          <p className="text-sm text-muted-foreground">Overview of customers and their purchases.</p>
        </div>
        <Link className="underline" to="/admin">Back to Dashboard</Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-right">Total Purchases</th>
              <th className="p-3 text-right">Total Spent</th>
              <th className="p-3">Last Purchase</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(clientsQ.data || []).map((c) => (
              <tr key={c.buyerEmail} className="border-t">
                <td className="p-3">{c.buyerName}</td>
                <td className="p-3">{c.buyerEmail}</td>
                <td className="p-3 text-right">{c.totalPurchases}</td>
                <td className="p-3 text-right">€{c.totalSpent.toFixed(2)}</td>
                <td className="p-3">{c.lastPurchaseAt ? new Date(c.lastPurchaseAt).toLocaleString() : "-"}</td>
                <td className="p-3 text-right">
                  <Link className="rounded-md border px-3 py-1" to={`/admin/clients/${encodeURIComponent(c.buyerEmail)}`}>View Transactions</Link>
                </td>
              </tr>
            ))}
            {clientsQ.data?.length ? null : (
              <tr><td className="p-4 text-muted-foreground" colSpan={6}>No clients yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
