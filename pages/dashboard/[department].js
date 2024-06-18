import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import departments from '../../lib/departments';
import DepartmentWeather from '../../components/DepartmentWeather';

const DepartmentPage = () => {
  const router = useRouter();
  const { department } = router.query;
  const [bgClass, setBgClass] = useState('bg-clear-day');

  const selectedDepartment = departments.find(
    (dept) => dept.path === `/${department}`
  );

  useEffect(() => {
    if (!selectedDepartment) return;

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${selectedDepartment.lat}&lon=${selectedDepartment.lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
        );
        const data = await res.json();

        if (res.ok && data && data.weather && data.weather[0]) {
          const weatherDescription = data.weather[0].description;
          const bgMapping = {
            "clear sky": "bg-clear-day",
            "few clouds": "bg-cloudy",
            "scattered clouds": "bg-cloudy",
            "broken clouds": "bg-cloudy",
            "shower rain": "bg-rain",
            "rain": "bg-rain",
            "thunderstorm": "bg-thunderstorm",
            "snow": "bg-snow",
            "mist": "bg-fog",
            "overcast clouds": "bg-cloudy",
            "light rain": "bg-rain",
            "moderate rain": "bg-rain",
            "heavy intensity rain": "bg-thunderstorm",
            "very heavy rain": "bg-rain",
            "extreme rain": "bg-rain",
            "light intensity drizzle": "bg-drizzle",
            "drizzle": "bg-drizzle",
            "heavy intensity drizzle": "bg-drizzle",
            "thunderstorm with light drizzle": "bg-thunderstorm-drizzle"
          };
          setBgClass(bgMapping[weatherDescription.toLowerCase()] || 'bg-clear-day');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [selectedDepartment]);

  if (!department) return null;

  if (!selectedDepartment) {
    return <p>Department not found</p>;
  }

  return (
    <div className={`min-h-screen ${bgClass} text-white flex items-center justify-center p-4`}>
      <DepartmentWeather
        department={selectedDepartment}
        isExpanded={true}
        onExpand={() => {}}
      />
    </div>
  );
};

export default DepartmentPage;
