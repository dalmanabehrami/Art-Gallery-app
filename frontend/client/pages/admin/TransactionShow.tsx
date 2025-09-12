import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { OrdersApi, type Order } from "@/api/orders";
import { ArtworksApi, type Artwork } from "@/api/artworks";
import { ArtistsApi, type Artist } from "@/api/artists";

export default function AdminTransactionShow() {
  const { id = "" } = useParams();
  const ordersQ = useQuery<Order[]>({ queryKey: ["orders"], queryFn: () => OrdersApi.list() });
  const artworksQ = useQuery<Artwork[]>({ queryKey: ["artworks"], queryFn: () => ArtworksApi.list() });
  const artistsQ = useQuery<Artist[]>({ queryKey: ["artists"], queryFn: () => ArtistsApi.list() });

  const order = (ordersQ.data || []).find((o) => o.id === id);
  const art = artworksQ.data?.find((a) => a.id === order?.artworkId);
  const artist = artistsQ.data?.find((a) => a.id === order?.artistId);

  if (!order) return <div className="container py-10 md:py-14">Transaction not found.</div>;

  return (
    <div className="container py-10 md:py-14">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl">Transaction</h1>
          <p className="text-sm text-muted-foreground">ID: {order.id}</p>
        </div>
        <Link className="underline" to="/admin/orders">Back to Transactions</Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="text-xs uppercase text-muted-foreground">Artwork</div>
          <div className="mt-1 text-sm font-medium">{art?.title || order.artworkId}</div>
          <div className="text-xs text-muted-foreground">By {artist?.name || order.artistId}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-xs uppercase text-muted-foreground">Buyer</div>
          <div className="mt-1 text-sm font-medium">{order.buyerName}</div>
          <div className="text-xs text-muted-foreground">{order.buyerEmail || "-"}</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-xs uppercase text-muted-foreground">Payment</div>
          <div className="mt-1 text-sm font-medium">€{(order.price || 0).toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">{order.discountPercent ? `${order.discountPercent}% discount` : "No discount"}</div>
          <div className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
