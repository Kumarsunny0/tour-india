import { useEffect, useRef } from "react";
import hero from "../assets/hero.jpg";

function Hero() {
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const items = [
      { el: titleRef.current, delay: 100 },
      { el: subRef.current, delay: 260 },
      { el: btnRef.current, delay: 400 },
    ];
    items.forEach(({ el, delay }) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delay);
    });
  }, []);

  return (
    <section
      className="relative h-svh bg-cover bg-center  flex items-center justify-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      {/* Layered overlay for depth */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/60" />

      <div className="relative text-center px-6 sm:px-12 max-w-4xl mx-auto">
        {/* Label */}
        <div ref={titleRef} className="mb-6">
          <span className="section-label text-white tracking-widest font-bold text-2xl mb-4 block">
            Discover India
          </span>
          <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl text-white mb-0 drop-shadow-sm">
            Welcome to{" "}
            <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 700 }}>
              Tour
            </em>{" "}
            India
          </h1>
        </div>

        <p ref={subRef}
          className="text-base sm:text-lg md:text-xl text-white/80 max-w-lg mx-auto leading-relaxed mb-8"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
          Discover the land of diverse cultures and breathtaking landscapes
        </p>

        <div ref={btnRef} className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="btn-ios btn-primary px-8 py-4 text-base">
            Explore Now
          </button>
          <button className="btn-ios btn-outline px-8 py-4 text-base text-white border-white/30 bg-white/20 hover:bg-white">
            View Packages
          </button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#f2f2f7] to-transparent" />
    </section>
  );
}

export default Hero;
