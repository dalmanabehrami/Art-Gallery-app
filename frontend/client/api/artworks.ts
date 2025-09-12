export type Artwork = {
  id: string;
  artistId: string;
  title: string;
  imageUrl: string;
  year?: number;
  price?: number;
};

const API_BASE = (import.meta as any).env?.VITE_API_BASE?.toString() || "/api";

async function http<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
}

export const ArtworksApi = {
  list: () => http<Artwork[]>(`${API_BASE}/artworks`),
  get: (id: string) => http<Artwork>(`${API_BASE}/artworks/${id}`),
  byArtist: (id: string) => http<Artwork[]>(`${API_BASE}/artists/${id}/artworks`),
  create: async (data: Partial<Artwork>) => {
    const res = await fetch(`${API_BASE}/artworks`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (!res.ok) throw new Error(await res.text());
    return (await res.json()) as Artwork;
  },
};
