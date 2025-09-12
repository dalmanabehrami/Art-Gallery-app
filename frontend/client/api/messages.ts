export type Message = { id: string; name: string; email: string; body: string; createdAt: string };
const API_BASE = (import.meta as any).env?.VITE_API_BASE?.toString() || "/api";
async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, { headers: { "Content-Type": "application/json" }, ...init });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
}
export const MessagesApi = {
  list: () => http<Message[]>(`${API_BASE}/messages`),
  create: (input: { name: string; email: string; body: string }) => http<Message>(`${API_BASE}/messages`, { method: "POST", body: JSON.stringify(input) }),
};
