import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Flower2, Sun, Moon, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false,
  );
  const toggle = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setDark(root.classList.contains("dark"));
  };
  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

const navItems = [
  { to: "/artworks", label: "Artworks" },
  { to: "/artists", label: "Artists" },
  { to: "/exhibitions", label: "Exhibitions" },
  { to: "/categories", label: "Categories" },
  { to: "/reviews", label: "Reviews" },
  { to: "/discounts", label: "Discounts" },
  { to: "/customers", label: "Customers" },
];

function HeaderActions() {
  const { role, signOut } = useAuth();
  const navigate = useNavigate();
  if (role) {
    return (
      <>
        <Button asChild variant="default" className="hidden sm:inline-flex">
          <Link to="/artworks">Explore</Link>
        </Button>
        {role === "admin" ? (
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link to="/admin">Admin</Link>
          </Button>
        ) : null}
        <Button
          variant="secondary"
          className="hidden sm:inline-flex"
          onClick={() => {
            signOut();
            navigate("/", { replace: true });
          }}
        >
          Sign Out
        </Button>
      </>
    );
  }
  return (
    <>
      <Button asChild variant="default" className="hidden sm:inline-flex">
        <Link to="/artworks">Explore</Link>
      </Button>
      <Button asChild variant="secondary" className="hidden sm:inline-flex">
        <Link to="/signin">Sign In</Link>
      </Button>
    </>
  );
}

export default function SiteLayout() {
  const [open, setOpen] = useState(false);
  const { role, signOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const showBack = pathname !== "/";
  return (
    <div className="relative min-h-screen flex flex-col text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(245,196,30,0.14),_transparent_60%),radial-gradient(ellipse_at_bottom,_rgba(37,86,168,0.18),_transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(255,213,79,0.14),_transparent_60%),radial-gradient(ellipse_at_bottom,_rgba(96,165,250,0.18),_transparent_60%)]"></div>
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
                        <div className="h-10 w-10 grid place-items-center rounded-full bg-primary text-white shadow-md ring-1 ring-white/30">
              <Flower2 className="h-5 w-5" strokeWidth={2.2} aria-hidden />
            </div>
            <div className="leading-tight">
              <div className="font-display text-xl font-bold tracking-tight">Vincent House</div>
              <div className="text-xs text-muted-foreground">Contemporary Art & Exhibitions</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-foreground/80",
                    isActive ? "text-foreground" : "text-foreground/70",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <HeaderActions />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden border-t bg-background transition-[max-height] duration-300 overflow-hidden",
            open ? "max-h-96" : "max-h-0",
          )}
        >
          <div className="container py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-display text-lg font-semibold">Menu</div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="grid gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary",
                      isActive ? "bg-secondary text-foreground" : "text-foreground/80",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="flex gap-2 pt-2">
                <Button asChild className="flex-1">
                  <Link to="/artworks" onClick={() => setOpen(false)}>Explore</Link>
                </Button>
                {role ? (
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => {
                      signOut();
                      setOpen(false);
                      navigate("/", { replace: true });
                    }}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button asChild variant="secondary" className="flex-1">
                    <Link to="/signin" onClick={() => setOpen(false)}>Sign In</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {showBack && (
        <div className="border-b bg-background/80">
          <div className="container py-2">
            <Button variant="outline" size="sm" onClick={() => history.back()}>
              <ArrowLeft className="mr-1" /> Back
            </Button>
          </div>
        </div>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t">
        <div className="container py-10 grid gap-8 md:grid-cols-3">
          <div>
            <div className="font-display text-lg font-semibold">Vincent House</div>
            <p className="mt-2 text-sm text-muted-foreground max-w-prose">
              Discover contemporary artworks, explore curated exhibitions, and follow your favorite artists. Built to showcase and celebrate creativity.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">Explore</div>
            <ul className="space-y-2 text-sm">
              {navItems.slice(0, 4).map((item) => (
                <li key={item.to}>
                  <Link className="hover:underline" to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">About</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="hover:underline" to="/about">About Us</Link>
              </li>
              <li>
                <Link className="hover:underline" to="/contact">Contact</Link>
              </li>
              <li>
                <Link className="hover:underline" to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link className="hover:underline" to="/admin">Admin</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Vincent House. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
