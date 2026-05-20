const YurtCard = ({ yurt, onClick }) => {
  return (
    <div className="yurt-card" onClick={() => onClick(yurt.id)}>
      <img
        src={yurt.image || "https://placehold.co/400x300?text=Yurt"}
        alt={yurt.name}
      />
      <h3>{yurt.name}</h3>
      <p className="location-icon">{yurt.location_text || yurt.location}</p>
      <p className="price-icon">
        {yurt.price || yurt.pricePerNight} som / night
      </p>
      <p className="guests-icon">{yurt.capacity} persons</p>
      <button>Book</button>
    </div>
  );
};

export default YurtCard;
