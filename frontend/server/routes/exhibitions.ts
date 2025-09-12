import type { RequestHandler } from "express";
import { artworks } from "./artworks";

export type Exhibition = {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
  venue: {
    name: string;
    city?: string;
    country?: string;
    address?: string;
  };
  coverImage: string;
  artworks: string[]; // Artwork IDs
};

export const exhibitions: Exhibition[] = [
  {
    id: "ex1",
    title: "Chromatic Echoes",
    description:
      "An exploration of color resonance and perception through abstract compositions across mediums.",
    startDate: "2024-11-20",
    endDate: "2024-12-31",
    venue: { name: "Aurelia Hall", city: "Prishtina", country: "Kosovo" },
    coverImage:
      "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1600&auto=format&fit=crop",
    artworks: ["a1-w1", "a1-w5", "a1-w10", "a5-w3"],
  },
  {
    id: "ex2",
    title: "Urban Reverie",
    description:
      "Street photography and urban narratives capturing the rhythm and glow of city life.",
    startDate: "2024-12-05",
    endDate: "2025-01-10",
    venue: { name: "Downtown Pavilion", city: "Tirana", country: "Albania" },
    coverImage:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1600&auto=format&fit=crop",
    artworks: ["a2-w2", "a2-w5", "a2-w9", "a2-w14"],
  },
  {
    id: "ex3",
    title: "Light & Form",
    description:
      "Minimal sculptures and studies on shadow, weight, and balance in contemporary form.",
    startDate: "2025-01-15",
    endDate: "2025-02-12",
    venue: { name: "East Gallery", city: "Skopje", country: "North Macedonia" },
    coverImage:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600&auto=format&fit=crop",
    artworks: ["a3-w1", "a3-w6", "a3-w10", "a3-w15"],
  },
  {
    id: "ex4",
    title: "Spice & Silk",
    description:
      "Vibrant palettes inspired by bazaars, textiles, and the movement of markets.",
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    venue: { name: "Bazaar Atrium", city: "Prizren", country: "Kosovo" },
    coverImage:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1600&auto=format&fit=crop",
    artworks: ["a4-w2", "a4-w7", "a4-w9", "a4-w14"],
  },
  {
    id: "ex5",
    title: "Assemblage Lines",
    description:
      "Industrial textures and modular compositions blending precision with chance.",
    startDate: "2025-04-10",
    endDate: "2025-05-05",
    venue: { name: "Foundry Space", city: "Peja", country: "Kosovo" },
    coverImage:
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1600&auto=format&fit=crop",
    artworks: ["a5-w1", "a5-w6", "a5-w12", "a5-w15"],
  },
];

export const listExhibitions: RequestHandler = (_req, res) => {
  res.json(exhibitions);
};

export const getExhibition: RequestHandler = (req, res) => {
  const ex = exhibitions.find((e) => e.id === req.params.id);
  if (!ex) return res.status(404).json({ message: "Exhibition not found" });
  res.json(ex);
};

export const getExhibitionArtworks: RequestHandler = (req, res) => {
  const ex = exhibitions.find((e) => e.id === req.params.id);
  if (!ex) return res.status(404).json({ message: "Exhibition not found" });
  const items = artworks.filter((a) => ex.artworks.includes(a.id));
  res.json(items);
};

export const createExhibition: RequestHandler = (req, res) => {
  const data = req.body as Partial<Exhibition>;
  if (!data.title) return res.status(400).json({ message: "Title is required" });
  const id = (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) as string;
  const ex: Exhibition = {
    id,
    title: data.title,
    description: data.description || "",
    startDate: data.startDate || new Date().toISOString().slice(0, 10),
    endDate: data.endDate || new Date().toISOString().slice(0, 10),
    venue: data.venue || { name: "TBD" },
    coverImage: data.coverImage || "",
    artworks: Array.isArray(data.artworks) ? data.artworks : [],
  };
  exhibitions.push(ex);
  res.status(201).json(ex);
};

export const updateExhibition: RequestHandler = (req, res) => {
  const { id } = req.params;
  const idx = exhibitions.findIndex((e) => e.id === id);
  if (idx === -1) return res.status(404).json({ message: "Exhibition not found" });
  const data = req.body as Partial<Exhibition>;
  exhibitions[idx] = { ...exhibitions[idx], ...data } as Exhibition;
  res.json(exhibitions[idx]);
};

export const deleteExhibition: RequestHandler = (req, res) => {
  const { id } = req.params;
  const idx = exhibitions.findIndex((e) => e.id === id);
  if (idx === -1) return res.status(404).json({ message: "Exhibition not found" });
  const removed = exhibitions.splice(idx, 1)[0];
  res.json(removed);
};
