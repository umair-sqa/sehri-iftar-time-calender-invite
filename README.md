# Sehri and Iftar Time ICS Generator

This Node.js script fetches Sehri (Imsak) and Iftar (Maghrib) times for a specified city and generates calendar files (`.ics`) for each day of the month. These files can be imported into calendar applications like Google Calendar or Outlook.

## Features


- Fetches prayer times using the [![Aladhan API](https://img.shields.io/badge/Prayer%20Time-Aladhan%20API-Green)](https://aladhan.com/prayer-times-api)
- Generates `.ics` files for Sehri and Iftar times
- Configurable city, country, and time zone
- Saves the generated ICS files for import into calendar apps

## Requirements

- Node.js installed (version 14+ recommended)
- Internet connection to fetch prayer times

## Installation

1. Clone the repository or download the script.
2. Install dependencies:
   ```sh
   npm install axios fs ics
   ```

## Configuration

Modify the `config` object in the script to change the city, country, and method:

```javascript
const config = {
    city: "Sargodha",
    country: "Pakistan",
    method: 2,
    timeZone: "Asia/Karachi",
    fileNameSehri: "sehri-times.ics",
    fileNameIftar: "iftar-times.ics",
    timeout: 100000,
};
```

- `city`: Name of the city
- `country`: Name of the country
- `method`: Calculation method for prayer times
- `timeZone`: Time zone for the `.ics` files
- `fileNameSehri`: Output file name for Sehri times
- `fileNameIftar`: Output file name for Iftar times

## Usage

Run the script to generate ICS files for a specific month and year:

```sh
node script.js
```

By default, it generates Sehri and Iftar times for **March 2025**. Modify this in the function call:

```javascript
getPrayerTimesForMonth(2025, 3);
```

## Output

After execution, two `.ics` files will be created in the project directory:

- `sehri-times.ics`
- `iftar-times.ics`

You can import these into Google Calendar, Outlook, or other calendar apps to receive Sehri and Iftar reminders.

## License

This project is open-source and licensed under the MIT License.

## Author
UmairQA