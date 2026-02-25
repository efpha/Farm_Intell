import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Eye, EyeOff, Leaf, Mail, Lock, User, Phone } from "lucide-react";
import { useToast } from "../components/toast/toast";

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { success, error, warning } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side password match check
    if (password !== confirmPassword) {
      warning("Passwords don't match", "Please make sure both passwords are identical.");
      return;
    }

    const { data, error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (supabaseError) {
      console.error("Error signing up:", supabaseError);
      error("Registration failed", supabaseError.message);
    } else {
      console.log("Sign up successful:", data);
      success("Account created!", "Check your email to verify your account.");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/homebg.jpg')" }}
    >
      <div className="min-h-screen w-full bg-black/40 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur-md">

          {/* Brand */}
          <div className="text-center mb-6">
            <Link to="/" className="flex flex-col items-center gap-1">
              <Leaf className="h-7 w-7 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">FarmIntell</h2>
            </Link>
            <p className="mt-1 text-sm text-gray-600">Create your account to get started</p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">

            {/* First Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="First name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-transparent py-3 px-12 text-sm text-black placeholder-gray-500 shadow-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            {/* Last Name */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Last name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-transparent py-3 px-12 text-sm text-black placeholder-gray-500 shadow-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            {/* Phone Number */}
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                type="tel"
                placeholder="Phone number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-transparent py-3 px-12 text-sm text-black placeholder-gray-500 shadow-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-transparent py-3 px-12 text-sm text-black placeholder-gray-500 shadow-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-transparent py-3 px-12 pr-12 text-sm text-black placeholder-gray-500 shadow-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100"
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-emerald-600" /> : <Eye className="h-5 w-5 text-emerald-600" />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-transparent py-3 px-12 pr-12 text-sm text-black placeholder-gray-500 shadow-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5 text-emerald-600" /> : <Eye className="h-5 w-5 text-emerald-600" />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 py-3 text-sm font-semibold text-white shadow-md hover:from-emerald-600 hover:to-emerald-800 transition cursor-pointer"
            >
              Register
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-700">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-emerald-700 hover:text-emerald-800">
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;