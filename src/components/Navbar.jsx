import { useState, useEffect } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center
        px-6 sm:px-10 py-3 transition-all duration-300
        ${scrolled ? "glass-teal shadow-lg" : "bg-[#096565]"}`}
    >
      {/* Logo */}
      <Link to="/">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight"
          style={{ fontFamily: "'Inter', sans-serif" }}>
          Tour{" "}
          <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
            India
          </span>
        </h1>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 items-center text-white">
        {["Home", "Destinations", "Packages", "Contact"].map((item) => (
          <li key={item}
            className="text-sm font-medium hover:text-white/70 transition duration-200 cursor-pointer tracking-tight">
            {item}
          </li>
        ))}
      </ul>

      <div id="Fauser" className="flex items-center gap-2">
        <Link to="/login">
          <div className="icon"><FaUser size={15} /></div>
        </Link>
        <button className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full glass-teal flex flex-col items-center
          gap-5 py-6 md:hidden shadow-xl">
          {["Home", "Destinations", "Packages", "Contact"].map((item) => (
            <span key={item} onClick={() => setMenuOpen(false)}
              className="text-white font-medium text-base hover:text-white/70 transition cursor-pointer">
              {item}
            </span>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
