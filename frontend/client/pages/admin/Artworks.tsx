import { useQuery } from "@tanstack/react-query";
import { ArtworksApi, type Artwork } from "@/api/artworks";
import { OrdersApi, type Order } from "@/api/orders";

const TYPES = ["Painting","Sculpture","Photography","Digital Art","Drawing","Mixed Media","Printmaking"] as const;
function hash(str: string){ let h=0; for(let i=0;i<str.length;i++) h=(h<<5)-h+str.charCodeAt(i); return Math.abs(h); }
function typeOf(art: Artwork){ const seed = hash(art.id + (art.title||"")); return TYPES[seed % TYPES.length]; }

export default function AdminArtworks() {
  const artworksQ = useQuery<Artwork[]>({ queryKey: ["artworks"], queryFn: () => ArtworksApi.list() });
  const ordersQ = useQuery<Order[]>({ queryKey: ["orders"], queryFn: () => OrdersApi.list() });

  const counts = new Map<string, number>();
  (ordersQ.data || []).forEach((o) => counts.set(o.artworkId, (counts.get(o.artworkId) || 0) + 1));

  return (
    <div>
      <h1 className="font-display text-2xl">Artworks</h1>
      <p className="text-sm text-muted-foreground">Inventory and demand</p>
      <div className="mt-4 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-right">Orders</th>
            </tr>
          </thead>
          <tbody>
            {(artworksQ.data || []).map((w) => (
              <tr key={w.id} className="border-t">
                <td className="p-3">{w.title}</td>
                <td className="p-3">{typeOf(w)}</td>
                <td className="p-3 text-right">€{(w.price || 0).toFixed(2)}</td>
                <td className="p-3 text-right">{counts.get(w.id) || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
