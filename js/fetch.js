export const getItems = async () => {
  const response = await fetch("../db/bookings.json");
  const data = await response.json();
  return data.items;
};