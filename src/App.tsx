import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./components/page/Home";
import Footer from "./components/layout/Footer";
import Cover from "./components/page/Cover";
import NotFoundPage from "./components/page/404";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Cover />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
