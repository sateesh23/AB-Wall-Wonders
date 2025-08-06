import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

import WallpapersService from "./pages/services/Wallpapers";
import BlindsService from "./pages/services/Blinds";
import FlooringService from "./pages/services/Flooring";

import Projects from "./pages/Projects";

import Header from "./components/Header";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

// Layout component that conditionally renders Header and Footer
const Layout = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  return (
    <div className="relative z-10">
      {!isAdminPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/services/wallpapers" element={<WallpapersService />} />
          <Route path="/services/blinds" element={<BlindsService />} />
          <Route path="/services/flooring" element={<FlooringService />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/admin" element={<Admin />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
