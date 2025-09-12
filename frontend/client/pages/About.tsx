export default function About() {
  return (
    <div className="container py-12 md:py-16">
      <h1 className="font-display text-3xl">About Vincent House</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Vincent House është një hapësirë moderne për art bashkëkohor. Ne lidhim artistë, koleksionistë dhe publikut me
        ekspozita të kuruara, prezantime digjitale dhe eksperienca të pasura vizuale.
      </p>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="rounded-lg border p-6">
          <div className="text-sm font-semibold">Misioni</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Të zbulojmë talente dhe t’i bëjmë veprat e tyre të arritshme në të gjitha format—pikturë, skulpturë, fotografi dhe më shumë.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <div className="text-sm font-semibold">Vlerat</div>
          <p className="mt-2 text-sm text-muted-foreground">Transparencë, përkujdesje ndaj artistëve dhe përvojë e shkëlqyer për vizitorët.</p>
        </div>
        <div className="rounded-lg border p-6">
          <div className="text-sm font-semibold">Ekspozitat</div>
          <p className="mt-2 text-sm text-muted-foreground">Program i rregullt me ekspozita fizike dhe online me bashkëpunëtorë globalë.</p>
        </div>
      </div>
    </div>
  );
}
