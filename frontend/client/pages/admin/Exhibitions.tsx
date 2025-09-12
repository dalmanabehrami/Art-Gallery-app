import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ExhibitionsApi, type Exhibition } from "@/api/exhibitions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function ExForm({ initial, onClose }: { initial?: Partial<Exhibition>; onClose: () => void }) {
  const qc = useQueryClient();
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [coverImage, setCoverImage] = useState(initial?.coverImage || "");
  const [startDate, setStartDate] = useState(initial?.startDate || "");
  const [endDate, setEndDate] = useState(initial?.endDate || "");
  const [venueName, setVenueName] = useState(initial?.venue?.name || "");

  return (
    <div className="grid gap-3">
      <div className="grid gap-1"><label className="text-xs text-muted-foreground">Title</label><Input value={title} onChange={(e)=>setTitle(e.target.value)} /></div>
      <div className="grid gap-1"><label className="text-xs text-muted-foreground">Description</label><Textarea value={description} onChange={(e)=>setDescription(e.target.value)} /></div>
      <div className="grid gap-1"><label className="text-xs text-muted-foreground">Cover image URL</label><Input value={coverImage} onChange={(e)=>setCoverImage(e.target.value)} /></div>
      <div className="grid grid-cols-2 gap-2">
        <div className="grid gap-1"><label className="text-xs text-muted-foreground">Start</label><Input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} /></div>
        <div className="grid gap-1"><label className="text-xs text-muted-foreground">End</label><Input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} /></div>
      </div>
      <div className="grid gap-1"><label className="text-xs text-muted-foreground">Venue</label><Input value={venueName} onChange={(e)=>setVenueName(e.target.value)} /></div>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button
          onClick={async () => {
            const payload: Partial<Exhibition> = { title, description, coverImage, startDate, endDate, venue: { name: venueName }, artworks: initial?.artworks || [] };
            if (initial?.id) await ExhibitionsApi.update(initial.id, payload);
            else await ExhibitionsApi.create(payload);
            await qc.invalidateQueries({ queryKey: ["exhibitions"] });
            onClose();
          }}
          disabled={!title}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default function AdminExhibitions() {
  const q = useQuery<Exhibition[]>({ queryKey: ["exhibitions"], queryFn: () => ExhibitionsApi.list() });
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<Exhibition | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl">Exhibitions</h1>
          <p className="text-sm text-muted-foreground">Manage exhibitions: add, edit, remove</p>
        </div>
        <Button onClick={() => { setEdit(null); setOpen(true); }}>New Exhibition</Button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Venue</th>
              <th className="p-3">Dates</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(q.data || []).map((ex) => (
              <tr key={ex.id} className="border-t">
                <td className="p-3">{ex.title}</td>
                <td className="p-3">{ex.venue?.name}</td>
                <td className="p-3">{ex.startDate} → {ex.endDate}</td>
                <td className="p-3">
                  <Button variant="outline" size="sm" onClick={() => { setEdit(ex); setOpen(true); }}>Edit</Button>
                  <Button variant="ghost" size="sm" className="ml-2" onClick={async () => { if (confirm("Delete this exhibition?")) { await ExhibitionsApi.delete(ex.id); location.reload(); } }}>Delete</Button>
                </td>
              </tr>
            ))}
            {q.data?.length ? null : (
              <tr><td className="p-4 text-muted-foreground" colSpan={4}>No exhibitions yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{edit ? "Edit Exhibition" : "New Exhibition"}</DialogTitle></DialogHeader>
          <ExForm initial={edit || undefined} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
