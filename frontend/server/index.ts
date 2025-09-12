import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { listArtists, getArtist, createArtist, updateArtist, deleteArtist } from "./routes/artists";
import { listArtworksByArtist, listAllArtworks, getArtwork, createArtwork } from "./routes/artworks";
import { createOrder, listOrders, salesReport, listOrdersByArtwork, listClients, listOrdersByBuyer, listOrdersByArtist } from "./routes/orders";
import { listReviewsByArtwork, createReview, listAllReviews, listReviewsByArtist } from "./routes/reviews";
import { listExhibitions, getExhibition, getExhibitionArtworks } from "./routes/exhibitions";
import { createExhibition, updateExhibition, deleteExhibition } from "./routes/exhibitions";
import { listMessages, createMessage } from "./routes/messages";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Artists API (in-memory demo)
  app.get("/api/artists", listArtists);
  app.get("/api/artists/:id", getArtist);
  app.post("/api/artists", createArtist);
  app.put("/api/artists/:id", updateArtist);
  app.delete("/api/artists/:id", deleteArtist);

  // Artworks
  app.get("/api/artworks", listAllArtworks);
  app.get("/api/artworks/:id", getArtwork);
  app.get("/api/artists/:id/artworks", listArtworksByArtist);
  app.post("/api/artworks", createArtwork);

  // Orders / Sales
  app.post("/api/orders", createOrder);
  app.get("/api/orders", listOrders);
  app.get("/api/artworks/:id/orders", listOrdersByArtwork);
  app.get("/api/artists/:id/orders", listOrdersByArtist);
  app.get("/api/clients", listClients);
  app.get("/api/clients/:email/orders", listOrdersByBuyer);
  app.get("/api/reports/sales", salesReport);

  // Reviews
  app.get("/api/reviews", listAllReviews);
  app.get("/api/artworks/:id/reviews", listReviewsByArtwork);
  app.get("/api/artists/:id/reviews", listReviewsByArtist);
  app.post("/api/reviews", createReview);

  // Exhibitions
  app.get("/api/exhibitions", listExhibitions);
  app.get("/api/exhibitions/:id", getExhibition);
  app.get("/api/exhibitions/:id/artworks", getExhibitionArtworks);
  app.post("/api/exhibitions", createExhibition);
  app.put("/api/exhibitions/:id", updateExhibition);
  app.delete("/api/exhibitions/:id", deleteExhibition);

  // Messages
  app.get("/api/messages", listMessages);
  app.post("/api/messages", createMessage);

  return app;
}
