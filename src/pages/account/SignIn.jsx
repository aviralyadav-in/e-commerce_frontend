import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/api";

function SignIn({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await loginUser(username, password);

      console.log("LOGIN SUCCESS:", user);

      localStorage.setItem("niyaUser", JSON.stringify(user));

      navigate("/");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to sign in. Please check your username and password.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[430px]">
      {/* HEADER */}
      <div className="mb-10 text-center">
        <p className="mb-3 text-[10px] tracking-[0.25em] text-[var(--color-accent)]">
          WELCOME BACK
        </p>

        <h1 className="font-serif text-[34px] font-medium text-[var(--color-text-primary)]">
          Sign In
        </h1>

        <p className="mt-3 text-[12px] leading-6 text-[var(--color-text-secondary)]">
          Sign in to access your Niya Bags account.
        </p>
      </div>

      {/* FORM */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* USERNAME */}
        <div>
          <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter your username"
            required
            className="h-12 w-full border border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] px-4 text-[12px] text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-text-primary)]"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-[11px] text-[var(--color-text-secondary)]">
              Password
            </label>

            <button
              type="button"
              className="text-[10px] text-[var(--color-accent)] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
            className="h-12 w-full border border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] px-4 text-[12px] text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-text-primary)]"
          />
        </div>

        {/* ERROR */}
        {error && <p className="text-[11px] leading-5 text-red-500">{error}</p>}

        {/* SIGN IN BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-2 bg-[var(--color-text-primary)] text-[11px] tracking-[0.12em] text-[var(--color-bg-primary)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "SIGNING IN..." : "SIGN IN"}

          {!loading && <FiArrowRight size={14} />}
        </button>
      </form>

      {/* SWITCH */}
      <p className="mt-8 text-center text-[11px] text-[var(--color-text-secondary)]">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="ml-1 text-[var(--color-accent)] hover:underline"
        >
          Create Account
        </button>
      </p>
    </div>
  );
}

export default SignIn;
