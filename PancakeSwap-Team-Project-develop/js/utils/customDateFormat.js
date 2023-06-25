export function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function monthName(monthNum, full = false) {
  return full ? months[monthNum] : monthsShort[monthNum];
}

export function customDateFormat(timestamp, showTimezone = false) {
  const d = new Date(timestamp);
  let timezone = d
    .toLocaleDateString(undefined, { day: "2-digit", timeZoneName: "short" })
    .substring(4);
  let month = monthName(d.getMonth());
  let date = d.getDate();
  let year = d.getFullYear();
  let hours = d.getHours();
  hours = hours % 12;
  hours = hours ? hours : 12;
  let minutes = d.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let ampm = hours >= 12 ? "PM" : "AM";
  return `${month} ${date}, ${year} ${hours}:${minutes} ${ampm}${
    showTimezone ? ` ${timezone}` : ``
  }`;
}
