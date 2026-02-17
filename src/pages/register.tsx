import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Leaf,
  Mail,
  Lock,
  User,
  Phone,
  CalendarDays,
} from "lucide-react";

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Replace with your real API call
    console.log("Registering:", {
      firstName,
      lastName,
      phoneNumber,
      dob,
      email,
      password,
    });
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
          {/* Register Card */}
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
                    Create your account to get started
                </p>
            </div>


            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              {/* First Name */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  required
                  className="w-full rounded-2xl border bg-white px-11 py-3 text-sm outline-none focus:border-emerald-500"
                />
              </div>

              {/* Last Name */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  required
                  className="w-full rounded-2xl border bg-white px-11 py-3 text-sm outline-none focus:border-emerald-500"
                />
              </div>

              {/* Phone Number */}
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone number"
                  required
                  className="w-full rounded-2xl border bg-white px-11 py-3 text-sm outline-none focus:border-emerald-500"
                />
              </div>

              {/* Date of Birth */}
              <div className="relative">
                <CalendarDays className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className="w-full rounded-2xl border bg-white px-11 py-3 text-sm text-slate-700 outline-none focus:border-emerald-500"
                />
              </div>

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
                  placeholder="Password"
                  required
                  className="w-full rounded-2xl border bg-white px-11 py-3 pr-12 text-sm outline-none focus:border-emerald-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-emerald-600" />
                  )}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  className="w-full rounded-2xl border bg-white px-11 py-3 pr-12 text-sm outline-none focus:border-emerald-500"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-emerald-600" />
                  )}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-700"
              >
                Register
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-slate-700">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
