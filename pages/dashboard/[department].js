import { useRouter } from 'next/router';
import departments from '../../lib/departments';
import DepartmentWeather from '../../components/DepartmentWeather';
import { useEffect, useState } from 'react';

const DepartmentPage = () => {
  const router = useRouter();
  const { department } = router.query;
  const [bgClass, setBgClass] = useState('bg-clear-day');
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const updateBgClass = (weatherDescription) => {
    const description = weatherDescription.toLowerCase();
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
    return bgMapping[description] || "bg-clear-day";
  };

  useEffect(() => {
    if (!department) return;

    const dept = departments.find(
      (dept) => dept.path === `/${department}`
    );

    if (!dept) {
      setSelectedDepartment(null);
      return;
    }

    setSelectedDepartment(dept);

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${dept.lat}&lon=${dept.lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`
        );
        const data = await res.json();

        if (res.ok && data && data.weather && data.weather[0]) {
          const weatherDescription = data.weather[0].description;
          setBgClass(updateBgClass(weatherDescription));
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [department]);

  if (!selectedDepartment) {
    return <p>Department not found</p>;
  }

  return (
    <div className={`min-h-screen ${bgClass} text-white flex items-center justify-center`}>
      <DepartmentWeather
        department={selectedDepartment}
        isExpanded={true}
        onExpand={() => {}}
      />
    </div>
  );
};

export default DepartmentPage;
