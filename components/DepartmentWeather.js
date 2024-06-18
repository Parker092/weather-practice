import { useEffect, useState } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

const iconMapping = {
  "clear sky": "CLEAR_DAY",
  "few clouds": "PARTLY_CLOUDY_DAY",
  "scattered clouds": "CLOUDY",
  "broken clouds": "CLOUDY",
  "shower rain": "RAIN",
  "rain": "RAIN",
  "thunderstorm": "SLEET",
  "snow": "SNOW",
  "mist": "FOG",
  "overcast clouds": "CLOUDY"
};

const bgMapping = {
  "clear sky": "bg-clear-day",
  "few clouds": "bg-cloudy",
  "scattered clouds": "bg-cloudy",
  "broken clouds": "bg-cloudy",
  "shower rain": "bg-rain",
  "rain": "bg-rain",
  "thunderstorm": "bg-rain",
  "snow": "bg-snow",
  "mist": "bg-fog",
  "overcast clouds": "bg-cloudy"
};

const DepartmentWeather = ({ department, isExpanded, onExpand }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${department.lat}&lon=${department.lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
        );
        const data = await res.json();

        if (res.ok && data && data.name) {
          setWeatherData(data);
          setError(null);
        } else {
          setError('Error: Data not found or not valid for this department');
        }
      } catch (error) {
        setError('Error: Unable to fetch data');
      }
    };

    const fetchForecast = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${department.lat}&lon=${department.lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
        );
        const data = await res.json();

        if (res.ok && data && data.list) {
          setForecastData(data.list.slice(0, 3)); // Obtén la previsión de los próximos 3 días
          setError(null);
        } else {
          setError('Error: Data not found or not valid for this department');
        }
      } catch (error) {
        setError('Error: Unable to fetch data');
      }
    };

    fetchWeather();
    fetchForecast();
  }, [department]);

  const getIcon = (description) => {
    return iconMapping[description.toLowerCase()] || "CLEAR_DAY";
  };

  const getBgClass = (description, icon) => {
    if (icon.endsWith("n")) {
      return "bg-clear-night";
    }
    return bgMapping[description.toLowerCase()] || "bg-clear-day";
  };

  return (
    <div
      className={`p-4 border rounded-lg shadow-md m-2 ${weatherData ? getBgClass(weatherData.weather[0].description, weatherData.weather[0].icon) : 'bg-clear-day'} ${isExpanded ? 'card-expanded' : 'card-collapsed'} card`}
      onClick={onExpand}
    >
      <div className="card-content">
        <h3 className="text-xl font-bold">{department.name.replace(/-/g, ' ')}</h3>
        {error ? (
          <p>{error}</p>
        ) : weatherData ? (
          <div>
            <div className="weather-icon">
              <ReactAnimatedWeather
                icon={getIcon(weatherData.weather[0].description)}
                color="white"
                size={50}
                animate={true}
              />
            </div>
            <div className="weather-temp">
              {Math.round(weatherData.main.temp)}°C
            </div>
            <div className="weather-feels-like">
              Feels like: {Math.round(weatherData.main.feels_like)}°C
            </div>
            <div className="weather-description">
              {weatherData.weather[0].description}
            </div>
            {isExpanded && (
              <div className="expanded-info text-left">
                <div>Humidity: {weatherData.main.humidity}%</div>
                <div>Pressure: {weatherData.main.pressure} hPa</div>
                <div>Min Temp: {weatherData.main.temp_min}°C</div>
                <div>Max Temp: {weatherData.main.temp_max}°C</div>
                <div>Visibility: {weatherData.visibility} m</div>
                <div>Wind Speed: {weatherData.wind.speed} m/s</div>
                <div>Wind Direction: {weatherData.wind.deg}°</div>
                <div>Cloudiness: {weatherData.clouds.all}%</div>
                {weatherData.rain && <div>Rain (1h): {weatherData.rain['1h']} mm</div>}
                {weatherData.snow && <div>Snow (1h): {weatherData.snow['1h']} mm</div>}
                <div>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</div>
                <div>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</div>
                
                {forecastData && (
                  <div className="forecast mt-4">
                    <h4 className="text-lg font-bold">3-Day Forecast</h4>
                    <div className="forecast-grid grid grid-cols-3 gap-4 mt-2">
                      {forecastData.map((forecast, index) => (
                        <div key={index} className="forecast-day">
                          <div className="text-center font-bold">{new Date(forecast.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' })}</div>
                          <div className="weather-icon">
                            <ReactAnimatedWeather
                              icon={getIcon(forecast.weather[0].description)}
                              color="white"
                              size={40}
                              animate={true}
                            />
                          </div>
                          <div className="text-center">{Math.round(forecast.main.temp_min)}°C / {Math.round(forecast.main.temp_max)}°C</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default DepartmentWeather;
