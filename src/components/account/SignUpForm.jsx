import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { signupUser } from "../../api/authApi";

export default function SignUpForm({ onSwitch }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    avatar: "",
    gender: "",
    dateOfBirth: "",
  });

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
        gender: "",
        dateOfBirth: "",
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
      <div className="mb-10 text-center">
        <p className="mb-3 text-[10px] font-semibold tracking-widest text-accent uppercase">
          JOIN NIYA
        </p>

        <h1 className="font-serif text-3xl font-medium text-text-primary md:text-4xl">
          Create Account
        </h1>

        <p className="mt-3 text-xs leading-relaxed text-text-secondary">
          Create your account and discover effortless luxury.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-xs font-medium text-text-secondary">
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
            className="h-12 w-full border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-text-primary rounded-xs"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-text-secondary">
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
            className="h-12 w-full border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-text-primary rounded-xs"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-text-secondary">
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
            className="h-12 w-full border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-text-primary rounded-xs"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-text-secondary">
            Gender
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="h-12 w-full border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none transition focus:border-text-primary rounded-xs"
          >
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-text-secondary">
            Date of Birth
          </label>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="h-12 w-full border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none transition focus:border-text-primary rounded-xs"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-text-secondary">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
            autoComplete="new-password"
            className="h-12 w-full border border-border-soft bg-bg-primary px-4 text-xs text-text-primary outline-none transition placeholder:text-text-muted focus:border-text-primary rounded-xs"
          />
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
          className="flex h-12 w-full items-center justify-center gap-2 bg-text-primary text-xs font-semibold tracking-widest text-bg-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 rounded-xs"
        >
          {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          {!loading && <FiArrowRight size={14} />}
        </button>
      </form>

      <p className="mt-8 text-center text-xs text-text-secondary">
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
