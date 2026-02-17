import { Droplets, TreesIcon as Plant } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] flex flex-col">
      <main className="flex-1 bg-[url('/homebg.jpg')] bg-cover bg-center bg-fixed relative">
        <div className="absolute inset-0 bg-black/50"></div>
        <section className="w-full py-12 md:py-24 lg:py-32 h-full relative z-10">
          <div className="container px-4 md:px-6 h-full flex flex-col justify-center">
            <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h1 className="text-6xl text-white font-bold tracking-tighter sm:text-6xl md:text-8xl">
                  Leveraging Technology in Agriculture
                </h1>
                <p className="mx-auto max-w-[700px] md:text-2xl">
                  Advanced tools for modern farming. Detect plant diseases and optimize irrigation with our AI-powered system.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
                  <button
                    onClick={() => navigate("/detect")}
                    className="inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-blue-700 px-5 text-sm font-semibold text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 cursor-pointer"
                  >
                    <Plant className="mr-3 h-5 w-5" />
                    Disease Detection
                  </button>
                  <button
                    onClick={() => navigate("/irrigation")}
                    className="inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-blue-700 px-5 text-sm font-semibold text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
                  >
                    <Droplets className="mr-3 h-5 w-5" />
                    Irrigation Advisor
                  </button>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
