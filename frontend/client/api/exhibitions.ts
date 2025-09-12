export type Exhibition = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: {
    name: string;
    city?: string;
    country?: string;
    address?: string;
  };
  coverImage: string;
  artworks: string[];
};

const API_BASE = (import.meta as any).env?.VITE_API_BASE?.toString() || "/api";

async function http<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
}

export const ExhibitionsApi = {
  list: () => http<Exhibition[]>(`${API_BASE}/exhibitions`),
  get: (id: string) => http<Exhibition>(`${API_BASE}/exhibitions/${id}`),
  artworks: (id: string) => http<import("./artworks").Artwork[]>(`${API_BASE}/exhibitions/${id}/artworks`),
  create: (ex: Partial<Exhibition>) => http<Exhibition>(`${API_BASE}/exhibitions`, { method: "POST", body: JSON.stringify(ex) }),
  update: (id: string, ex: Partial<Exhibition>) => http<Exhibition>(`${API_BASE}/exhibitions/${id}`, { method: "PUT", body: JSON.stringify(ex) }),
  delete: (id: string) => http<Exhibition>(`${API_BASE}/exhibitions/${id}`, { method: "DELETE" }),
};