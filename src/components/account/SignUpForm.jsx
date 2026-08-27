import { useState } from "react";
import { FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { signupUser } from "../../api/authApi";

export default function SignUpForm({ onSwitch }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    avatar: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await signupUser(formData);
      setSuccess("Account created successfully. Please sign in.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        avatar: "",
      });

      setTimeout(() => {
        if (onSwitch) onSwitch();
      }, 1200);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Unable to create account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[430px]">
      {/* Header section with minimal spacing to prevent scrolling */}
      <div className="mb-5 text-center">
        <p className="mb-1 text-[10px] font-semibold tracking-widest text-accent uppercase">
          JOIN NIYA
        </p>

        <h1 className="font-serif text-2xl font-medium text-text-primary md:text-3xl">
          Create Account
        </h1>

        <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
          Create your account and discover effortless luxury.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="mb-1 block text-xs font-medium text-text-secondary">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            autoComplete="name"
            className="h-11 w-full border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-text-primary rounded-xs"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-text-secondary">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            autoComplete="email"
            className="h-11 w-full border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-text-primary rounded-xs"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-text-secondary">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            autoComplete="tel"
            className="h-11 w-full border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-text-primary rounded-xs"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-text-secondary">
            Password
          </label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              autoComplete="new-password"
              className="h-11 w-full border border-border-soft bg-bg-primary px-4 pr-12 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-text-primary rounded-xs"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 text-text-secondary hover:text-text-primary focus:outline-none"
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-center text-xs text-red-500 font-medium">{error}</p>
        )}

        {success && (
          <p className="text-center text-xs text-emerald-600 font-medium">{success}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex h-11 w-full items-center justify-center gap-2 bg-text-primary text-xs font-semibold tracking-widest text-bg-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 rounded-xs mt-1"
        >
          {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          {!loading && <FiArrowRight size={14} />}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-text-secondary">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="ml-1 font-semibold text-accent hover:underline"
        >
          Sign In
        </button>
      </p>
    </div>
  );
}