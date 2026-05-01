import React, { useEffect, useRef } from "react";

function ReviewCard({ review, index }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal");
    el.style.transitionDelay = `${index * 80}ms`;
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
          <span key={i} className={`text-sm ${i < review.rating ? "text-yellow-400" : "text-[#d1d1d6]"}`}>★</span>
        ))}
      </div>
      <p className="text-sm text-[#3a3a3c] leading-relaxed">{review.comment}</p>
    </div>
  );
}

const Feedback = () => {
  const titleRef = useRef(null);
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.classList.add("reveal");
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.unobserve(el); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const reviews = [
    { name: "Sunny Thakur", tour: "Goa Beach Trip", rating: 5, comment: "Goa ka trip super tha! Beaches aur nightlife amazing." },
    { name: "Aman", tour: "Goa Beach Trip", rating: 5, comment: "Goa ka trip super tha! Beaches aur nightlife amazing." },
    { name: "Riya", tour: "Jaipur Heritage Tour", rating: 4, comment: "Jaipur ka palace aur forts bahut beautiful the. Thoda crowded tha." },
    { name: "Rahul", tour: "Mumbai City Tour", rating: 5, comment: "Mumbai city ka vibe alag hi level ka tha. Gateway of India must visit!" },
    { name: "Sneha", tour: "Kerala Backwater Tour", rating: 5, comment: "Houseboat experience unforgettable tha. Nature bahut peaceful hai." },
    { name: "Vikram", tour: "Rishikesh Adventure Trip", rating: 4, comment: "Rafting aur camping experience mast tha. Food thoda mehenga tha." },
  ];

  return (
    <section className="px-4 sm:px-10 lg:px-20 py-16 bg-[#f2f2f7]">
      <div ref={titleRef} className="mb-10 text-center">
        <span className="section-label block mb-2">Testimonials</span>
        <h2 className="heading-display text-3xl sm:text-4xl text-[#1c1c1e]">
          What <em>Travellers</em> Say
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {reviews.map((r, i) => <ReviewCard key={i} review={r} index={i} />)}
      </div>
    </section>
  );
};

export default Feedback;
