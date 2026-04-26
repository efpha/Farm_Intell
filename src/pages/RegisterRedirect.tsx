import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, RefreshCw, ArrowLeft, CheckCircle2 } from "lucide-react";

const RegisterRedirect: React.FC = () => {
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    // Replace with your actual resend logic, e.g. supabase.auth.resend(...)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setResent(true);
    setTimeout(() => setResent(false), 4000);
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/homebg.jpg')" }}
    >
      <div className="min-h-screen w-full bg-black/40 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-lg bg-white p-10 backdrop-blur-md mx-auto text-center">

          {/* envelope icon */}
          <div className="flex items-center justify-center">
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full border-emerald-500">
              <Mail className="h-10 w-10 text-emerald-600"/>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Check your inbox
          </h1>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            We've sent a verification link to your email address. Click the link
            in that email to activate your account and get started.
          </p>

          {/* Resend button */}
          <button
            type="button"
            onClick={handleResend}
            disabled={loading || resent}
            // reduce the width of the button below the text width and center it
            className="w-max mx-auto bg-emerald-600 flex items-center justify-center gap-2 border border-emerald-600 py-3 px-6 text-sm font-semibold text-white hover:bg-emerald-700 transition disabled:opacity-60 disabled:cursor-not-allowed mb-4 cursor-pointer"
          >
            {resent ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Email resent!
              </>
            ) : loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Resend verification email
              </>
            )}
          </button>

          {/* Back to login */}
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          <p className="mt-6 text-xs text-gray-400">
            Didn't receive it? Check your spam folder or try a different email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterRedirect;