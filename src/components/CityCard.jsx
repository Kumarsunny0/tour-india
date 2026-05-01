import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function CityCard({ image, name, desc, link, index = 0 }) {
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal");
    el.style.transitionDelay = `${index * 70}ms`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      onClick={() => link && navigate(link)}
      className={`card-ios ${link ? "cursor-pointer" : ""} group`}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

        {link && (
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm
            rounded-full px-3 py-1 text-xs font-semibold text-[#066363]
            opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Explore →
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        <h3 className="text-base font-700 text-[#1c1c1e] tracking-tight"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
          {name}
        </h3>
        <p className="text-sm text-[#8e8e93] mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

export default CityCard;
