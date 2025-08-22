import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { HelmetProvider } from "react-helmet-async";
import { initErrorSuppression } from "@/lib/error-handler";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

import WallpapersService from "./pages/services/Wallpapers";
import BlindsService from "./pages/services/Blinds";
import FlooringService from "./pages/services/Flooring";

import Projects from "./pages/Projects";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Initialize error suppression for better development experience
initErrorSuppression();

const queryClient = new QueryClient();

const App = () => {
  const helmetContext = {};

  return (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="relative z-10">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services/wallpapers" element={<WallpapersService />} />
                <Route path="/services/blinds" element={<BlindsService />} />
                <Route path="/services/flooring" element={<FlooringService />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
