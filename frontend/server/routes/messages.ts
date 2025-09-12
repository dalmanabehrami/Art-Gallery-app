import type { RequestHandler } from "express";

export type Message = {
  id: string;
  name: string;
  email: string;
  body: string;
  createdAt: string;
};

const messages: Message[] = [];

export const listMessages: RequestHandler = (_req, res) => {
  const sorted = messages.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  res.json(sorted);
};

export const createMessage: RequestHandler = (req, res) => {
  const { name, email, body } = req.body as Partial<Message>;
  if (!name || !email || !body) return res.status(400).json({ message: "Missing fields" });
  const id = (globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) as string;
  const msg: Message = { id, name, email, body, createdAt: new Date().toISOString() };
  messages.push(msg);
  res.status(201).json(msg);
};
