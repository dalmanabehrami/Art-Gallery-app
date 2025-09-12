import { useQuery } from "@tanstack/react-query";
import { MessagesApi, type Message } from "@/api/messages";

export default function AdminMessages() {
  const q = useQuery<Message[]>({ queryKey: ["messages"], queryFn: () => MessagesApi.list() });
  return (
    <div>
      <h1 className="font-display text-2xl">Messages</h1>
      <p className="text-sm text-muted-foreground">Contact form submissions</p>
      <div className="mt-4 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Message</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {(q.data || []).map((m) => (
              <tr key={m.id} className="border-t">
                <td className="p-3">{m.name}</td>
                <td className="p-3">{m.email}</td>
                <td className="p-3 max-w-lg truncate" title={m.body}>{m.body}</td>
                <td className="p-3">{new Date(m.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {q.data?.length ? null : (
              <tr><td className="p-4 text-muted-foreground" colSpan={4}>No messages yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
