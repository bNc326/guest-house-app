import fs from "fs/promises";

export const weatherFetcher = async (req, res, next) => {
  const url = process.env.WEATHER_URL;
  const weatherData = {
    currentWeather: {},
    forecastWeather: [],
  };
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    weatherData.currentWeather = {
      temp: data.current.temp_c,
      isDay: data.current.is_day === 1 ? true : false,
      code: data.current.condition.code,
    };

    weatherData.forecastWeather = data.forecast.forecastday.map((day) => ({
      avgTemp: day.day.avgtemp_c,
      code: day.day.condition.code,
      icon: {
        text: "Napos",
        icon: "clear-day.svg",
      },
    }));
  } catch (err) {
    next(err);
  }

  async function mergeWeatherData() {
    const data = await fs.readFile("./store/weather/weather.json");

    const weatherIcons = JSON.parse(data);

    const findIcon = weatherIcons.find(
      (icon) => icon.code === weatherData.currentWeather.code
    );
    weatherData.currentWeather.icon = {
      text: weatherData.currentWeather.isDay
        ? findIcon.day.text
        : findIcon.night.text,
      icon: weatherData.currentWeather.isDay
        ? findIcon.day.icon
        : findIcon.night.icon,
    };

    weatherData.forecastWeather.map((day) =>
      weatherIcons.map((icon) => {
        if (icon.code === day.code) {
          day.icon = {
            text: icon.day.text,
            icon: icon.day.icon,
          };
        }
      })
    );

    res.status(200).send(weatherData);
  }

  mergeWeatherData();
};
