import { z } from "zod";

export const ArtistSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  biography: z.string().optional().default(""),
  avatarUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  nationality: z.string().optional().default(""),
  birthYear: z.coerce.number().int().min(0).max(new Date().getFullYear()).optional().or(z.nan()).nullable(),
  categories: z.array(z.string()).optional().default([]),
});
export type Artist = z.infer<typeof ArtistSchema>;

const API_BASE = (import.meta as any).env?.VITE_API_BASE?.toString() || "/api";

async function http<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return (await res.json()) as T;
}

export const ArtistsApi = {
  list: () => http<Artist[]>(`${API_BASE}/artists`),
  get: (id: string) => http<Artist>(`${API_BASE}/artists/${id}`),
  create: (data: Artist) => http<Artist>(`${API_BASE}/artists`, { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Artist>) => http<Artist>(`${API_BASE}/artists/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) => http<Artist>(`${API_BASE}/artists/${id}`, { method: "DELETE" }),
};
