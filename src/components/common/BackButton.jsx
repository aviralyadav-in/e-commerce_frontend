import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function BackButton({ label = "Back", className = "" }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          navigate(-1);
        } else {
          navigate("/");
        }
      }}
      className={`group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)] ${className}`}
    >
      <FiArrowLeft
        size={14}
        className="transition-transform duration-300 group-hover:-translate-x-1"
      />

      {label}
    </button>
  );
}

export default BackButton;
