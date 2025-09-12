import { RequestHandler } from "express";

export type Artist = {
  id: string;
  name: string;
  biography?: string;
  avatarUrl?: string;
  website?: string;
  nationality?: string;
  birthYear?: number | null;
  categories?: string[];
};

export const artists: Artist[] = [
  {
    id: "a1",
    name: "Mara Kova",
    biography:
      "Abstract painter whose large-scale canvases explore color fields and tactile layering. Her work investigates memory through texture and light.",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    nationality: "Albanian",
    birthYear: 1990,
    categories: ["Painting", "Abstract"],
  },
  {
    id: "a2",
    name: "Omar Rios",
    biography:
      "Street photographer capturing the pulse of urban life—rhythms of people, geometry of architecture, and fleeting moments in transit.",
    avatarUrl:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop",
    nationality: "Mexican",
    birthYear: 1985,
    categories: ["Photography", "Street"],
  },
  {
    id: "a3",
    name: "Aya Tanaka",
    biography:
      "Sculptor working with stone and cast materials to craft quiet forms that balance weight and grace in space.",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    nationality: "Japanese",
    birthYear: 1988,
    categories: ["Sculpture"],
  },
  {
    id: "a4",
    name: "Leila Haddad",
    biography:
      "Painter and printmaker whose work weaves North African motifs with contemporary color theory, creating vibrant narratives on canvas.",
    avatarUrl:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop",
    nationality: "Moroccan",
    birthYear: 1987,
    categories: ["Painting", "Printmaking"],
  },
  {
    id: "a5",
    name: "Jonas Müller",
    biography:
      "Mixed‑media artist exploring material contrast—paper, steel, and found objects—composed into rhythmic wall pieces.",
    avatarUrl:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop",
    nationality: "German",
    birthYear: 1982,
    categories: ["Mixed Media", "Installation"],
  },
];

export const listArtists: RequestHandler = (_req, res) => {
  res.json(artists);
};

export const getArtist: RequestHandler = (req, res) => {
  const found = artists.find((a) => a.id === req.params.id);
  if (!found) return res.status(404).json({ message: "Artist not found" });
  res.json(found);
};

export const createArtist: RequestHandler = (req, res) => {
  const id = (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) as string;
  const payload = req.body as Partial<Artist>;
  const artist: Artist = {
    id,
    name: payload.name || "Unnamed",
    biography: payload.biography || "",
    avatarUrl: payload.avatarUrl || "",
    website: payload.website || "",
    nationality: payload.nationality || "",
    birthYear: payload.birthYear ?? null,
    categories: payload.categories || [],
  };
  artists.push(artist);
  res.status(201).json(artist);
};

export const updateArtist: RequestHandler = (req, res) => {
  const idx = artists.findIndex((a) => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Artist not found" });
  const payload = req.body as Partial<Artist>;
  const updated = { ...artists[idx], ...payload, id: artists[idx].id } as Artist;
  artists[idx] = updated;
  res.json(updated);
};

export const deleteArtist: RequestHandler = (req, res) => {
  const idx = artists.findIndex((a) => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Artist not found" });
  const removed = artists.splice(idx, 1)[0];
  res.json(removed);
};
