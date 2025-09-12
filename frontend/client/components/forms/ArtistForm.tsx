import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArtistSchema, Artist } from "@/api/artists";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export type ArtistFormProps = {
  defaultValues?: Partial<Artist>;
  onSubmit: (values: Artist) => Promise<void> | void;
  submittingText?: string;
};

export default function ArtistForm({ defaultValues, onSubmit, submittingText }: ArtistFormProps) {
  const form = useForm<Artist>({
    resolver: zodResolver(ArtistSchema),
    defaultValues: {
      name: "",
      biography: "",
      avatarUrl: "",
      website: "",
      nationality: "",
      birthYear: undefined as unknown as number,
      categories: [],
      ...defaultValues,
    },
  });

  const submit = form.handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="grid gap-2">
        <label className="text-sm font-medium">Name</label>
        <Input {...form.register("name")} placeholder="Artist name" />
        <p className="text-xs text-destructive">{form.formState.errors.name?.message}</p>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium">Biography</label>
        <Textarea {...form.register("biography")} placeholder="Short biography" />
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Avatar URL</label>
          <Input {...form.register("avatarUrl")} placeholder="https://..." />
          <p className="text-xs text-destructive">{form.formState.errors.avatarUrl?.message}</p>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Website</label>
          <Input {...form.register("website")} placeholder="https://..." />
          <p className="text-xs text-destructive">{form.formState.errors.website?.message}</p>
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Nationality</label>
          <Input {...form.register("nationality")} placeholder="e.g., Albanian" />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Birth Year</label>
          <Input type="number" {...form.register("birthYear", { valueAsNumber: true })} placeholder="1988" />
        </div>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium">Categories (comma separated)</label>
        <Input
          defaultValue={(defaultValues?.categories || []).join(", ")}
          onChange={(e) => {
            const value = e.currentTarget.value;
            const arr = value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
            form.setValue("categories", arr);
          }}
          placeholder="Painting, Sculpture"
        />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? submittingText || "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
