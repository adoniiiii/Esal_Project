// Yurt list with search and price filter
import { useState } from "react";
import YurtCard from "./YurtCard";

const mockYurts = [
  {
    id: 1,
    name: "Ak-Say",
    location: "Son-Kol",
    pricePerNight: 2500,
    capacity: 4,
    image: "https://placehold.co/400x300",
  },
  {
    id: 2,
    name: "Jyldyz",
    location: "Issyk-Kol",
    pricePerNight: 3000,
    capacity: 5,
    image: "https://placehold.co/400x300",
  },
  {
    id: 3,
    name: "Ala-Archa",
    location: "Chuy",
    pricePerNight: 2000,
    capacity: 3,
    image: "https://placehold.co/400x300",
  },
];

const YurtList = () => {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filtered = mockYurts.filter((y) => {
    const matchSearch =
      y.name.toLowerCase().includes(search.toLowerCase()) ||
      y.location.toLowerCase().includes(search.toLowerCase());
    const matchPrice = maxPrice === "" || y.pricePerNight <= parseInt(maxPrice);
    return matchSearch && matchPrice;
  });

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
      <div className="yurt-grid">
        {filtered.map((y) => (
          <YurtCard key={y.id} yurt={y} onClick={() => alert(y.id)} />
        ))}
      </div>
    </div>
  );
};
export default YurtList;
