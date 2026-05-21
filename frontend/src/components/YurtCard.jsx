const YurtCard = ({ yurt, onBook }) => {
  // Handle both field names (backend returns price or pricePerNight)
  const price = yurt.price || yurt.pricePerNight;
  const location = yurt.location_text || yurt.location || yurt.region_name;
  const image =
    yurt.photo_url || yurt.image || "https://placehold.co/400x300?text=Yurt";

  return (
    <div className="yurt-card">
      <div className="yurt-card-img">
        <img src={image} alt={yurt.name} />
        <span className="yurt-card-badge">
          🏔️ {yurt.type === "yurt" ? "Yurt" : "Topchan"}
        </span>
      </div>
      <div className="yurt-card-body">
        <h3>{yurt.name}</h3>
        <div className="yurt-card-meta">
          <p>📍 {location}</p>
          <p>👥 Up to {yurt.capacity} guests</p>
        </div>
      </div>
      <div className="yurt-card-footer">
        <div className="yurt-card-price">
          {price?.toLocaleString()} <span>som / night</span>
        </div>
        <button onClick={() => onBook(yurt)}>Book now</button>
      </div>
    </div>
  );
};

export default YurtCard;
