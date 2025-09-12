import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton({ label = "Back" }: { label?: string }) {
  return (
    <Button variant="outline" size="sm" onClick={() => history.back()} aria-label={label}>
      <ArrowLeft className="mr-1 h-4 w-4" /> {label}
    </Button>
  );
}
