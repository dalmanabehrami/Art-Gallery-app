import type { RequestHandler } from "express";
import { artworks } from "./artworks";

export type Review = {
  id: string;
  artworkId: string;
  name: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
};

const reviews: Review[] = [
  { id: "r1", artworkId: "a1-w1", name: "Helena P.", rating: 5, comment: "Stunning depth of color and composition.", createdAt: new Date(Date.now() - 1000*60*60*24*6).toISOString() },
  { id: "r2", artworkId: "a2-w2", name: "Marco D.", rating: 4, comment: "Urban energy captured beautifully.", createdAt: new Date(Date.now() - 1000*60*60*24*4).toISOString() },
  { id: "r3", artworkId: "a3-w1", name: "Sara N.", rating: 5, comment: "Minimal yet powerful.", createdAt: new Date(Date.now() - 1000*60*60*24*2).toISOString() },
];

export const listReviewsByArtwork: RequestHandler = (req, res) => {
  const { id } = req.params;
  res.json(reviews.filter((r) => r.artworkId === id));
};

export const createReview: RequestHandler = (req, res) => {
  const { artworkId, name, rating, comment } = req.body as Partial<Review>;
  if (!artworkId || !name || !rating) return res.status(400).json({ message: "Missing fields" });
  const id = (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) as string;
  const review: Review = {
    id,
    artworkId,
    name,
    rating: Math.max(1, Math.min(5, Number(rating))),
    comment: comment || "",
    createdAt: new Date().toISOString(),
  };
  reviews.push(review);
  res.status(201).json(review);
};

export const listAllReviews: RequestHandler = (_req, res) => {
  const sorted = [...reviews].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  res.json(sorted.slice(0, 20));
};

export const listReviewsByArtist: RequestHandler = (req, res) => {
  const { id } = req.params;
  const ids = new Set(artworks.filter((a) => a.artistId === id).map((a) => a.id));
  const result = reviews.filter((r) => ids.has(r.artworkId));
  res.json(result);
};
