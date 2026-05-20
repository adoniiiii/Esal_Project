// Yurt card component
const YurtCard = ({ yurt, onClick }) => {
  return (
    <div className="yurt-card" onClick={() => onClick(yurt.id)}>
      <img src={yurt.image} alt={yurt.name} />
      <h3>{yurt.name}</h3>
      <p>📍 {yurt.location}</p>
      <p>💰 {yurt.pricePerNight} som / night</p>
      <p>👥 {yurt.capacity} persons</p>
      <button>Book</button>
    </div>
  );
};
export default YurtCard;
