import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import HomePage from "./pages/HomePage";
import DetectPage from "./pages/DetectPage";
import IrrigationPage from "./pages/IrrigationPage";
import AboutPage from "./pages/AboutPage";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import Community from "./pages/community"
import Footer from "./components/footer"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/detect" element={<DetectPage />} />
        <Route path="/irrigation" element={<IrrigationPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
