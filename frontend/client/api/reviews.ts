export type Review = {
  id: string;
  artworkId: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};

const API_BASE = (import.meta as any).env?.VITE_API_BASE?.toString() || "/api";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, { headers: { "Content-Type": "application/json" }, ...init });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
}

export const ReviewsApi = {
  listAll: () => http<Review[]>(`${API_BASE}/reviews`),
  listByArtwork: (id: string) => http<Review[]>(`${API_BASE}/artworks/${id}/reviews`),
  byArtist: (id: string) => http<Review[]>(`${API_BASE}/artists/${id}/reviews`),
  create: (input: { artworkId: string; name: string; rating: number; comment: string }) =>
    http<Review>(`${API_BASE}/reviews`, { method: "POST", body: JSON.stringify(input) }),
};
