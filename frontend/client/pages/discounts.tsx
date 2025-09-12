import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Discounts() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/20 via-transparent to-primary/10" />
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl">
            <Badge variant="secondary">Offer</Badge>
            <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight sm:text-5xl">Welcome Offer: 20% off your first artwork</h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-prose">
              New here? Create an account and enjoy 20% off your first purchase. The discount applies automatically at checkout for first‑time buyers using their email.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/register">Create Account</Link></Button>
              <Button asChild variant="secondary" size="lg"><Link to="/signin">Sign In</Link></Button>
              <Button asChild variant="ghost" size="lg"><Link to="/artworks">Browse Artworks</Link></Button>
            </div>
            <ul className="mt-6 list-disc pl-5 text-sm text-muted-foreground">
              <li>Automatic discount for first purchase only.</li>
              <li>Discount appears after entering your email at checkout.</li>
              <li>Not combinable with other promotions.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="container py-12">
          <h2 className="font-display text-2xl">How it works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-5">
              <div className="text-sm font-medium">1. Create an account</div>
              <p className="mt-1 text-sm text-muted-foreground">Register in seconds to unlock the offer.</p>
            </div>
            <div className="rounded-lg border p-5">
              <div className="text-sm font-medium">2. Pick your artwork</div>
              <p className="mt-1 text-sm text-muted-foreground">Explore curation across painting, sculpture, photography and more.</p>
            </div>
            <div className="rounded-lg border p-5">
              <div className="text-sm font-medium">3. Discount auto‑applies</div>
              <p className="mt-1 text-sm text-muted-foreground">Enter your email at checkout—20% off is applied if it’s your first order.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
