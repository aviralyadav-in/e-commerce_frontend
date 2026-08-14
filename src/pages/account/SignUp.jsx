import { FiArrowRight } from "react-icons/fi";

function SignUp({ onSwitch }) {
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
      <form className="space-y-5">
        {/* FULL NAME */}
        <div>
          <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
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
            placeholder="Enter your email"
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
            placeholder="Enter your phone number"
            className="h-12 w-full border border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] px-4 text-[12px] text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-text-primary)]"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            className="h-12 w-full border border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] px-4 text-[12px] text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-text-primary)]"
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="mb-2 block text-[11px] text-[var(--color-text-secondary)]">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm your password"
            className="h-12 w-full border border-[var(--color-border-soft)] bg-[var(--color-bg-primary)] px-4 text-[12px] text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-text-primary)]"
          />
        </div>

        {/* CREATE ACCOUNT */}
        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center gap-2 bg-[var(--color-text-primary)] text-[11px] tracking-[0.12em] text-[var(--color-bg-primary)] transition hover:opacity-90"
        >
          CREATE ACCOUNT
          <FiArrowRight size={14} />
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
