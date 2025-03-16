
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Preloader />
      <MuteButton />
      <BrowserRouter>
        <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center">Nalaganje...</div>}>
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
