import { useState, useEffect } from "react";
import YurtCard from "./YurtCard";
import { places } from "../services/api";

const YurtList = () => {
  const [yurts, setYurts] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchYurts = async () => {
      try {
        const data = await places.getAll({ type: "yurt" });
        setYurts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchYurts();
  }, []);

  const filtered = yurts.filter((y) => {
    const matchSearch =
      y.name.toLowerCase().includes(search.toLowerCase()) ||
      (y.location_text &&
        y.location_text.toLowerCase().includes(search.toLowerCase()));
    const matchPrice = maxPrice === "" || y.price <= parseInt(maxPrice);
    return matchSearch && matchPrice;
  });

  if (loading) return <div className="loading-container">Loading yurts...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max price (som)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      {filtered.length === 0 ? (
        <div className="no-results">No yurts found</div>
      ) : (
        <div className="yurt-grid">
          {filtered.map((y) => (
            <YurtCard key={y.id} yurt={y} onClick={() => alert(y.id)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default YurtList;
