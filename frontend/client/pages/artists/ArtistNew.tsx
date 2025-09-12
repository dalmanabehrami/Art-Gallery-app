import { useNavigate } from "react-router-dom";
import ArtistForm from "@/components/forms/ArtistForm";
import { ArtistsApi, Artist } from "@/api/artists";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ArtistNew() {
  const navigate = useNavigate();

  async function handleSubmit(values: Artist) {
    try {
      const created = await ArtistsApi.create(values);
      toast.success("Artist created");
      navigate(`/artists/${created.id}/edit`);
    } catch (e: any) {
      toast.error("Failed to create artist", { description: e.message });
    }
  }

  return (
    <div className="container py-10 md:py-14">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl sm:text-3xl">Add Artist</h1>
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}><ArrowLeft className="mr-1" /> Back</Button>
      </div>
      <div className="mt-6 max-w-2xl">
        <ArtistForm onSubmit={handleSubmit} submittingText="Creating..." />
      </div>
    </div>
  );
}
