
import { FiArrowRight } from "react-icons/fi";

function SignUp({ onSwitch }) {
  return (
    <div className="w-full max-w-[430px]">
      <div className="mb-10 text-center">
        <p className="mb-3 text-[10px] tracking-[0.25em] text-[#c39920]">JOIN NIYA</p>
        <h1 className="font-serif text-[34px] font-medium text-[#073b4c]">Create Account</h1>
        <p className="mt-3 text-[12px] leading-6 text-[#6b7f85]">Create your account and discover effortless luxury.</p>
      </div>

      <form className="space-y-5">
        <div>
          <label className="mb-2 block text-[11px] text-[#385b66]">Full Name</label>
          <input type="text" placeholder="Enter your full name" className="h-12 w-full border border-[#dfe6e6] bg-white px-4 text-[12px] text-[#073b4c] outline-none transition focus:border-[#073b4c]" />
        </div>

        <div>
          <label className="mb-2 block text-[11px] text-[#385b66]">Email Address</label>
          <input type="email" placeholder="Enter your email" className="h-12 w-full border border-[#dfe6e6] bg-white px-4 text-[12px] text-[#073b4c] outline-none transition focus:border-[#073b4c]" />
        </div>

        <div>
          <label className="mb-2 block text-[11px] text-[#385b66]">Phone Number</label>
          <input type="tel" placeholder="Enter your phone number" className="h-12 w-full border border-[#dfe6e6] bg-white px-4 text-[12px] text-[#073b4c] outline-none transition focus:border-[#073b4c]" />
        </div>

        <div>
          <label className="mb-2 block text-[11px] text-[#385b66]">Password</label>
          <input type="password" placeholder="Create a password" className="h-12 w-full border border-[#dfe6e6] bg-white px-4 text-[12px] text-[#073b4c] outline-none transition focus:border-[#073b4c]" />
        </div>

        <div>
          <label className="mb-2 block text-[11px] text-[#385b66]">Confirm Password</label>
          <input type="password" placeholder="Confirm your password" className="h-12 w-full border border-[#dfe6e6] bg-white px-4 text-[12px] text-[#073b4c] outline-none transition focus:border-[#073b4c]" />
        </div>

        <button type="submit" className="flex h-12 w-full items-center justify-center gap-2 bg-[#073b4c] text-[11px] tracking-[0.12em] text-white transition hover:bg-[#0b4d60]">
          CREATE ACCOUNT <FiArrowRight size={14} />
        </button>
      </form>

      <p className="mt-8 text-center text-[11px] text-[#6b7f85]">
        Already have an account?{" "}
        <button onClick={onSwitch} className="ml-1 text-[#c39920] hover:underline">Sign In</button>
      </p>
    </div>
  );
}

export default SignUp;;
