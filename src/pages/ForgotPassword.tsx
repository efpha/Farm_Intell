import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "../components/toast/toast";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  // TODO
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      //   redirectTo: `${window.location.origin}/reset-password`, // adjust to your reset password route
      // });

      // if (resetError) throw resetError;

      setSubmitted(true);
      success("Email sent", "Check your inbox for the reset link.");
    } catch (err: any) {
      error("Request failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/homebg.jpg')" }}
    >
      <div className="min-h-screen w-full bg-black/40 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white p-8 shadow-2xl backdrop-blur-md">

          {/* Brand */}
          <div className="text-center mb-6">
            <Link to="/" className="flex flex-col items-center gap-1">
              <Leaf className="h-7 w-7 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">FarmIntell</h2>
            </Link>
          </div>

          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Forgot your password?</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Enter your email and we'll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-transparent py-3 px-12 text-sm text-black placeholder-gray-500 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 py-3 text-sm font-semibold text-white shadow-md hover:from-emerald-600 hover:to-emerald-800 transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <div className="flex justify-center">
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </form>
            </>
          ) : (
            /* Success state */
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="h-14 w-14 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Check your inbox</h3>
              <p className="text-sm text-gray-600">
                We sent a password reset link to{" "}
                <span className="font-medium text-gray-800">{email}</span>.
                Check your spam folder if you don't see it.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 mt-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;