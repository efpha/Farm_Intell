import React from "react";
import { useNavigate } from "react-router-dom";

// Footer link data
const footerData = {
  services: [
    { label: "Crop Disease Detection", path: "/detect" },
    { label: "AI Irrigation Advisor", path: "/irrigation" },
    { label: "Market Price Checker", path: "/market-price" },
    { label: "Farm Community Forum", path: "/community" },
  ],
  company: [
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Our AI Models", path: "/models" },
    { label: "Careers", path: "/careers" },
  ],
  legal: [
    { label: "Terms of Use", path: "/terms" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Cookie Policy", path: "/cookie" },
  ],
  contributors: [
    {
      label: "Keffa Muthuri",
      url: "https://github.com/efpha",
      color: "text-blue-600",
    },
    {
      label: "Samson Odwori",
      url: "https://github.com/renm226",
      color: "text-emerald-600",
    },
  ],
};

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="w-full bg-gray-100 text-gray-700 border-t">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">

        {/* Services */}
        <div>
          <h6 className="font-semibold text-gray-900 mb-3">Farm Services</h6>
          <ul className="flex flex-col space-y-2 text-sm">
            {footerData.services.map((item) => (
              <li
                key={item.label}
                onClick={() => handleNavigate(item.path)}
                className="hover:underline cursor-pointer"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h6 className="font-semibold text-gray-900 mb-3">Company</h6>
          <ul className="flex flex-col space-y-2 text-sm">
            {footerData.company.map((item) => (
              <li
                key={item.label}
                onClick={() => handleNavigate(item.path)}
                className="hover:underline cursor-pointer"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h6 className="font-semibold text-gray-900 mb-3">Legal</h6>
          <ul className="flex flex-col space-y-2 text-sm">
            {footerData.legal.map((item) => (
              <li
                key={item.label}
                onClick={() => handleNavigate(item.path)}
                className="hover:underline cursor-pointer"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Contributors */}
        <div>
          <h6 className="font-semibold text-gray-900 mb-3">Contributors</h6>
          <ul className="flex flex-col space-y-2 text-sm">
            {footerData.contributors.map((c) => (
              <li key={c.label}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${c.color} hover:underline`}
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-1">
          <h6 className="font-semibold text-gray-900 mb-3">Newsletter</h6>
          <p className="text-sm mb-2">Get updates on new AI tools & farm insights.</p>
          <div className="flex mt-2">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none text-sm"
            />
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-r-lg text-sm hover:bg-emerald-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-gray-500">
        © 2026 FarmIntell — Empowering Smart Agriculture
      </div>
    </footer>
  );
};

export default Footer;