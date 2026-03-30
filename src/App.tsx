import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Workers from "./pages/Workers";
import UniformItems from "./pages/UniformItems";
import NewOrder from "./pages/NewOrder";
import ProductionTracking from "./pages/ProductionTracking";
import MonthlyPayments from "./pages/MonthlyPayments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/uniform-items" element={<UniformItems />} />
            <Route path="/new-order" element={<NewOrder />} />
            <Route path="/production" element={<ProductionTracking />} />
            <Route path="/payments" element={<MonthlyPayments />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
