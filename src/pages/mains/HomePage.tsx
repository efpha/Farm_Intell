import { Droplets, TreesIcon as Plant, Leaf, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Define all homepage content dynamically
const homepageData = {
  hero: {
    title: "Leveraging Technology in Agriculture",
    description:
      "Advanced tools for modern farming. Detect plant diseases and optimize irrigation with our AI-powered system.",
    backgroundImage: "/homebg.jpg",
    buttons: [
      { label: "Disease Detection", path: "/detect", icon: Plant },
      { label: "Irrigation Advisor", path: "/irrigation", icon: Droplets },
    ],
  },
  features: [
    {
      title: "AI Models",
      description:
        "Leverage cutting-edge AI models to monitor crops and detect diseases early.",
      icon: Leaf,
      color: "text-emerald-500",
    },
    {
      title: "Irrigation Advisor",
      description:
        "Optimize water usage and improve crop yield with smart irrigation recommendations.",
      icon: Droplets,
      color: "text-blue-500",
    },
    {
      title: "Community",
      description:
        "Connect with farmers and experts to share knowledge and best practices.",
      icon: Users,
      color: "text-emerald-700",
    },
  ],
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { hero, features } = homepageData;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="relative flex-1">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${hero.backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Hero Content */}
        <section className="relative z-10 flex flex-col items-center justify-center text-center py-24 px-4 md:px-6">
          <h1 className="text-white font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            {hero.title}
          </h1>
          <p className="mt-6 text-white text-lg sm:text-xl md:text-2xl max-w-3xl">
            {hero.description}
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
            {hero.buttons.map((btn) => (
              <button
                key={btn.label}
                onClick={() => navigate(btn.path)}
                className="flex items-center justify-center h-12 px-6 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <btn.icon className="mr-2 h-5 w-5" />
                {btn.label}
              </button>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 animate-bounce text-white">⬇ Scroll to explore</div>
        </section>
      </main>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Our Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
              >
                <feature.icon
                  className={`mx-auto h-12 w-12 mb-4 ${feature.color}`}
                />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;