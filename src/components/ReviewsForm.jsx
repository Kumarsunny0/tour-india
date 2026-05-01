import React, { useEffect, useRef, useState } from "react";

function ReviewCard({ review, index }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal");
    el.style.transitionDelay = `${index * 70}ms`;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref} className="card-ios p-5 flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#066363] to-[#0a9a9a]
          flex items-center justify-center text-white font-bold text-sm shrink-0">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-sm text-[#1c1c1e]">{review.name}</p>
          <p className="text-xs text-[#8e8e93]">{review.tour}</p>
        </div>
      </div>
      <div className="flex gap-0.5 mt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`text-sm ${i < Number(review.rating) ? "text-yellow-400" : "text-[#d1d1d6]"}`}>★</span>
        ))}
      </div>
      <p className="text-sm text-[#3a3a3c] leading-relaxed">{review.comment}</p>
    </div>
  );
}

const ReviewForm = () => {
  const formRef = useRef(null);
  const titleRef = useRef(null);

  const [reviews, setReviews] = useState([
    { name: "Aman", tour: "Goa Beach Trip", rating: 5, comment: "Goa ka trip super tha! Beaches aur nightlife amazing." },
    { name: "Riya", tour: "Jaipur Heritage Tour", rating: 4, comment: "Jaipur ka palace aur forts bahut beautiful the. Thoda crowded tha." },
    { name: "Rahul", tour: "Mumbai City Tour", rating: 5, comment: "Mumbai city ka vibe alag hi level ka tha. Gateway of India must visit!" },
    { name: "Sneha", tour: "Kerala Backwater Tour", rating: 5, comment: "Houseboat experience unforgettable tha. Nature bahut peaceful hai." },
    { name: "Vikram", tour: "Rishikesh Adventure Trip", rating: 4, comment: "Rafting aur camping experience mast tha. Food thoda mehenga tha." },
  ]);

  const [form, setForm] = useState({ name: "", tour: "", rating: 5, comment: "" });

  useEffect(() => {
    [titleRef, formRef].forEach((r, i) => {
      const el = r.current;
      if (!el) return;
      el.classList.add("reveal");
      el.style.transitionDelay = `${i * 100}ms`;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.unobserve(el); } },
        { threshold: 0.1 }
      );
      observer.observe(el);
    });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setReviews([form, ...reviews]);
    setForm({ name: "", tour: "", rating: 5, comment: "" });
  };

  return (
    <section className="px-4 sm:px-10 lg:px-20 py-16 bg-[#f2f2f7]">
      <div ref={titleRef} className="mb-10 text-center">
        <span className="section-label block mb-2">Community</span>
        <h2 className="heading-display text-3xl sm:text-4xl text-[#1c1c1e]">
          Traveller <em>Reviews</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-14">
        {reviews.map((r, i) => <ReviewCard key={i} review={r} index={i} />)}
      </div>

      {/* Form */}
      <div ref={formRef}
        className="card-ios p-6 sm:p-10 max-w-2xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-bold text-[#1c1c1e] mb-1 text-center"
          style={{ fontFamily: "'Inter', sans-serif" }}>
          Share Your Experience
        </h3>
        <p className="text-sm text-[#8e8e93] text-center mb-8">
          Your review helps other travellers plan better
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#3a3a3c] mb-1.5 tracking-wide">Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="Your name" required className="input-ios" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#3a3a3c] mb-1.5 tracking-wide">Tour Name</label>
              <input type="text" name="tour" value={form.tour} onChange={handleChange}
                placeholder="e.g. Goa Beach Trip" required className="input-ios" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3a3a3c] mb-1.5 tracking-wide">Rating</label>
            <select name="rating" value={form.rating} onChange={handleChange} className="input-ios">
              <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
              <option value={4}>⭐⭐⭐⭐ Very Good</option>
              <option value={3}>⭐⭐⭐ Good</option>
              <option value={2}>⭐⭐ Average</option>
              <option value={1}>⭐ Poor</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#3a3a3c] mb-1.5 tracking-wide">Your Comment</label>
            <textarea name="comment" value={form.comment} onChange={handleChange}
              rows={4} required placeholder="Tell us about your experience..."
              className="input-ios resize-none" />
          </div>

          <button type="submit" className="btn-ios btn-primary w-full py-4 mt-2 text-base">
            Submit Review
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReviewForm;
