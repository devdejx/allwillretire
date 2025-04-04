
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MuteButton from "./components/MuteButton";
import Preloader from "./components/Preloader";

// Ustvarimo Query Client z vgrajenim predpomnjenjem
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Izboljša učinkovitost, ne ponavlja poizvedb ob fokusiranju okna
      staleTime: 1000 * 60 * 5, // 5 minut predpomnjenje
      retry: 1, // Poskusi samo enkrat pred neuspehom
    },
  },
});

// Custom loading component for routes
const PageLoading = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-background">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 relative">
        <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-lg animate-pulse"></div>
        <img 
          src="/lovable-uploads/9736f09c-0f57-4e9f-86de-eb5f875fad9b.png" 
          alt="Loading" 
          className="w-full h-full object-contain animate-pulse" 
        />
      </div>
      <p className="mt-4 text-sm font-medium">Nalaganje...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Preloader />
      <MuteButton />
      <BrowserRouter>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* DODAJTE VSE DODATNE POTI NAD "*" POTJO */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
