import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiCamera, FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { getProfile } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

const EMPTY_ADDRESS = {
  address: "",
  city: "",
  state: "",
  pincode: "",
};

function AddressCard({
  index,
  address,
  isOpen,
  onToggle,
  onChange,
  onRemove,
  canRemove,
}) {
  return (
    <div
      className={`rounded-xs border bg-bg-primary transition ${
        isOpen
          ? "border-text-primary"
          : "border-border-soft hover:border-text-secondary"
      }`}
    >
      {/* HEADER ROW */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {isOpen ? (
            <FiMinus size={14} className="text-accent" />
          ) : (
            <FiPlus size={14} className="text-accent" />
          )}

          <span className="text-xs font-semibold tracking-wider text-text-primary">
            {address.address
              ? `Address ${index + 1}`
              : `Add Address ${index + 1}`}
          </span>

          {address.address && !isOpen && (
            <span className="hidden text-[10px] text-text-muted sm:inline">
              · {address.address}
            </span>
          )}
        </div>

        {canRemove && address.address && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onRemove();
              }
            }}
            className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-xs text-text-muted transition hover:bg-red-50 hover:text-red-600"
            aria-label={`Remove address ${index + 1}`}
          >
            <FiTrash2 size={13} />
          </span>
        )}
      </button>

      {/* EXPANDED FORM */}
      {isOpen && (
        <div className="grid gap-4 border-t border-border-soft p-4 sm:p-5">
          <div>
            <label className="mb-2 block text-[10px] font-semibold tracking-wider text-text-primary">
              STREET ADDRESS
            </label>
            <textarea
              name="address"
              value={address.address}
              onChange={(e) => onChange(e)}
              placeholder="House no., street, area"
              rows="2"
              className="w-full resize-none border border-border-soft bg-bg-secondary px-4 py-3 text-xs text-text-primary outline-none transition focus:border-text-primary rounded-xs"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-[10px] font-semibold tracking-wider text-text-primary">
                CITY
              </label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={(e) => onChange(e)}
                placeholder="City"
                className="w-full border border-border-soft bg-bg-secondary px-4 py-3 text-xs text-text-primary outline-none transition focus:border-text-primary rounded-xs"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-semibold tracking-wider text-text-primary">
                STATE
              </label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={(e) => onChange(e)}
                placeholder="State"
                className="w-full border border-border-soft bg-bg-secondary px-4 py-3 text-xs text-text-primary outline-none transition focus:border-text-primary rounded-xs"
              />
            </div>

            <div>
              <label className="mb-2 block text-[10px] font-semibold tracking-wider text-text-primary">
                PINCODE
              </label>
              <input
                type="text"
                name="pincode"
                value={address.pincode}
                onChange={(e) => onChange(e)}
                placeholder="Pincode"
                className="w-full border border-border-soft bg-bg-secondary px-4 py-3 text-xs text-text-primary outline-none transition focus:border-text-primary rounded-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EditProfile() {
  const { updateUserProfile, maxAddresses } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    avatar: "",
  });

  // ============================================
  // ADDRESS STATE — fixed 3 slots
  // ============================================

  const [addresses, setAddresses] = useState([
    { ...EMPTY_ADDRESS },
    { ...EMPTY_ADDRESS },
    { ...EMPTY_ADDRESS },
  ]);

  // Track which slots are open. Open the first non-empty one initially.
  const [openSlots, setOpenSlots] = useState([true, false, false]);

  // ============================================
  // LOAD CURRENT USER PROFILE
  // ============================================

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await getProfile();
        const u = response?.user;

        if (!u) return;

        setFormData({
          fullName: u.name || "",
          email: u.email || "",
          phone: u.phone || "",
          gender: u.gender || "",
          dateOfBirth: u.dateOfBirth || "",
          avatar: u.avatar || "",
        });

        const saved = Array.isArray(u.addresses) ? u.addresses : [];
        const filled = [...saved];

        while (filled.length < maxAddresses) {
          filled.push({ ...EMPTY_ADDRESS });
        }

        setAddresses(filled.slice(0, maxAddresses));

        // Open the first empty slot (the next address to be added)
        const firstEmptyIdx = filled.findIndex((a) => !a.address);
        const initialOpen = [false, false, false];
        if (firstEmptyIdx >= 0) {
          initialOpen[firstEmptyIdx] = true;
        } else {
          initialOpen[0] = true;
        }
        setOpenSlots(initialOpen);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    }

    loadProfile();
  }, [maxAddresses]);

  // ============================================
  // BASIC FIELD CHANGE
  // ============================================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ============================================
  // ADDRESS HANDLERS
  // ============================================

  const toggleSlot = (idx) => {
    setOpenSlots((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  const handleAddressChange = (idx, e) => {
    const { name, value } = e.target;
    setAddresses((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [name]: value };
      return next;
    });
  };

  const handleRemoveAddress = (idx) => {
    setAddresses((prev) => {
      const next = [...prev];
      next[idx] = { ...EMPTY_ADDRESS };
      return next;
    });
    setOpenSlots((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  // ============================================
  // SUBMIT
  // ============================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Keep only fully filled addresses
    const cleanedAddresses = addresses
      .filter((a) => a.address && a.city && a.pincode)
      .map((a, idx) => ({
        ...a,
        isDefault: idx === 0,
      }));

    try {
      const response = await updateUserProfile({
        name: formData.fullName,
        phone: formData.phone,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        addresses: cleanedAddresses,
        avatar: formData.avatar,
      });

      console.log("PROFILE UPDATED:", response);
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert(error.message || "Failed to update profile.");
    }
  };

  return (
    <main className="min-h-[calc(100vh-70px)] bg-bg-primary px-5 py-8 text-text-primary md:px-10 md:py-10">
      <div className="mx-auto max-w-[900px]">

        {/* BACK */}
        <Link
          to="/account"
          className="mb-8 inline-flex items-center gap-2 text-xs font-medium tracking-wider text-text-secondary transition hover:text-accent"
        >
          <FiArrowLeft size={13} />
          BACK TO ACCOUNT
        </Link>

        {/* HEADER */}
        <div className="mb-10">
          <p className="mb-3 text-[10px] font-semibold tracking-widest text-accent uppercase">
            PERSONAL DETAILS
          </p>

          <h1 className="font-serif text-3xl font-medium text-text-primary md:text-4xl">
            Edit Profile
          </h1>

          <p className="mt-3 max-w-[500px] text-xs leading-relaxed text-text-secondary">
            Update your personal information and saved addresses.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="border border-border-soft bg-bg-secondary p-6 md:p-10 rounded-sm"
        >
          {/* AVATAR */}
          <div className="mb-10 flex items-center gap-5 border-b border-border-soft pb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-soft text-accent">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <FiCamera size={22} strokeWidth={1.2} />
              )}
            </div>

            <div>
              <p className="text-xs font-semibold text-text-primary">
                Profile Photo
              </p>

              <p className="mt-1 text-xs text-text-secondary">
                Add an image URL for your profile photo.
              </p>
            </div>
          </div>

          {/* BASIC INFORMATION */}
          <div className="mb-10">
            <p className="mb-6 text-[10px] font-semibold tracking-widest text-accent uppercase">
              BASIC INFORMATION
            </p>

            <div className="grid gap-6 md:grid-cols-2">

              {/* FULL NAME */}
              <div>
                <label className="mb-2 block text-[10px] font-semibold tracking-wider text-text-primary">
                  FULL NAME
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full border border-border-soft bg-bg-primary px-4 py-3 text-xs text-text-primary outline-none transition focus:border-text-primary rounded-xs"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-[10px] font-semibold tracking-wider text-text-primary">
                  EMAIL ADDRESS
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  disabled
                  className="w-full cursor-not-allowed border border-border-soft bg-bg-tertiary px-4 py-3 text-xs text-text-muted outline-none rounded-xs"
                />

                <p className="mt-2 text-[10px] text-text-muted">
                  Email cannot be changed here.
                </p>
              </div>

              {/* PHONE */}
              <div>
                <label className="mb-2 block text-[10px] font-semibold tracking-wider text-text-primary">
                  PHONE NUMBER
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full border border-border-soft bg-bg-primary px-4 py-3 text-xs text-text-primary outline-none transition focus:border-text-primary rounded-xs"
                />
              </div>

              {/* GENDER */}
              <div>
                <label className="mb-2 block text-[10px] font-semibold tracking-wider text-text-primary">
                  GENDER
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border border-border-soft bg-bg-primary px-4 py-3 text-xs text-text-primary outline-none transition focus:border-text-primary rounded-xs"
                >
                  <option value="">Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* DOB */}
              <div>
                <label className="mb-2 block text-[10px] font-semibold tracking-wider text-text-primary">
                  DATE OF BIRTH
                </label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full border border-border-soft bg-bg-primary px-4 py-3 text-xs text-text-primary outline-none transition focus:border-text-primary rounded-xs"
                />
              </div>
            </div>
          </div>

          {/* ADDRESSES — 3 collapsible slots */}
          <div className="mb-10 border-t border-border-soft pt-10">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="mb-2 text-[10px] font-semibold tracking-widest text-accent uppercase">
                  SAVED ADDRESSES
                </p>
                <p className="text-xs text-text-secondary">
                  You can save up to {maxAddresses} addresses. Use the
                  <span className="mx-1 inline-flex h-4 w-4 items-center justify-center rounded-xs border border-border-soft text-text-primary align-middle">
                    <FiPlus size={10} />
                  </span>
                  to add a new one.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {addresses.map((addr, idx) => (
                <AddressCard
                  key={idx}
                  index={idx}
                  address={addr}
                  isOpen={openSlots[idx]}
                  onToggle={() => toggleSlot(idx)}
                  onChange={(e) => handleAddressChange(idx, e)}
                  onRemove={() => handleRemoveAddress(idx)}
                  canRemove
                />
              ))}
            </div>
          </div>

          {/* AVATAR URL */}
          <div className="mb-10 border-t border-border-soft pt-10">
            <p className="mb-6 text-[10px] font-semibold tracking-widest text-accent uppercase">
              PROFILE IMAGE
            </p>

            <label className="mb-2 block text-[10px] font-semibold tracking-wider text-text-primary">
              AVATAR URL
            </label>

            <input
              type="url"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-border-soft bg-bg-primary px-4 py-3 text-xs text-text-primary outline-none transition focus:border-text-primary rounded-xs"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-4 border-t border-border-soft pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/account"
              className="text-center text-xs font-semibold tracking-wider text-text-secondary transition hover:text-text-primary"
            >
              CANCEL
            </Link>

            <button
              type="submit"
              className="bg-accent px-8 py-3 text-xs font-semibold tracking-widest text-white transition hover:opacity-90 rounded-xs"
            >
              SAVE CHANGES
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditProfile;