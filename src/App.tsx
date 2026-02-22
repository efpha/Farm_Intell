// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

// Pages - Main
import HomePage from "./pages/mains/HomePage";
import DetectPage from "./pages/mains/DetectPage";
import IrrigationPage from "./pages/mains/IrrigationPage";
import MarketPrice from "./pages/mains/MarketPrice";
import Community from "./pages/mains/community";

// Pages - Reusables
import AboutPage from "./pages/reusables/AboutPage";
import ContactPage from "./pages/reusables/ContactPage";
import CareersPage from "./pages/reusables/CareersPage";
import TermsPage from "./pages/reusables/TermsPage";
import PrivacyPage from "./pages/reusables/PrivacyPage";
import CookiePage from "./pages/reusables/CookiePage";

// Pages - Verifications
import RegisterPage from "./pages/verifications/register";
import LoginPage from "./pages/verifications/login";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/detect" element={<DetectPage />} />
        <Route path="/irrigation" element={<IrrigationPage />} />
        <Route path="/market-price" element={<MarketPrice />} />
        <Route path="/community" element={<Community />} />

        {/* Reusable Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/cookie" element={<CookiePage />} />

        {/* Verification Pages */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;