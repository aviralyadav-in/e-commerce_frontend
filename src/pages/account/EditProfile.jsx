import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiCamera } from "react-icons/fi";

function EditProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Profile data:", formData);

    // Backend PUT /profile yahan baad mein connect karenge
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
            Update your personal information and account details.
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

          {/* ADDRESS */}
          <div className="mb-10 border-t border-border-soft pt-10">
            <p className="mb-6 text-[10px] font-semibold tracking-widest text-accent uppercase">
              ADDRESS
            </p>

            <div className="grid gap-6">
              {/* ADDRESS */}
              <div>
                <label className="mb-2 block text-[10px] font-semibold tracking-wider text-text-primary">
                  ADDRESS
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House no., street, area"
                  rows="3"
                  className="w-full resize-none border border-border-soft bg-bg-primary px-4 py-3 text-xs text-text-primary outline-none transition focus:border-text-primary rounded-xs"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                {/* CITY */}
                <div>
                  <label className="mb-2 block text-[10px] font-semibold tracking-wider text-text-primary">
                    CITY
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full border border-border-soft bg-bg-primary px-4 py-3 text-xs text-text-primary outline-none transition focus:border-text-primary rounded-xs"
                  />
                </div>

                {/* STATE */}
                <div>
                  <label className="mb-2 block text-[10px] font-semibold tracking-wider text-text-primary">
                    STATE
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full border border-border-soft bg-bg-primary px-4 py-3 text-xs text-text-primary outline-none transition focus:border-text-primary rounded-xs"
                  />
                </div>

                {/* PINCODE */}
                <div>
                  <label className="mb-2 block text-[10px] font-semibold tracking-wider text-text-primary">
                    PINCODE
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    className="w-full border border-border-soft bg-bg-primary px-4 py-3 text-xs text-text-primary outline-none transition focus:border-text-primary rounded-xs"
                  />
                </div>
              </div>
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