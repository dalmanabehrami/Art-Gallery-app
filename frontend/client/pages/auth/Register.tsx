import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Register() {
  const { setRole } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<"user" | "admin" | "">("");

  function submit() {
    if (!name || !email || !selected) return alert("Please complete all fields.");
    setRole(selected);
    if (selected === "admin") navigate("/admin", { replace: true });
    else navigate("/", { replace: true });
  }

  return (
    <div className="container py-10 md:py-14">
      <h1 className="font-display text-2xl sm:text-3xl">Create an Account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Register to review artworks and manage your collection.</p>
      <div className="mt-6 grid gap-3 sm:max-w-md">
        <div className="grid gap-1">
          <label className="text-xs text-muted-foreground">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </div>
        <div className="grid gap-1">
          <label className="text-xs text-muted-foreground">Email</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="grid gap-2">
          <div className="text-sm font-medium">Choose role</div>
          <div className="grid gap-2">
            <label className={`flex cursor-pointer items-center justify-between rounded-md border p-3 ${selected === "user" ? "ring-2 ring-accent" : ""}`}>
              <span>User</span>
              <input type="radio" name="role" className="h-4 w-4" checked={selected === "user"} onChange={() => setSelected("user")} />
            </label>
            <label className={`flex cursor-pointer items-center justify-between rounded-md border p-3 ${selected === "admin" ? "ring-2 ring-accent" : ""}`}>
              <span>Admin</span>
              <input type="radio" name="role" className="h-4 w-4" checked={selected === "admin"} onChange={() => setSelected("admin")} />
            </label>
          </div>
        </div>
        <Button onClick={submit} disabled={!name || !email || !selected}>Create Account</Button>
      </div>
    </div>
  );
}
