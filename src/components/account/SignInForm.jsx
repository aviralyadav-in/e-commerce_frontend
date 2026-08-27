import { useState } from "react";
import { FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function SignInForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Password visibility ke liye state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Unable to sign in. Please check your email and password.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[430px]">
      <div className="mb-10 text-center">
        <p className="mb-3 text-[10px] font-semibold tracking-widest text-accent uppercase">
          WELCOME BACK
        </p>

        <h1 className="font-serif text-3xl font-medium text-text-primary md:text-4xl">
          Sign In
        </h1>

        <p className="mt-3 text-xs leading-relaxed text-text-secondary">
          Sign in to access your Niya Bags account.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-xs text-text-secondary font-medium">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
            autoComplete="email"
            className="h-12 w-full border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-text-primary rounded-xs"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs text-text-secondary font-medium">
              Password
            </label>

            <button
              type="button"
              className="text-[10px] font-semibold text-accent hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Password Input Wrapper */}
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              className="h-12 w-full border border-border-soft bg-bg-primary px-4 pr-12 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-text-primary rounded-xs"
            />
            
            {/* Eye Icon Button */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 text-text-secondary hover:text-text-primary focus:outline-none"
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
        </div>

        {error && <p className="text-xs leading-relaxed text-red-500 font-medium">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 bg-text-primary text-xs font-semibold tracking-widest text-bg-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 rounded-xs"
        >
          {loading ? "SIGNING IN..." : "SIGN IN"}
          {!loading && <FiArrowRight size={14} />}
        </button>
      </form>

      <p className="mt-8 text-center text-xs text-text-secondary">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="ml-1 font-semibold text-accent hover:underline"
        >
          Create Account
        </button>
      </p>
    </div>
  );
}