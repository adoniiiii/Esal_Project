import { useState, useEffect } from "react";
import YurtCard from "../components/YurtCard";
import BookingModal from "../components/BookingModal";
import { places } from "../services/api";

const categories = ["Баары", "Соң-Көл", "Ысык-Көл", "Чүй", "Нарын"];

const HomePage = () => {
  const [yurts, setYurts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Баары");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYurts = async () => {
      const data = await places.getAll({
        location: selectedCategory === "Баары" ? null : selectedCategory,
        maxPrice: maxPrice || null,
        search: search || null,
      });
      setYurts(data);
      setLoading(false);
    };
    fetchYurts();
  }, [selectedCategory, maxPrice, search]);

  return (
    <div>
      <section className="hero">
        <h1>Кыргызстандын жайлоолоруна саякат</h1>
        <p>Тоолордун жүрөгүндөгү аутентикалык боз үйлөр</p>
        <div className="hero-search">
          <input
            type="text"
            placeholder="Боз үй же жайлоонун аты..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>Издөө</button>
        </div>
      </section>

      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
        <input
          type="number"
          placeholder="Макс баа (сом)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading">Жүктөлүүдө...</div>
      ) : (
        <div className="yurt-grid">
          {yurts.map((yurt) => (
            <YurtCard key={yurt.id} yurt={yurt} onBook={setSelectedPlace} />
          ))}
        </div>
      )}

      {selectedPlace && (
        <BookingModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onBooked={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
};
export default HomePage;
