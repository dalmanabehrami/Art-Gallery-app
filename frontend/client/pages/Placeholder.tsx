import { Link, useLocation } from "react-router-dom";

export default function Placeholder(props: { title?: string; description?: string }) {
  const { title, description } = props;
  const { pathname } = useLocation();
  const fromPath = pathname.replace(/^\//, "").replace(/\b\w/g, (c) => c.toUpperCase()) || "Page";
  const computed = title ?? fromPath;
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-3xl sm:text-4xl">{computed}</h1>
        <p className="mt-2 text-muted-foreground">
          {description ?? "This page is ready to be filled with content. Tell me what to include and I will build it out next."}
        </p>
        <div className="mt-6 inline-flex gap-3">
          <Link to="/" className="underline">Back to Home</Link>
          <Link to="/artworks" className="underline">Explore Artworks</Link>
        </div>
      </div>
    </div>
  );
}
