import React from "react";
import { useState, useEffect } from "react";
import WeatherModel from "models/WeatherModel";
import { addDays, format } from "date-fns";
const Weather = () => {
  // * fetch weather data
  const [weatherData, setWeatherData] = useState<WeatherModel>();
  const [loading, setLoading] = useState<boolean>(false);

  // * merge data and icons

  useEffect(() => {
    const cleanup = setTimeout(() => {
      setLoading(true);
      const fetchData = async () => {
        const url: string = process.env.REACT_APP_BACKEND_API as string;
        try {
          const response = await fetch(url + "/weather");

          const data: WeatherModel = await response.json();

          setWeatherData(data);
        } catch (err) {
          console.log("error", err);
        }
        setLoading(false);
      };

      fetchData();
    }, 100);

    return () => {
      clearTimeout(cleanup);
    };
  }, []);

  const thirdDay = format(addDays(new Date(), 2), "yyyy-MM-dd");
  const threeDay: string[] = ["Ma", "Holnap", thirdDay];

  return (
    <div className="flex flex-col w-full laptop:w-1/2 rounded-3xl h-full laptop:min-h-[680px] bg-[#B08968] overflow-hidden">
      <div className="flex flex-col justify-center items-center h-full min-h-0 py-4 animate__animated animate__fadeInDown">
        {!loading && weatherData && (
          <>
            <img
              src={`http://192.168.10.7:8800/store/images/weather/${weatherData.currentWeather.icon?.icon}`}
              className="w-[96px] tall:w-[72px] drop-shadow-lg"
              alt={weatherData.currentWeather.icon?.text}
            />

            <h2 className="text-xl tall:text-base w-11/12 font-bold text-white text-center break-words">
              {weatherData.currentWeather.temp} &#8451; /{" "}
              {weatherData.currentWeather.icon?.text}
            </h2>
          </>
        )}
      </div>
      <div className=" rounded-3xl">
        {!loading &&
          weatherData &&
          weatherData.forecastWeather.map((day, index) => (
            <div
              className={`w-full border-b-4 ${
                weatherData.forecastWeather.length === index + 1 &&
                "customLarge:border-b-0 customLarge:rounded-b-3xl"
              } border-palette-3 bg-palette-3/50 h-full min-h-[160px] flex items-center px-4 `}
              key={index}
            >
              <div className="flex flex-col w-full justify-between items-center ">
                <img
                  src={`http://192.168.10.7:8800/store/images/weather/${day.icon?.icon}`}
                  className="max-w-[80px] tall:max-w-[56px] w-full  drop-shadow-lg animate__animated animate__fadeInLeft"
                  alt={day.icon?.text}
                />
                <h3 className="flex items-center text-xl flex-col justify-center  font-bold  w-full text-palette-4 break-words text-center animate__animated animate__fadeInDown">
                  {day.avgTemp} &#8451;&#xa0;
                  <span className=" max-w-full text-lg font-normal">
                    {day.icon?.text}
                  </span>
                </h3>
                <p className="flex items-center justify-center font-medium w-full text-center text-palette-4 animate__animated animate__fadeInRight">
                  {threeDay[index]}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Weather;
