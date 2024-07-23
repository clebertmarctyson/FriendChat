export const formatDateTime = (date: Date) => {
  const time = new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return time;
};
