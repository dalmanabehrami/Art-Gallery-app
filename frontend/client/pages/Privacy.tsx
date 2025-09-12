export default function Privacy() {
  return (
    <div className="container py-12 md:py-16">
      <h1 className="font-display text-3xl">Privacy Policy</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Respektojmë privatësinë tuaj. Kjo faqe shpjegon si i mbledhim dhe përdorim të dhënat.
      </p>
      <div className="prose prose-slate mt-6 max-w-3xl dark:prose-invert">
        <h3>Të dhënat që mbledhim</h3>
        <p>Informacion kontakti dhe përdorimi bazë i faqes (analitikë anonime).</p>
        <h3>Përdorimi i të dhënave</h3>
        <p>Për komunikim rreth ekspozitave, njoftimeve dhe përmirësimit të shërbimit.</p>
        <h3>Ruajtja dhe siguria</h3>
        <p>Të dhënat ruhen me praktika të sigurta dhe nuk shiten te palë të treta.</p>
        <h3>Kontakti</h3>
        <p>Pyetje? Na kontaktoni te faqja <a href="/contact">Contact</a>.</p>
      </div>
    </div>
  );
}
