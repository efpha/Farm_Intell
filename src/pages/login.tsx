import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Leaf, Mail, Lock } from "lucide-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Replace with your real auth logic (API call)
    console.log("Logging in with:", { email, password });
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/homebg.jpg')",
      }}
    >
      {/* Dark overlay for readability */}
      <div className="min-h-screen w-full bg-black/40">
        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10">
          {/* Login Card */}
          <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">

            {/* Brand Section */}
            <div className="mb-6 mt-6 text-center">
                <Link
                    to="/"
                    className="mx-auto flex flex-col items-center justify-center gap-1 rounded-2xl"
                >
                    <Leaf className="h-6 w-6 text-emerald-600" />
                    <h2 className="text-2xl font-bold text-slate-900">FarmIntell</h2>
                </Link>

                <p className="mt-1 text-sm text-slate-600">
                    Login to get started
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-2xl border bg-white px-11 py-3 text-sm outline-none focus:border-emerald-500"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  required
                  className="w-full rounded-2xl border bg-white px-11 py-3 pr-12 text-sm outline-none focus:border-emerald-500"
                />

                <button
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2" /*TODO: Change password view BG to white or transparent*/
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-emerald-600" />
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-700"
              >
                Login
              </button>

              {/* Register Link */}
              <p className="text-center text-sm text-slate-700">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
