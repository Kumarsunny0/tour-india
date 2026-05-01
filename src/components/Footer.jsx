import { useEffect, useRef } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal");
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.unobserve(el); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="bg-[#012b28] text-white">
      <div ref={ref}
        className="max-w-7xl mx-auto px-6 sm:px-10 py-14
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
            Tour{" "}
            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>India</span>
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mt-3">
            We offer unique experiences that showcase the best of Indian culture, heritage and natural beauty.
          </p>
          <div className="flex gap-3 mt-6">
            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
              <div key={i} className="ficon"><Icon size={14} /></div>
            ))}
          </div>
        </div>

        {/* Links */}
        {[
          {
            title: "Quick Links",
            items: ["Home", "About Us", "Tour Packages", "Destinations", "Special Offers"],
          },
          {
            title: "Support",
            items: ["FAQs", "Booking Guide", "Privacy Policy", "Terms & Conditions", "Contact Us"],
          },
          {
            title: "Contact",
            items: ["info@tourindia.com", "+91 98765 43210", "New Delhi, India"],
          },
        ].map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-5">
              {col.title}
            </h3>
            <ul className="space-y-3">
              {col.items.map((item) => (
                <li key={item}
                  className="text-white/70 text-sm hover:text-white transition cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 text-center py-5 text-white/30 text-xs">
        © 2025 Tour India. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
