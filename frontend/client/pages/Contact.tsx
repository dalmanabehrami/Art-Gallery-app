import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MessagesApi } from "@/api/messages";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="container py-12 md:py-16">
      <h1 className="font-display text-3xl">Contact</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Na shkruani për bashkëpunime, ekspozita ose pyetje të tjera.</p>
      <form
        className="mt-8 max-w-xl grid gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            setLoading(true);
            await MessagesApi.create({ name, email, body });
            setName(""); setEmail(""); setBody("");
            alert("Thanks! Your message was sent.");
          } catch (err: any) {
            alert(err.message || "Failed to send");
          } finally { setLoading(false); }
        }}
      >
        <div className="grid gap-2">
          <label className="text-sm font-medium">Emri</label>
          <Input required placeholder="Emri juaj" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Email</label>
          <Input required type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Mesazhi</label>
          <Textarea required placeholder="Shkruani mesazhin tuaj" value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <Button type="submit" className="mt-2" disabled={loading}>{loading ? "Duke dërguar..." : "Dërgo"}</Button>
      </form>
    </div>
  );
}
