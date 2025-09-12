import type { RequestHandler } from "express";
import { artworks } from "./artworks";

export type Order = {
  id: string;
  artworkId: string;
  artistId: string;
  buyerName: string;
  buyerEmail: string;
  price: number; // final price charged
  discountPercent?: number; // 0-100
  paymentMethod: string;
  createdAt: string; // ISO
};

const orders: Order[] = [];

export const createOrder: RequestHandler = (req, res) => {
  const { artworkId, buyerName, buyerEmail, paymentMethod, discountPercent } = req.body as Partial<Order> & { discountPercent?: number };
  const art = artworks.find((a) => a.id === artworkId);
  if (!art) return res.status(404).json({ message: "Artwork not found" });
  const id = (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) as string;
  const existing = (buyerEmail ? orders.filter((o) => o.buyerEmail === buyerEmail) : []);
  const firstTime = (buyerEmail && existing.length === 0) ? true : false;
  const appliedDiscount = firstTime && discountPercent ? Math.max(0, Math.min(100, Number(discountPercent))) : 0;
  const base = art.price ?? 0;
  const finalPrice = Math.round((base * (1 - appliedDiscount / 100)) * 100) / 100;
  const order: Order = {
    id,
    artworkId: art.id,
    artistId: art.artistId,
    buyerName: buyerName || "Anonymous",
    buyerEmail: buyerEmail || "",
    price: finalPrice,
    discountPercent: appliedDiscount,
    paymentMethod: paymentMethod || "Card",
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  res.status(201).json(order);
};

export const listOrders: RequestHandler = (_req, res) => {
  res.json(orders);
};

export const listOrdersByArtwork: RequestHandler = (req, res) => {
  const { id } = req.params;
  res.json(orders.filter((o) => o.artworkId === id));
};

export const listOrdersByArtist: RequestHandler = (req, res) => {
  const { id } = req.params;
  res.json(orders.filter((o) => o.artistId === id));
};

export const salesReport: RequestHandler = (_req, res) => {
  const totalRevenue = orders.reduce((sum, o) => sum + (o.price || 0), 0);
  const totalOrders = orders.length;
  const byArtist: Record<string, { artistId: string; count: number; revenue: number }> = {};
  for (const o of orders) {
    if (!byArtist[o.artistId]) byArtist[o.artistId] = { artistId: o.artistId, count: 0, revenue: 0 };
    byArtist[o.artistId].count += 1;
    byArtist[o.artistId].revenue += o.price || 0;
  }
  res.json({ totalRevenue, totalOrders, byArtist: Object.values(byArtist) });
};

export const listOrdersByBuyer: RequestHandler = (req, res) => {
  const { email } = req.params;
  res.json(orders.filter((o) => o.buyerEmail === email));
};

export const listClients: RequestHandler = (_req, res) => {
  const byEmail: Record<string, { buyerEmail: string; buyerName: string; totalPurchases: number; totalSpent: number; lastPurchaseAt: string | null }> = {};
  for (const o of orders) {
    const e = o.buyerEmail || "unknown@example.com";
    if (!byEmail[e]) byEmail[e] = { buyerEmail: e, buyerName: o.buyerName, totalPurchases: 0, totalSpent: 0, lastPurchaseAt: null };
    byEmail[e].totalPurchases += 1;
    byEmail[e].totalSpent += o.price || 0;
    if (!byEmail[e].lastPurchaseAt || new Date(o.createdAt) > new Date(byEmail[e].lastPurchaseAt)) byEmail[e].lastPurchaseAt = o.createdAt;
  }
  res.json(Object.values(byEmail));
};
