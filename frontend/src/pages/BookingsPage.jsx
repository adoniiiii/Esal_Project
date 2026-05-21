import { useState, useEffect } from "react";
import { bookings } from "../services/api";

const BookingsPage = () => {
  const [bookingsList, setBookingsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookings.getMyBookings();
        setBookingsList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await bookings.cancel(id);
      setBookingsList(bookingsList.filter((b) => b.id !== id));
    } catch (err) {
      alert(err.message || "Failed to cancel booking");
    }
  };

  if (loading)
    return <div className="loading-container">Loading your bookings...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  if (bookingsList.length === 0) {
    return (
      <div className="bookings-container">
        <h1>My Bookings</h1>
        <div className="empty-state">
          <p>No bookings yet. Discover a yurt and start your journey!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <h1>My Bookings</h1>
      <div className="bookings-list">
        {bookingsList.map((b) => (
          <div key={b.id} className="booking-card">
            <div className="booking-info">
              <h3>{b.place_name}</h3>
              <p>
                📅 {b.date_from} → {b.date_to}
              </p>
              <p>
                👥 {b.guests_count} guest{b.guests_count > 1 ? "s" : ""}
              </p>
              <p>💰 {b.total_price?.toLocaleString()} som</p>
              <p className="booking-status">
                Status: {b.status || "confirmed"}
              </p>
            </div>
            <button onClick={() => handleCancel(b.id)}>Cancel</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
