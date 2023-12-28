import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/layout/Header";
// import Home from "./components/page/Home";
import Footer from "./components/layout/Footer";
import Cover from "./components/page/Cover";
// import { Route, Routes, useLocation } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Header /> */}
      {/* <Home /> */}
      <Cover />
      {/* <Footer /> */}
    </QueryClientProvider>
  );
}

export default App;
