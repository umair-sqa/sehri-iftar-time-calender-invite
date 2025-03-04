const axios = require("axios");
const fs = require("fs");

const config = {
    city: "Sargodha",
    country: "Pakistan",
    method: 2,
    timeZone: "Asia/Karachi",
    fileNameSehri: "sehri-times.ics",
    fileNameIftar: "iftar-times.ics",
    timeout: 100000,
};

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function generateIcsEvent(dateStr, time, type) {
    const [year, month, day] = dateStr.split("-");
    const [hours, minutes] = time.split(":");

    return `BEGIN:VEVENT
SUMMARY:${type} Time - ${time}
DTSTART;TZID=${config.timeZone}:${year}${month}${day}T${hours}${minutes}00
DTEND;TZID=${config.timeZone}:${year}${month}${day}T${hours}${minutes}59
DESCRIPTION:Time for ${type}.
LOCATION:${config.city}, ${config.country}
STATUS:CONFIRMED
END:VEVENT`;
}

function generateIcsCalendar(events, type) {
    return `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:-//${type} Times//EN
${events.join("\n")}
END:VCALENDAR`;
}

async function fetchPrayerTime(date, prayer) {
    const url = `https://api.aladhan.com/v1/timingsByCity/${date}?city=${config.city}&country=${config.country}&method=${config.method}`;

    const response = await axios.get(url, { timeout: config.timeout });
    return response.data.data.timings[prayer];
}

async function getPrayerTimesForMonth(year, month) {
    const daysInMonth = getDaysInMonth(year, month);
    const paddedMonth = month.toString().padStart(2, "0");

    const sehriEvents = [];
    const iftarEvents = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const paddedDay = day.toString().padStart(2, "0");
        const dateStr = `${year}-${paddedMonth}-${paddedDay}`;

        const sehriTime = await fetchPrayerTime(dateStr, "Imsak");
        const iftarTime = await fetchPrayerTime(dateStr, "Maghrib");

        generateIcsEvent(dateStr, sehriTime, "Sehri")

        sehriEvents.push(generateIcsEvent(dateStr, sehriTime, "Sehri"));
        iftarEvents.push(generateIcsEvent(dateStr, iftarTime, "Iftar"));
    }

    fs.writeFileSync(config.fileNameSehri, generateIcsCalendar(sehriEvents, "Sehri"), "utf-8");
    fs.writeFileSync(config.fileNameIftar, generateIcsCalendar(iftarEvents, "Iftar"), "utf-8");

    console.log(`ICS files generated: ${config.fileNameSehri}, ${config.fileNameIftar}`);
}

getPrayerTimesForMonth(2025, 3);
