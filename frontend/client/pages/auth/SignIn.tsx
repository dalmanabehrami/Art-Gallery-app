import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const { role, setRole } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<"user" | "admin" | "">("");

  useEffect(() => {
    if (role === "admin") navigate("/admin", { replace: true });
  }, [role, navigate]);

  function proceed() {
    if (!selected) return;
    setRole(selected);
    if (selected === "admin") navigate("/admin", { replace: true });
    else navigate("/", { replace: true });
  }

  return (
    <div className="container py-10 md:py-14">
      <h1 className="font-display text-2xl sm:text-3xl">Sign In</h1>
      <p className="mt-1 text-sm text-muted-foreground">Choose your role to continue.</p>
      <div className="mt-6 grid gap-4 sm:max-w-md">
        <label className={`flex cursor-pointer items-center justify-between rounded-md border p-4 ${selected === "user" ? "ring-2 ring-accent" : ""}`}>
          <div>
            <div className="font-medium">User</div>
            <div className="text-sm text-muted-foreground">Browse, review, and collect artworks.</div>
          </div>
          <input type="radio" name="role" className="h-4 w-4" checked={selected === "user"} onChange={() => setSelected("user")} />
        </label>
        <label className={`flex cursor-pointer items-center justify-between rounded-md border p-4 ${selected === "admin" ? "ring-2 ring-accent" : ""}`}>
          <div>
            <div className="font-medium">Admin</div>
            <div className="text-sm text-muted-foreground">Manage clients, sales, and content.</div>
          </div>
          <input type="radio" name="role" className="h-4 w-4" checked={selected === "admin"} onChange={() => setSelected("admin")} />
        </label>
        <Button onClick={proceed} disabled={!selected}>Continue</Button>
      </div>
    </div>
  );
}
