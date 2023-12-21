import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Home />
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
