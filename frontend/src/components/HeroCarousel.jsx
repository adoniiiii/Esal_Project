import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://i1-c.pinimg.com/1200x/fe/91/ef/fe91efc9cdf6b45768d1e85919e5505e.jpg",
    title: "Son-Kul Lake",
    subtitle: "3,016 meters above sea level",
    tag: "🏔️ Alpine Lake",
  },
  {
    id: 2,
    image:
      "https://i1-c.pinimg.com/1200x/e7/f4/fb/e7f4fbd839208f2b794df6c4d9d66e1b.jpg",
    title: "Jeti-Oguz Valley",
    subtitle: "Famous Seven Bulls rocks",
    tag: "⛰️ Mountain Valley",
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/736x/fe/bf/de/febfdea2b47becf648128d3eac79245c.jpg",
    title: "Ala-Archa Gorge",
    subtitle: "National park near Bishkek",
    tag: "🌲 National Park",
  },
  {
    id: 4,
    image:
      "https://i1-c.pinimg.com/1200x/73/7d/3d/737d3d825ed59cea6bce6628fa3b0ccb.jpg",
    title: "Issyk-Kul Lake",
    subtitle: "The pearl of Central Asia",
    tag: "💧 Mountain Lake",
  },
  {
    id: 5,
    image:
      "https://i1-c.pinimg.com/1200x/d0/e4/bf/d0e4bf31ffa03a661d536ddbc45220fa.jpg",
    title: "Kyrgyz Jailoo",
    subtitle: "Traditional nomadic life",
    tag: "🏕️ Summer Pastures",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => setCurrent(index);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => setCurrent((current + 1) % slides.length);

  const currentSlide = slides[current];

  return (
    <div className="hero-carousel">
      <div className="carousel-slide">
        <img src={currentSlide.image} alt={currentSlide.title} />
        <div className="carousel-overlay"></div>
        <div className="carousel-content">
          <span className="carousel-tag">{currentSlide.tag}</span>
          <h1>{currentSlide.title}</h1>
          <p>{currentSlide.subtitle}</p>
        </div>
      </div>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <button className="carousel-arrow prev" onClick={prev}>
        ‹
      </button>
      <button className="carousel-arrow next" onClick={next}>
        ›
      </button>
    </div>
  );
};

export default HeroCarousel;
