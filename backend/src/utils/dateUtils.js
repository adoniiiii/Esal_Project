/**
 * Check if two date ranges overlap
 */
function isDateOverlap(start1, end1, start2, end2) {
    return (start1 >= start2 && start1 < end2) ||
           (end1 > start2 && end1 <= end2) ||
           (start1 <= start2 && end1 >= end2);
  }
  
  /**
   * Format date to YYYY-MM-DD
   */
  function formatDate(date) {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
  
  module.exports = { isDateOverlap, formatDate };