interface WeatherModel {
  currentWeather: {
    temp?: number;
    isDay?: boolean;
    code?: number;
    icon?: {
      text?: string;
      icon?: string;
    };
  };
  forecastWeather: [
    {
        avgTemp?: number;
        code?: number;
        icon?: {
            text?: string;
            icon?: string;
        }
    }
  ]

}

export default WeatherModel;
