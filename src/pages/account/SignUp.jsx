import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { signupUser } from "../../api/api";

function SignUp({ onSwitch }) {
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

  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // ===============================
  // SIGN UP
  // ===============================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        avatar: formData.avatar,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
      });

      console.log("SIGNUP SUCCESS:", response);

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
        onSwitch();
      }, 1200);
    } catch (error) {
      console.error("SIGNUP ERROR:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to create account. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[430px]">
      {/* HEADER */}

      <div className="mb-10 text-center">
        <p className="mb-3 text-[10px] tracking-[0.25em] text-[var(--color-accent)]">
          JOIN NIYA
        </p>

        <h1 className="font-serif text-[34px] font-medium text-[var(--color-text-primary)]">
          Create Account
        </h1>

        <p className="mt-3 text-[12px] leading-6 text-[var(--color-text-secondary)]">
          Create your account and discover effortless luxury.
        </p>
      </div>

      {/* FORM */}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* FULL NAME */}

        <div>
          <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
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
            className="h-12 w-full border border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] px-4 text-[12px] text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-text-primary)]"
          />
        </div>

        {/* EMAIL */}

        <div>
          <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
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
            className="h-12 w-full border border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] px-4 text-[12px] text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-text-primary)]"
          />
        </div>

        {/* PHONE */}

        <div>
          <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
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
            className="h-12 w-full border border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] px-4 text-[12px] text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-text-primary)]"
          />
        </div>

        {/* GENDER */}

        <div>
          <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
            Gender
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="h-12 w-full border border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] px-4 text-[12px] text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-text-primary)]"
          >
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* DATE OF BIRTH */}

        <div>
          <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
            Date of Birth
          </label>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="h-12 w-full border border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] px-4 text-[12px] text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-text-primary)]"
          />
        </div>

        {/* PASSWORD */}

        <div>
          <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
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
            className="h-12 w-full border border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] px-4 text-[12px] text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-text-primary)]"
          />
        </div>

        {/* ERROR */}

        {error && (
          <p className="text-center text-[11px] text-red-500">{error}</p>
        )}

        {/* SUCCESS */}

        {success && (
          <p className="text-center text-[11px] text-green-600">{success}</p>
        )}

        {/* CREATE ACCOUNT */}

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 bg-[var(--color-text-primary)] text-[11px] tracking-[0.12em] text-[var(--color-bg-primary)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}

          {!loading && <FiArrowRight size={14} />}
        </button>
      </form>

      {/* SWITCH */}

      <p className="mt-8 text-center text-[11px] text-[var(--color-text-secondary)]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="ml-1 text-[var(--color-accent)] hover:underline"
        >
          Sign In
        </button>
      </p>
    </div>
  );
}

export default SignUp;
