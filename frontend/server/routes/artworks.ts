import type { RequestHandler } from "express";

import type { RequestHandler } from "express";

export type Artwork = {
  id: string;
  artistId: string;
  title: string;
  imageUrl: string;
  year?: number;
  price?: number;
};

// Seeded artworks per artist (15+ each)
export const artworks: Artwork[] = [
  // Mara Kova (a1)
  { id: "a1-w1", artistId: "a1", title: "Echoes I", imageUrl: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop" },
  { id: "a1-w2", artistId: "a1", title: "Echoes II", imageUrl: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?q=80&w=1200&auto=format&fit=crop" },
  { id: "a1-w3", artistId: "a1", title: "Saffron Field", imageUrl: "https://images.unsplash.com/photo-1504198266285-165a16f0c8ea?q=80&w=1200&auto=format&fit=crop" },
  { id: "a1-w4", artistId: "a1", title: "Azure Drift", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop" },
  { id: "a1-w5", artistId: "a1", title: "Vermilion", imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1200&auto=format&fit=crop" },
  { id: "a1-w6", artistId: "a1", title: "Nocturne", imageUrl: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1200&auto=format&fit=crop" },
  { id: "a1-w7", artistId: "a1", title: "Opal Mist", imageUrl: "https://images.unsplash.com/photo-1531829039722-d3fb3e705a4b?q=80&w=1200&auto=format&fit=crop" },
  { id: "a1-w8", artistId: "a1", title: "Tide", imageUrl: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop" },
  { id: "a1-w9", artistId: "a1", title: "Bloom", imageUrl: "https://images.unsplash.com/photo-1458530970867-aaa3700e9668?q=80&w=1200&auto=format&fit=crop" },
  { id: "a1-w10", artistId: "a1", title: "Prism", imageUrl: "https://images.unsplash.com/photo-1516357231954-91487b459602?q=80&w=1200&auto=format&fit=crop" },
  { id: "a1-w11", artistId: "a1", title: "Aurora", imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" },
  { id: "a1-w12", artistId: "a1", title: "Driftwood", imageUrl: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1200&auto=format&fit=crop" },
  { id: "a1-w13", artistId: "a1", title: "Iridescent", imageUrl: "https://images.unsplash.com/photo-1504199367641-aba8151af406?q=80&w=1200&auto=format&fit=crop" },
  { id: "a1-w14", artistId: "a1", title: "Pulse", imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop" },
  { id: "a1-w15", artistId: "a1", title: "Chromatic", imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop" },

  // Omar Rios (a2)
  { id: "a2-w1", artistId: "a2", title: "City Veins", imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop" },
  { id: "a2-w2", artistId: "a2", title: "Concrete Dreams", imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop" },
  { id: "a2-w3", artistId: "a2", title: "Subway", imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop" },
  { id: "a2-w4", artistId: "a2", title: "Rain", imageUrl: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1200&auto=format&fit=crop" },
  { id: "a2-w5", artistId: "a2", title: "Neon", imageUrl: "https://images.unsplash.com/photo-1469474968028-8f39a6e7f5d6?q=80&w=1200&auto=format&fit=crop" },
  { id: "a2-w6", artistId: "a2", title: "Crosswalk", imageUrl: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1200&auto=format&fit=crop" },
  { id: "a2-w7", artistId: "a2", title: "Shade", imageUrl: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1200&auto=format&fit=crop" },
  { id: "a2-w8", artistId: "a2", title: "Blocks", imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop" },
  { id: "a2-w9", artistId: "a2", title: "Crowd", imageUrl: "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?q=80&w=1200&auto=format&fit=crop" },
  { id: "a2-w10", artistId: "a2", title: "Horizon", imageUrl: "https://images.unsplash.com/photo-1490197415175-074fd86b1fcc?q=80&w=1200&auto=format&fit=crop" },
  { id: "a2-w11", artistId: "a2", title: "Cranes", imageUrl: "https://images.unsplash.com/photo-1473187983305-f615310e7daa?q=80&w=1200&auto=format&fit=crop" },
  { id: "a2-w12", artistId: "a2", title: "Cycle", imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop" },
  { id: "a2-w13", artistId: "a2", title: "Maze", imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop" },
  { id: "a2-w14", artistId: "a2", title: "Lines", imageUrl: "https://images.unsplash.com/photo-1469474968028-7ab5a9c8bd85?q=80&w=1200&auto=format&fit=crop" },
  { id: "a2-w15", artistId: "a2", title: "Signals", imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop" },

  // Aya Tanaka (a3)
  { id: "a3-w1", artistId: "a3", title: "Stone Poem", imageUrl: "https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=1200&auto=format&fit=crop" },
  { id: "a3-w2", artistId: "a3", title: "Balance", imageUrl: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=1200&auto=format&fit=crop" },
  { id: "a3-w3", artistId: "a3", title: "Curve", imageUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1200&auto=format&fit=crop" },
  { id: "a3-w4", artistId: "a3", title: "Cast", imageUrl: "https://images.unsplash.com/photo-1532635224-7a9f2c0d4f36?q=80&w=1200&auto=format&fit=crop" },
  { id: "a3-w5", artistId: "a3", title: "Fold", imageUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop" },
  { id: "a3-w6", artistId: "a3", title: "Axis", imageUrl: "https://images.unsplash.com/photo-1549880187-7f1e6c1fbc4b?q=80&w=1200&auto=format&fit=crop" },
  { id: "a3-w7", artistId: "a3", title: "Grain", imageUrl: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1200&auto=format&fit=crop" },
  { id: "a3-w8", artistId: "a3", title: "Form", imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop" },
  { id: "a3-w9", artistId: "a3", title: "Hollow", imageUrl: "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1200&auto=format&fit=crop" },
  { id: "a3-w10", artistId: "a3", title: "Monolith", imageUrl: "https://images.unsplash.com/photo-1469474968028-8f39a6e7f5d6?q=80&w=1200&auto=format&fit=crop" },
  { id: "a3-w11", artistId: "a3", title: "Tactile", imageUrl: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1200&auto=format&fit=crop" },
  { id: "a3-w12", artistId: "a3", title: "Lumen", imageUrl: "https://images.unsplash.com/photo-1520975922323-3d1a92e1b3cf?q=80&w=1200&auto=format&fit=crop" },
  { id: "a3-w13", artistId: "a3", title: "Torque", imageUrl: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1200&auto=format&fit=crop" },
  { id: "a3-w14", artistId: "a3", title: "Shell", imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1200&auto=format&fit=crop" },
  { id: "a3-w15", artistId: "a3", title: "Vessel", imageUrl: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop" },
];

// Add seeds for Leila Haddad (a4)
for (let i = 1; i <= 15; i++) {
  artworks.push({
    id: `a4-w${i}`,
    artistId: "a4",
    title: `Spice Market ${i}`,
    imageUrl: `https://images.unsplash.com/photo-15${(80 + i).toString().padStart(2, "0")}0855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop`,
  });
}

// Add seeds for Jonas Müller (a5)
for (let i = 1; i <= 15; i++) {
  artworks.push({
    id: `a5-w${i}`,
    artistId: "a5",
    title: `Assemblage ${i}`,
    imageUrl: `https://images.unsplash.com/photo-15${(60 + i).toString().padStart(2, "0")}4314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop`,
  });
}

// Ensure each artwork has a price
artworks.forEach((a, idx) => {
  if (a.price == null) a.price = 200 + (idx % 20) * 15; // 200..485
});

export const listArtworksByArtist: RequestHandler = (req, res) => {
  const byArtist = artworks.filter((w) => w.artistId === req.params.id);
  res.json(byArtist);
};

export const listAllArtworks: RequestHandler = (_req, res) => {
  res.json(artworks);
};

export const getArtwork: RequestHandler = (req, res) => {
  const art = artworks.find((a) => a.id === req.params.id);
  if (!art) return res.status(404).json({ message: "Artwork not found" });
  res.json(art);
};

export const createArtwork: RequestHandler = (req, res) => {
  const payload = req.body as Partial<Artwork>;
  const id = (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) as string;
  if (!payload.artistId || !payload.title || !payload.imageUrl) {
    return res.status(400).json({ message: "artistId, title, and imageUrl are required" });
  }
  const art: Artwork = {
    id,
    artistId: payload.artistId,
    title: payload.title,
    imageUrl: payload.imageUrl,
    year: payload.year,
    price: payload.price ?? 200,
  } as Artwork;
  artworks.push(art);
  res.status(201).json(art);
};
