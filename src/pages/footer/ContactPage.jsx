import { useEffect, useState } from "react";
import {
  FiInstagram,
  FiMail,
  FiPhone,
  FiSend,
  FiClock,
} from "react-icons/fi";
import { getFooterPage } from "../../api/footerApi";

function ContactPage() {
  const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const loadPage = async () => {
      try {
        const result = await getFooterPage("contact");

        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Failed to load Contact page:", error);
      }
    };

    loadPage();
  }, []);

  // ===============================
  // FORM HANDLERS
  // ===============================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Contact form submitted:", formData);

    // POST API baad mein connect karenge.
  };

  // ===============================
  // ICON MAP
  // ===============================

  const iconMap = {
    instagram: FiInstagram,
    email: FiMail,
    phone: FiPhone,
  };

  // ===============================
  // LOADING
  // ===============================

  if (!data) {
    return (
      <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8">
          <p className="text-sm text-[var(--color-text-muted)]">
            Loading...
          </p>
        </div>
      </main>
    );
  }
console.log("CONTACT DATA:", data);
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] transition-colors duration-300">

      {/* ===============================
          HERO
      =============================== */}

      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-accent)]">
            {data.eyebrow}
          </p>

          <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-[1.08] text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
            {data.intro}
          </p>
        </div>
      </section>

      {/* ===============================
          3 CONTACT BLOCKS
      =============================== */}

      <section>
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">

          <div className="grid gap-4 md:grid-cols-3">

            {data.contactDetails?.map((detail) => {
              const Icon = iconMap[detail.type];

              return (
                <article
                  key={detail.type}
                  className="border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 transition-colors duration-300 sm:p-6"
                >

                  {/* ICON */}

                  <div className="mb-5 flex h-11 w-11 items-center justify-center border border-[var(--color-border)] text-[var(--color-accent)]">
                    {Icon && <Icon size={20} />}
                  </div>

                  {/* TITLE */}

                  <h2 className="font-serif text-2xl text-[var(--color-text-primary)]">
                    {detail.title}
                  </h2>

                  {/* CONTENT */}

                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                    {detail.content}
                  </p>

                  {/* VALUE */}

                  {detail.value && detail.url && (
                    <a
                      href={detail.url}
                      target={
                        detail.type === "instagram"
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        detail.type === "instagram"
                          ? "noreferrer"
                          : undefined
                      }
                      className="mt-4 inline-flex text-sm font-medium text-[var(--color-text-primary)] transition hover:text-[var(--color-accent)]"
                    >
                      {detail.value}
                    </a>
                  )}

                </article>
              );
            })}

          </div>

          {/* ===============================
              SUPPORT HOURS
          =============================== */}

          {data.supportHours && (
            <div className="mt-4 flex items-start gap-3 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 sm:p-6">

              <FiClock
                size={20}
                className="mt-0.5 shrink-0 text-[var(--color-accent)]"
              />

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-primary)]">
                  Support Hours
                </p>

                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {data.supportHours}
                </p>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* ===============================
          CONTACT FORM
      =============================== */}

      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">

        <div className="mx-auto max-w-6xl px-5 py-9 sm:px-6 lg:px-8 lg:py-12">

          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">

            {/* ===============================
                LEFT CONTENT
            =============================== */}

            <div>

              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Get in touch
              </p>

              <h2 className="mt-2 max-w-md font-serif text-3xl leading-tight text-[var(--color-text-primary)] sm:text-4xl">
                Have a question? We’re here to help.
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-[var(--color-text-secondary)] sm:text-base">
                Whether you have a question about your order, a product,
                shipping, returns, or anything else, send us a message and
                our team will get back to you.
              </p>

              <div className="mt-6 space-y-4">

                {/* EMAIL */}

                {data.contactDetails?.find(
                  (item) => item.type === "email"
                ) && (
                  <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">

                    <FiMail
                      size={17}
                      className="shrink-0 text-[var(--color-accent)]"
                    />

                    <a
                      href={
                        data.contactDetails.find(
                          (item) => item.type === "email"
                        ).url
                      }
                      className="transition hover:text-[var(--color-accent)]"
                    >
                      {
                        data.contactDetails.find(
                          (item) => item.type === "email"
                        ).value
                      }
                    </a>

                  </div>
                )}

                {/* PHONE */}

                {data.contactDetails?.find(
                  (item) => item.type === "phone"
                ) && (
                  <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">

                    <FiPhone
                      size={17}
                      className="shrink-0 text-[var(--color-accent)]"
                    />

                    <a
                      href={
                        data.contactDetails.find(
                          (item) => item.type === "phone"
                        ).url
                      }
                      className="transition hover:text-[var(--color-accent)]"
                    >
                      {
                        data.contactDetails.find(
                          (item) => item.type === "phone"
                        ).value
                      }
                    </a>

                  </div>
                )}

                {/* SUPPORT HOURS */}

                {data.supportHours && (
                  <div className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">

                    <FiClock
                      size={17}
                      className="mt-0.5 shrink-0 text-[var(--color-accent)]"
                    />

                    <span>{data.supportHours}</span>

                  </div>
                )}

              </div>

            </div>

            {/* ===============================
                FORM
            =============================== */}

            <form
              onSubmit={handleSubmit}
              className="border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-5 sm:p-7"
            >

              <div className="grid gap-5 sm:grid-cols-2">

                {/* NAME */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--color-text-primary)]"
                  >
                    Full Name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="h-11 w-full border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-accent)]"
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--color-text-primary)]"
                  >
                    Email Address *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="h-11 w-full border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-accent)]"
                  />
                </div>

                {/* PHONE */}

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--color-text-primary)]"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91"
                    className="h-11 w-full border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-accent)]"
                  />
                </div>

                {/* SUBJECT */}

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--color-text-primary)]"
                  >
                    Subject *
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="h-11 w-full border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-accent)]"
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Related</option>
                    <option value="product">Product Enquiry</option>
                    <option value="shipping">
                      Shipping & Delivery
                    </option>
                    <option value="returns">
                      Returns & Exchange
                    </option>
                    <option value="payment">Payment Issue</option>
                    <option value="partnership">
                      Partnership / Collaboration
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* MESSAGE */}

                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[var(--color-text-primary)]"
                  >
                    Message *
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    required
                    rows={6}
                    className="w-full resize-none border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-3 py-3 text-sm text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-accent)]"
                  />
                </div>

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 bg-[var(--color-text-primary)] px-6 text-sm font-medium text-[var(--color-bg-primary)] transition-all duration-300 hover:bg-[var(--color-accent)]"
              >
                Send Message
                <FiSend size={15} />
              </button>

              <p className="mt-3 text-[11px] leading-5 text-[var(--color-text-muted)]">
                We’ll use your information only to respond to your enquiry.
              </p>

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}

export default ContactPage;