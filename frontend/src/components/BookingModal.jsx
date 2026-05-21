import { useState } from "react";
import { bookings } from "../services/api";

const BookingModal = ({ place, onClose, onBooked }) => {
  const [guests, setGuests] = useState(1);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isYurt = place.type === "yurt";
  const price = place.price || place.pricePerNight;

  const nights =
    dateFrom && dateTo && isYurt
      ? Math.max(
          1,
          Math.ceil(
            (new Date(dateTo) - new Date(dateFrom)) / (1000 * 60 * 60 * 24),
          ),
        )
      : 1;

  const totalPrice = isYurt ? nights * price : price;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isYurt && new Date(dateTo) <= new Date(dateFrom)) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    setLoading(true);
    try {
      await bookings.create({
        place_id: place.id,
        date_from: dateFrom,
        date_to: isYurt ? dateTo : dateFrom,
        guests_count: guests,
        total_price: totalPrice,
      });
      onBooked();
      onClose();
    } catch (err) {
      setError(err.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Book {place.name}</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="modal-label">Number of guests</label>
          <input
            type="number"
            min="1"
            max={place.capacity || 10}
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            required
          />

          <label className="modal-label">Check-in date</label>
          <input
            type="date"
            value={dateFrom}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDateFrom(e.target.value)}
            required
          />

          {isYurt && (
            <>
              <label className="modal-label">Check-out date</label>
              <input
                type="date"
                value={dateTo}
                min={dateFrom || new Date().toISOString().split("T")[0]}
                onChange={(e) => setDateTo(e.target.value)}
                required
              />
            </>
          )}

          <div className="modal-price-preview">
            {isYurt ? (
              <>
                🌙 {nights} night{nights > 1 ? "s" : ""} &nbsp;·&nbsp;{" "}
                <strong>{totalPrice.toLocaleString()} som</strong>
              </>
            ) : (
              <>
                💰 <strong>{totalPrice.toLocaleString()} som</strong> (one day)
              </>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-confirm" disabled={loading}>
              {loading ? "Booking..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
