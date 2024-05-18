export const timeStrToSeconds = (timeStr) => {
  return timeStr
    .split(":")
    .reverse()
    .reduce((acc, time, index) => {
      return parseFloat(acc) + time * Math.pow(60, index - 1);
    }, 0); // Initial value of 0 so callback is called on each element of the array
};

export const secondsToTimeStr = (seconds) => {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let secs = Math.round((seconds % 60) * 100) / 100; // Round to 2 decimal places
  if (hours > 0) {
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (secs < 10) {
      secs = `0${secs}`;
    }
    return `${hours}:${minutes}:${secs}`;
  }
  if (minutes > 0) {
    if (secs < 10) {
      secs = `0${secs}`;
    }
    return `${minutes}:${secs}`;
  }
  return `${secs}`;
};