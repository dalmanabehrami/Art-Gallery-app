import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SiteLayout from "@/components/layout/SiteLayout";
import Placeholder from "@/pages/Placeholder";
import ArtistsIndex from "@/pages/artists/ArtistsIndex";
import ArtistsByCountry from "@/pages/artists/ArtistsByCountry";
import ArtistNew from "@/pages/artists/ArtistNew";
import ArtistEdit from "@/pages/artists/ArtistEdit";
import ArtistShow from "@/pages/artists/ArtistShow";
import ArtworksIndex from "@/pages/artworks/ArtworksIndex";
import ArtworkShow from "@/pages/artworks/ArtworkShow";
import ExhibitionsIndex from "@/pages/exhibitions/ExhibitionsIndex";
import ExhibitionShow from "@/pages/exhibitions/ExhibitionShow";
import Categories from "@/pages/categories";
import ReviewsIndex from "@/pages/reviews/ReviewsIndex";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminClients from "@/pages/admin/Clients";
import ClientTransactions from "@/pages/admin/ClientTransactions";
import AdminOrders from "@/pages/admin/Orders";
import AdminReviews from "@/pages/admin/Reviews";
import AdminArtists from "@/pages/admin/Artists";
import AdminArtworks from "@/pages/admin/Artworks";
import AdminFirstTime from "@/pages/admin/FirstTime";
import AdminArtistManage from "@/pages/admin/ArtistManage";
import AdminMessages from "@/pages/admin/Messages";
import AdminExhibitions from "@/pages/admin/Exhibitions";
import AdminTransactionShow from "@/pages/admin/TransactionShow";
import AdminLayout from "@/components/layout/AdminLayout";
import SignIn from "@/pages/auth/SignIn";
import Register from "@/pages/auth/Register";
import Discounts from "@/pages/discounts";

const queryClient = new QueryClient();

function RequireAdmin({ children }: { children: React.ReactElement }) {
  const { role } = useAuth();
  if (role !== "admin") return <NotFound />;
  return children;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/artworks" element={<ArtworksIndex />} />
            <Route path="/artworks/:id" element={<ArtworkShow />} />
            <Route path="/exhibitions" element={<ExhibitionsIndex />} />
            <Route path="/exhibitions/:id" element={<ExhibitionShow />} />
            <Route path="/artists" element={<ArtistsIndex />} />
            <Route path="/artists/country/:country" element={<ArtistsByCountry />} />
            <Route path="/artists/new" element={<ArtistNew />} />
            <Route path="/artists/:id" element={<ArtistShow />} />
            <Route path="/artists/:id/edit" element={<ArtistEdit />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/reviews" element={<ReviewsIndex />} />
            <Route path="/discounts" element={<Discounts />} />
            <Route path="/customers" element={<Placeholder title="Customers" description="Customer profiles and preferences." />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="transactions/:id" element={<AdminTransactionShow />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="first-time" element={<AdminFirstTime />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="exhibitions" element={<AdminExhibitions />} />
              <Route path="artists" element={<AdminArtists />} />
              <Route path="artists/:id" element={<AdminArtistManage />} />
              <Route path="artworks" element={<AdminArtworks />} />
              <Route path="clients/:email" element={<ClientTransactions />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
