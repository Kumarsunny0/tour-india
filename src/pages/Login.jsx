import React, { useState, useEffect, useRef } from "react";
import hero from "../assets/hero.jpg";

const Login = () => {
  const cardRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", password: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(32px) scale(0.97)";
    setTimeout(() => {
      el.style.transition = "opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0) scale(1)";
    }, 120);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") { setFormData({ ...formData, phone: value.replace(/[^0-9]/g, "") }); return; }
    setFormData({ ...formData, [name]: value });
  };

  const sendOtp = () => {
    if (formData.phone.length !== 10) { alert("Enter valid 10 digit phone number!"); return; }
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp); setOtpSent(true); setVerified(false);
    alert(`Demo OTP: ${newOtp}`);
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) { setVerified(true); alert("OTP Verified ✅"); }
    else alert("Invalid OTP ❌");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!verified) { alert("Please verify OTP first!"); return; }
    alert("Login Successful 🎉");
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center px-4 py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${hero})`, filter: "blur(6px) brightness(0.6)" }} />
      <div className="absolute inset-0 bg-black/30" />

      {/* Card - Dark Glass */}
      <div ref={cardRef}
        className="relative w-full max-w-sm sm:max-w-md rounded-4xl p-7 sm:p-10 shadow-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.10)",
          backdropFilter: "saturate(180%) blur(28px)",
          WebkitBackdropFilter: "saturate(180%) blur(28px)",
          border: "1px solid rgba(255, 255, 255, 0.22)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
        }}>

        {/* Logo */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
            Tour{" "}
            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#066363" }}>
              India
            </span>
          </h2>
          <h1 className="text-3xl text-white mt-2"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800 }}>
            Welcome back
          </h1>
          <p className="text-sm text-white/50 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1.5 tracking-wide">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange}
              placeholder="Enter your name" required className="input-ios-dark" />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1.5 tracking-wide">Phone Number</label>
            <div className="flex gap-2">
              <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                placeholder="10-digit number" maxLength={10} required className="input-ios-dark flex-1" />
              <button type="button" onClick={sendOtp}
                className="btn-ios btn-primary px-4 py-2 text-sm whitespace-nowrap rounded-xl">
                Send OTP
              </button>
            </div>
          </div>

          {/* OTP */}
          {otpSent && (
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1.5 tracking-wide">OTP</label>
              <div className="flex gap-2">
                <input type="text" value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="6-digit OTP" maxLength={6} className="input-ios-dark flex-1" />
                <button type="button" onClick={verifyOtp}
                  className="btn-ios px-4 py-2 text-sm rounded-xl text-white"
                  style={{ background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.25)" }}>
                  Verify
                </button>
              </div>
              {verified && (
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span className="text-green-400 text-xs font-semibold">Phone verified</span>
                </div>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1.5 tracking-wide">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              placeholder="Enter your email" required className="input-ios-dark" />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1.5 tracking-wide">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange}
              placeholder="Enter password" required className="input-ios-dark" />
          </div>

          <button type="submit" disabled={!verified}
            className={`btn-ios w-full py-4 mt-2 text-base
              ${verified ? "btn-primary" : "cursor-not-allowed"}`}
            style={!verified ? {
              background: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.35)",
              border: "1px solid rgba(255,255,255,0.12)"
            } : {}}>
            {verified ? "Sign In" : "Verify phone to continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
