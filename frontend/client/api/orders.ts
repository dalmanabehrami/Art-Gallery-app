import { z } from "zod";

export const OrderSchema = z.object({
  id: z.string(),
  artworkId: z.string(),
  artistId: z.string(),
  buyerName: z.string(),
  buyerEmail: z.string().email().or(z.literal("")),
  price: z.number(),
  discountPercent: z.number().optional().default(0),
  paymentMethod: z.string(),
  createdAt: z.string(),
});
export type Order = z.infer<typeof OrderSchema>;

export type ClientSummary = {
  buyerEmail: string;
  buyerName: string;
  totalPurchases: number;
  totalSpent: number;
  lastPurchaseAt: string | null;
};

const API_BASE = (import.meta as any).env?.VITE_API_BASE?.toString() || "/api";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, { headers: { "Content-Type": "application/json" }, ...init });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
}

export const OrdersApi = {
  create: (input: { artworkId: string; buyerName: string; buyerEmail: string; paymentMethod?: string; discountPercent?: number }) =>
    http<Order>(`${API_BASE}/orders`, { method: "POST", body: JSON.stringify(input) }),
  list: () => http<Order[]>(`${API_BASE}/orders`),
  listByArtwork: (id: string) => http<Order[]>(`${API_BASE}/artworks/${id}/orders`),
  listByArtist: (id: string) => http<Order[]>(`${API_BASE}/artists/${id}/orders`),
  report: () => http<{ totalRevenue: number; totalOrders: number; byArtist: { artistId: string; count: number; revenue: number }[] }>(`${API_BASE}/reports/sales`),
  clients: () => http<ClientSummary[]>(`${API_BASE}/clients`),
  ordersByBuyer: (email: string) => http<Order[]>(`${API_BASE}/clients/${encodeURIComponent(email)}/orders`),
};
