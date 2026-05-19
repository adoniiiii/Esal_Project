// Yurt card component
const YurtCard = ({ yurt, onClick }) => {
  return (
    <div className="yurt-card" onClick={() => onClick(yurt.id)}>
      <img src={yurt.image} alt={yurt.name} />
      <h3>{yurt.name}</h3>
      <p>📍 {yurt.location}</p>
      <p>💰 {yurt.pricePerNight} сом / түн</p>
      <p>👥 {yurt.capacity} адам</p>
      <button>Брондоо</button>
    </div>
  );
};
export default YurtCard;