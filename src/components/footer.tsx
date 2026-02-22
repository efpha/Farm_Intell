import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 border-t">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">

        {/* SECTION 1 — Services */}
        <div>
          <h6 className="font-semibold text-gray-900 mb-3">Farm Services</h6>
          <ul className="flex flex-col space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Crop Disease Detection</li>
            <li className="hover:underline cursor-pointer">AI Irrigation Advisor</li>
            <li className="hover:underline cursor-pointer">Market Price Checker</li>
            <li className="hover:underline cursor-pointer">Farm Community Forum</li>
          </ul>
        </div>

        {/* SECTION 2 — Company */}
        <div>
          <h6 className="font-semibold text-gray-900 mb-3">Company</h6>
          <ul className="flex flex-col space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Contact</li>
            <li className="hover:underline cursor-pointer">Our AI Models</li>
            <li className="hover:underline cursor-pointer">Careers</li>
          </ul>
        </div>

        {/* SECTION 3 — Legal */}
        <div>
          <h6 className="font-semibold text-gray-900 mb-3">Legal</h6>
          <ul className="flex flex-col space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Terms of Use</li>
            <li className="hover:underline cursor-pointer">Privacy Policy</li>
            <li className="hover:underline cursor-pointer">Cookie Policy</li>
          </ul>
        </div>

        {/* SECTION 4 — Contributors */}
        <div>
          <h6 className="font-semibold text-gray-900 mb-3">Contributors</h6>
          <ul className="flex flex-col space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/efpha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Keffa Muthuri
              </a>
            </li>
            <li>
              <a
                href="https://github.com/renm226"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                Samson Odwori
              </a>
            </li>
          </ul>
        </div>

        {/* SECTION 5 — Newsletter */}
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

      {/* BOTTOM COPYRIGHT BAR */}
      <div className="border-t py-4 text-center text-xs text-gray-500">
        © 2026 FarmIntell — Empowering Smart Agriculture
      </div>
    </footer>
  );
};

export default Footer;