import { useNavigate, useParams } from "react-router-dom";
import ArtistForm from "@/components/forms/ArtistForm";
import { ArtistsApi, Artist } from "@/api/artists";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ArtistEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["artist", id],
    enabled: !!id,
    queryFn: async () => {
      try {
        return await ArtistsApi.get(id!);
      } catch (e: any) {
        toast.error("Failed to load artist", { description: e.message });
        throw e;
      }
    },
  });

  async function handleSubmit(values: Artist) {
    if (!id) return;
    try {
      await ArtistsApi.update(id, values);
      toast.success("Artist updated");
      navigate("/artists");
    } catch (e: any) {
      toast.error("Failed to update artist", { description: e.message });
    }
  }

  return (
    <div className="container py-10 md:py-14">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl sm:text-3xl">Edit Artist</h1>
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}><ArrowLeft className="mr-1" /> Back</Button>
      </div>
      {isLoading ? (
        <div className="mt-6 text-muted-foreground">Loading...</div>
      ) : isError ? (
        <div className="mt-6 text-destructive">{(error as any)?.message}</div>
      ) : data ? (
        <div className="mt-6 max-w-2xl">
          <ArtistForm defaultValues={data} onSubmit={handleSubmit} submittingText="Saving..." />
        </div>
      ) : null}
    </div>
  );
}
