import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const items = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/orders", label: "Transactions" },
  { to: "/admin/clients", label: "Clients" },
  { to: "/admin/first-time", label: "First-time Buyers" },
  { to: "/admin/reviews", label: "Reviews" },
  { to: "/admin/messages", label: "Messages" },
  { to: "/admin/exhibitions", label: "Exhibitions" },
  { to: "/admin/artists", label: "Artists" },
  { to: "/admin/artworks", label: "Artworks" },
];

export default function AdminLayout() {
  return (
    <div className="container py-6 md:py-8">
      <div className="grid gap-6 md:grid-cols-[240px,1fr]">
        <aside className="rounded-lg border bg-card p-3 md:p-4">
          <nav className="grid gap-1">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                end={(it as any).end}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary",
                    isActive ? "bg-secondary text-foreground" : "text-foreground/80",
                  )
                }
              >
                {it.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <section>
          <Outlet />
        </section>
      </div>
    </div>
  );
}
