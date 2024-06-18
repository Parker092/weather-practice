import { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const fetchWeather = async () => {
    setIsLoading(true); // Set loading state to true
    setError(null); // Clear previous error
    if (city) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
        );
        const data = await res.json();
        setWeatherData(data);
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setIsLoading(false); // Set loading state to false after processing
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="mb-4 p-2 border rounded"
      />
      <button
        onClick={fetchWeather}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Get Weather
      </button>
      {isLoading && <p>Loading weather data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}  {/* Display error message */}
      {weatherData && weatherData.main && weatherData.weather && (
        <div className="text-center">
          <h3 className="text-xl font-bold">{weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <ul>
            <li>Feels Like: {weatherData.main.feels_like}°C</li>
            <li>Humidity: {weatherData.main.humidity}%</li>
            <li>Wind Speed: {weatherData.wind.speed} m/s</li>
            {/* Add more data as needed from weatherData */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Weather;
