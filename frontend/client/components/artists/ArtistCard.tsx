import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Artist } from "@/api/artists";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Card className="overflow-hidden">
      <Link to={`/artists/${artist.id}`}>
        <img
          src={artist.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"}
          alt={artist.name}
          className="h-40 w-full object-cover"
        />
      </Link>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/artists/${artist.id}`} className="font-medium hover:underline">{artist.name}</Link>
            {artist.nationality ? (
              <div className="text-xs text-muted-foreground">{artist.nationality}</div>
            ) : null}
            {artist.biography ? (
              <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{artist.biography}</div>
            ) : null}
          </div>
          <div className="shrink-0 flex gap-2">
            <Button asChild variant="secondary" size="sm">
              <Link to={`/artworks?artist=${artist.id}`}>View Works</Link>
            </Button>
            <Button asChild size="sm">
              <Link to={`/artists/${artist.id || "new"}/edit`}>Edit</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
