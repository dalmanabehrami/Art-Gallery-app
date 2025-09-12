import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarDays, Star, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const categories = [
  "Painting",
  "Sculpture",
  "Photography",
  "Digital",
  "Mixed Media",
  "Installation",
  "Ceramics",
  "Textile",
];

const featuredArtists = [
  {
    name: "Mara Kova",
    specialty: "Abstract Painting",
    avatar:
      "https://images.unsplash.com/photo-1520975922323-3d1a92e1b3cf?q=80&w=300&auto=format&fit=crop",
    artwork:
      "https://upload.wikimedia.org/wikipedia/commons/f/f7/Vincent_van_Gogh_-_Wheatfield_with_Crows_-_Google_Art_Project.jpg",
  },
  {
    name: "Omar Rios",
    specialty: "Street Photography",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300&auto=format&fit=crop",
    artwork:
      "https://upload.wikimedia.org/wikipedia/commons/9/95/Van_Gogh_-_Starry_Night_Over_the_Rhone.jpg",
  },
  {
    name: "Aya Tanaka",
    specialty: "Sculpture",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    artwork:
      "https://upload.wikimedia.org/wikipedia/commons/0/02/Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg",
  },
];

const exhibitions = [
  {
    title: "Chromatic Echoes",
    date: "Nov 20 – Dec 31",
    location: "Aurelia Hall, Room A",
    image:
    "https://upload.wikimedia.org/wikipedia/commons/7/74/Vincent_Van_Gogh_0011.jpg",
  },
  {
    title: "Urban Reverie",
    date: "Dec 05 – Jan 10",
    location: "Downtown Pavilion",
    image:
    "https://upload.wikimedia.org/wikipedia/commons/6/6b/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%2825484%29.jpg",
  },
  {
    title: "Light & Form",
    date: "Jan 15 – Feb 12",
    location: "East Gallery",
    image:
    "https://upload.wikimedia.org/wikipedia/commons/1/1f/Vincent_van_Gogh_-_Cypresses_-_Google_Art_Project.jpg",
  },
];

const reviews = [
  {
    name: "Helena P.",
    rating: 5,
    text: "A beautiful curation. The interface makes discovering new artists a joy.",
  },
  {
    name: "Marco D.",
    rating: 4,
    text: "Great selection and smooth browsing. Love the exhibition previews!",
  },
  {
    name: "Sara N.",
    rating: 5,
    text: "Feels like walking through a real gallery. Stunning visuals and design.",
  },
];

function AuthActions() {
  const { role } = useAuth();
  if (role === "admin") {
    return (
      <Button asChild variant="outline" size="lg">
        <Link to="/admin">Admin Dashboard</Link>
      </Button>
    );
  }
  if (role === "user") return null;
  return (
    <div className="flex gap-3">
      <Button asChild variant="ghost" size="lg">
        <Link to="/signin">Sign In</Link>
      </Button>
      <Button asChild variant="ghost" size="lg">
        <Link to="/register">Create Account</Link>
      </Button>
    </div>
  );
}

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

function passwordValid(pw: string) {
  const hasUpper = /[A-Z]/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  return pw.length >= 5 && hasUpper && hasSpecial;
}

function AuthSwitcher() {
  const { setRole } = useAuth();
  const navigate = useNavigate();
  const [role, setRoleSel] = useState<"admin" | "user">("user");
  const [userType, setUserType] = useState<"artist" | "visitor">("visitor");
  const [forgot, setForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");

  function finishLogin() {
    setRole(role);
    if (role === "user") localStorage.setItem("userType", userType);
    toast.success("Welcome", { description: role === "admin" ? "Admin access granted" : `Signed in as ${userType}` });
    if (role === "admin") navigate("/admin");
    else navigate(userType === "artist" ? "/artists" : "/artworks");
  }

  return (
    <div className="mt-10 max-w-xl rounded-xl border bg-card/60 p-4 shadow-sm backdrop-blur">
      <Tabs defaultValue="signin">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <div className="text-xs text-muted-foreground">Choose role, then continue</div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <div className="text-xs font-medium">Role</div>
            <RadioGroup value={role} onValueChange={(v:any)=>setRoleSel(v)} className="mt-1">
              <div className="flex items-center gap-2">
                <RadioGroupItem id="r-admin" value="admin" />
                <Label htmlFor="r-admin">Admin</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem id="r-user" value="user" />
                <Label htmlFor="r-user">User</Label>
              </div>
            </RadioGroup>
          </div>
          {role === "user" && (
            <div>
              <div className="text-xs font-medium">User type</div>
              <RadioGroup value={userType} onValueChange={(v:any)=>setUserType(v)} className="mt-1">
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="t-artist" value="artist" />
                  <Label htmlFor="t-artist">Artist</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="t-visitor" value="visitor" />
                  <Label htmlFor="t-visitor">Visitor</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>

        <TabsContent value="signin" className="mt-4">
          {!forgot ? (
            <div className="grid gap-3 md:grid-cols-2">
              <div className="grid gap-1">
                <Label htmlFor="email-in">Email</Label>
                <Input id="email-in" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="pw-in">Password</Label>
                <Input id="pw-in" type="password" value={pw} onChange={(e)=>setPw(e.target.value)} />
              </div>
              <div className="col-span-full flex items-center justify-between">
                <Button onClick={() => finishLogin()} disabled={!email || !pw}>Continue</Button>
                <button className="text-xs underline" onClick={(e)=>{e.preventDefault(); setForgot(true);}}>Forgot your password?</button>
              </div>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              <div className="grid gap-1 md:col-span-2">
                <Label htmlFor="email-r">Reset email</Label>
                <Input id="email-r" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
                <div className="text-xs text-muted-foreground">We will send a reset link if the account exists.</div>
              </div>
              <div className="md:col-span-2 flex items-center justify-between">
                <Button onClick={()=>{ toast.success("Reset email sent"); setForgot(false); }}>Send reset link</Button>
                <button className="text-xs underline" onClick={(e)=>{e.preventDefault(); setForgot(false);}}>Back to sign in</button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="signup" className="mt-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="grid gap-1">
              <Label htmlFor="name-up">Full name</Label>
              <Input id="name-up" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email-up">Email</Label>
              <Input id="email-up" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="grid gap-1 md:col-span-2">
              <Label htmlFor="pw-up">Password</Label>
              <Input id="pw-up" type="password" value={pw} onChange={(e)=>setPw(e.target.value)} />
              <div className="text-xs text-muted-foreground">Must include at least 1 uppercase letter, 5+ characters total, and 1 special character.</div>
              {!passwordValid(pw) && pw && (
                <div className="text-xs text-destructive">Password does not meet requirements.</div>
              )}
            </div>
            <div className="md:col-span-2">
              <Button onClick={()=>{ if (!passwordValid(pw)) { toast.error("Password requirements not met"); return;} toast.success("Account created"); finishLogin(); }} disabled={!name || !email || !passwordValid(pw)}>Create account</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function Index() {
  const [authMode] = useState(false);
  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0a/Vincent_van_Gogh_-_Sunflowers_-_Google_Art_Project.jpg"
          alt="Sunflowers background"
          onError={(e)=>{(e.currentTarget as HTMLImageElement).src='https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=800&auto=format&fit=crop';}}
          className="pointer-events-none absolute -z-10 right-[-6rem] top-10 hidden w-[420px] rotate-6 opacity-10 blur-[1px] md:block"
        />
        <div className="container grid items-center gap-10 py-16 md:grid-cols-2 md:gap-12 md:py-24">
          <>
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Contemporary • Curated • Connected
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Curated Art. Living Stories.
            </h1>
            <p className="mt-4 max-w-prose text-muted-foreground">
              What's bad for your heart is good for your art.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/artworks" className="inline-flex items-center gap-2">
                  Explore Artworks <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/exhibitions">View Exhibitions</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {categories.slice(0, 6).map((c) => (
                <Badge key={c} variant="secondary" className="text-[0.7rem] bg-white/10 text-white border-white/20">
                  {c}
                </Badge>
              ))}
            </div>
            <form className="mt-8 flex max-w-md gap-2">
              <Input placeholder="Search artworks, artists, categories" aria-label="Search" />
              <Button asChild>
                <Link to="/artworks">Search</Link>
              </Button>
            </form>

          </div>
          <div className="order-1 md:order-2">
            <div className="grid grid-cols-3 grid-rows-3 gap-3 md:gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/57/Vincent_van_Gogh_-_The_Starry_Night_-_Google_Art_Project.jpg"
                onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/placeholder.svg';}}
                className="col-span-2 row-span-2 h-64 w-full rounded-lg object-cover shadow-md md:h-80"
                alt="Abstract painting"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Vincent_van_Gogh_-_Irises_-_Google_Art_Project.jpg"
                onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/placeholder.svg';}}
                className="h-32 w-full rounded-lg object-cover shadow-md md:h-40"
                alt="Sculpture"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/66/Vincent_van_Gogh_-_Caf%C3%A9_Terrace_at_Night_%281888%29.jpg"
                onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/placeholder.svg';}}
                className="col-span-1 row-span-2 h-64 w-full rounded-lg object-cover shadow-md md:h-80"
                alt="Photography"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg"
                onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/placeholder.svg';}}
                className="h-32 w-full rounded-lg object-cover shadow-md md:h-40"
                alt="Installation"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          </>
        </div>
      </section>

      <>
      {/* Featured Artists */}
      <section className="border-t">
        <div className="container py-14 md:py-20">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl">Featured Artists</h2>
              <p className="text-sm text-muted-foreground">
                Explore creators shaping contemporary art.
              </p>
            </div>
            <Button asChild variant="ghost">
              <Link to="/artists">View all</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredArtists.map((a) => (
              <Card key={a.name} className="overflow-hidden">
                <img src={a.artwork} alt={a.name + " artwork"} className="h-40 w-full object-cover" loading="lazy" decoding="async" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/placeholder.svg';}} />
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <img
                      src={a.avatar}
                      alt={a.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-base">{a.name}</CardTitle>
                      <div className="text-xs text-muted-foreground">{a.specialty}</div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Exhibitions */}
      <section className="border-t">
        <div className="container py-14 md:py-20">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl">Current Exhibitions</h2>
              <p className="text-sm text-muted-foreground">
                Experience art in immersive spaces.
              </p>
            </div>
            <Button asChild variant="ghost">
              <Link to="/exhibitions">View all</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {exhibitions.map((e) => (
              <Card key={e.title} className="overflow-hidden">
                <img src={e.image} alt={e.title} className="h-48 w-full object-cover" loading="lazy" decoding="async" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/placeholder.svg';}} />
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{e.title}</div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarDays className="h-4 w-4" /> {e.date}
                        <MapPin className="ml-3 h-4 w-4" /> {e.location}
                      </div>
                    </div>
                    <Button asChild size="sm">
                      <Link to="/exhibitions">Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t bg-secondary/30">
        <div className="container py-14 md:py-20">
          <h2 className="font-display text-2xl sm:text-3xl">What collectors say</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <Card key={r.name}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 text-accent">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
                  <div className="mt-4 text-sm font-medium">{r.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t">
        <div className="container py-14 md:py-20">
          <div className="rounded-lg bg-card p-6 shadow-sm md:p-10">
            <div className="md:flex md:items-center md:justify-between">
              <div className="max-w-xl">
                <h3 className="font-display text-xl sm:text-2xl">Get invitations to private previews</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Join our newsletter for early access to exhibitions and exclusive discounts.
                </p>
              </div>
              <form className="mt-4 flex max-w-md gap-2 md:mt-0">
                <Input type="email" placeholder="Enter your email" aria-label="Email" />
                <Button>Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      </>
    </div>
  );
}
