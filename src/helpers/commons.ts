/**
 * Formats a Date object into an ISO-8601 string representation.
 * This function manually constructs the ISO string which includes the year, month, day,
 * hours, minutes, and seconds in the 'YYYY-MM-DDTHH:mm:ss' format.
 *
 * @param {Date} date - The Date object to format.
 * @returns {string} - The formatted ISO-8601 string representation of the date.
 */
export function formatDateToISOString(date: Date): string {
  // Helper function to pad single digit numbers with a leading zero
  const pad = (num: number): string => num.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
