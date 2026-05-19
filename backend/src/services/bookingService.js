const { bookings } = require("../utils/inMemoryDB");

function isDateOverlap(newStart, newEnd, existingStart, existingEnd) {
  return (
    (newStart >= existingStart && newStart < existingEnd) ||
    (newEnd > existingStart && newEnd <= existingEnd) ||
    (newStart <= existingStart && newEnd >= existingEnd)
  );
}

function checkAvailability(yurtId, startDate, endDate) {
  const conflicting = bookings.find(booking => 
    booking.yurtId === yurtId &&
    isDateOverlap(startDate, endDate, booking.startDate, booking.endDate)
  );
  
  if (conflicting) {
    throw new Error(`These dates are already taken! Conflict with booking ID ${conflicting.id}`);
  }
  return true;
}

function createBooking(yurtId, startDate, endDate, touristName) {
  checkAvailability(yurtId, startDate, endDate);
  
  const newBooking = {
    id: bookings.length + 1,
    yurtId,
    startDate,
    endDate,
    touristName
  };
  bookings.push(newBooking);
  return newBooking;
}

module.exports = { checkAvailability, createBooking };