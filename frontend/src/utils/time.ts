export const getMinutesDifference = (date1: Date, date2: Date) =>
  Math.round((date2.getTime() - date1.getTime()) / (1000 * 60));

export const formatMinutes = (minutes: number | string) => {
  const minutesNumber = typeof minutes === "string" ? parseInt(minutes, 10) : minutes;
  return minutesNumber.toLocaleString(undefined, { minimumIntegerDigits: 2 });
};

export const formatHour = (date: Date) => {
  return date.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const formatLocalTime = (time: Date) => {
  return time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
