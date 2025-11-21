import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, CloudRain, Sun, Wind, Droplets, 
  Thermometer, Search, MapPin, Loader2, CloudSnow,
  CloudDrizzle, CloudFog, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface WeatherPredictionProps {
  darkMode: boolean;
  language: 'en' | 'hi';
}

export default function WeatherPrediction({ darkMode, language }: WeatherPredictionProps) {
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);

  const content = {
    en: {
      title: '☁️ Weather Prediction',
      subtitle: 'Get accurate weather forecasts to plan your farming activities',
      placeholder: 'Enter your location (e.g., Punjab, India)',
      search: 'Search',
      currentConditions: 'Current Conditions',
      forecast7Day: '7-Day Forecast',
      farmingAdvice: '🌱 Farming Advice',
      humidity: 'Humidity',
      windSpeed: 'Wind Speed',
      feelsLike: 'Feels Like',
      searchLocation: 'Search for a Location',
      enterLocation: 'Enter your location to view weather forecasts and farming advice',
      fetchingData: 'Fetching weather data...',
      errorFetch: 'Error fetching weather data',
      invalidLocation: 'Please enter a valid location',
    },
    hi: {
      title: '☁️ मौसम की भविष्यवाणी',
      subtitle: 'अपनी खेती की गतिविधियों की योजना बनाने के लिए सटीक मौसम का पूर्वानुमान प्राप्त करें',
      placeholder: 'अपना स्थान दर्ज करें (जैसे पंजाब, भारत)',
      search: 'खोजें',
      currentConditions: 'वर्तमान स्थिति',
      forecast7Day: '7-दिन का पूर्वानुमान',
      farmingAdvice: '🌱 खेती की सलाह',
      humidity: 'आर्द्रता',
      windSpeed: 'हवा की गति',
      feelsLike: 'अनुभव करता है',
      searchLocation: 'स्थान खोजें',
      enterLocation: 'मौसम का पूर्वानुमास देखने के लिए अपना स्थान दर्ज करें',
      fetchingData: 'मौसम का डेटा प्राप्त हो रहा है...',
      errorFetch: 'मौसम डेटा प्राप्त करने में त्रुटि',
      invalidLocation: 'कृपया एक वैध स्थान दर्ज करें',
    },
  } as const;

  const t = content[language];

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('sunny') || desc.includes('clear')) return Sun;
    if (desc.includes('rain')) return CloudRain;
    if (desc.includes('cloud')) return Cloud;
    if (desc.includes('snow')) return CloudSnow;
    if (desc.includes('fog') || desc.includes('mist')) return CloudFog;
    if (desc.includes('drizzle')) return CloudDrizzle;
    return Cloud;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
      toast.error(t.invalidLocation);
      return;
    }

    setIsLoading(true);
    try {
      // Using Open-Meteo API (free, no API key required)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        toast.error(t.errorFetch);
        setIsLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Fetch weather data
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
      );
      const weather = await weatherRes.json();

      const current = weather.current;
      const daily = weather.daily;

      // Weather code to description mapping
      const getWeatherDescription = (code: number) => {
        if (code === 0) return 'Clear sky';
        if (code === 1 || code === 2) return 'Partly cloudy';
        if (code === 3) return 'Overcast';
        if (code === 45 || code === 48) return 'Foggy';
        if (code >= 51 && code <= 67) return 'Drizzle';
        if (code >= 71 && code <= 77) return 'Snow';
        if (code >= 80 && code <= 82) return 'Rain showers';
        if (code === 85 || code === 86) return 'Snow showers';
        if (code >= 80 && code <= 99) return 'Rain';
        return 'Cloudy';
      };

      const forecast = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
          day: i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' }),
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          icon: getWeatherIcon(getWeatherDescription(daily.weather_code[i])),
          condition: getWeatherDescription(daily.weather_code[i]),
          temp: Math.round((daily.temperature_2m_max[i] + daily.temperature_2m_min[i]) / 2),
          maxTemp: Math.round(daily.temperature_2m_max[i]),
          minTemp: Math.round(daily.temperature_2m_min[i]),
          rainfall: daily.precipitation_sum[i],
        };
      });

      setWeatherData({
        location: `${name}, ${country}`,
        current: {
          icon: getWeatherIcon(getWeatherDescription(current.weather_code)),
          temp: Math.round(current.temperature_2m),
          name: getWeatherDescription(current.weather_code),
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m),
          feelsLike: Math.round(current.temperature_2m - 2), // Approximate feels like
        },
        forecast,
        farmingAdvice: getFarmingAdvice(current.temperature_2m, current.relative_humidity_2m, language),
      });
      toast.success(language === 'en' ? 'Weather data loaded!' : 'मौसम का डेटा लोड हो गया!');
    } catch (error) {
      console.error(error);
      toast.error(t.errorFetch);
    } finally {
      setIsLoading(false);
    }
  };

  const getFarmingAdvice = (temp: number, humidity: number, lang: 'en' | 'hi') => {
    const adviceEn = [];
    const adviceHi = [];

    if (temp > 30) {
      adviceEn.push('High temperature detected. Increase irrigation frequency.');
      adviceHi.push('उच्च तापमान पहचाना गया। सिंचाई की आवृत्ति बढ़ाएं।');
    }
    if (temp < 10) {
      adviceEn.push('Low temperature warning. Protect sensitive crops from frost.');
      adviceHi.push('कम तापमान चेतावनी। संवेदनशील फसलों को पाले से बचाएं।');
    }
    if (humidity > 80) {
      adviceEn.push('High humidity. Monitor for fungal diseases and provide ventilation.');
      adviceHi.push('उच्च आर्द्रता। कवक रोगों की निगरानी करें और हवा का प्रवाह सुनिश्चित करें।');
    }
    if (humidity < 40) {
      adviceEn.push('Low humidity detected. Consider increasing irrigation.');
      adviceHi.push('कम आर्द्रता पहचानी गई। सिंचाई बढ़ाने पर विचार करें।');
    }

    if (adviceEn.length === 0) {
      adviceEn.push('Favorable conditions for crop growth and maintenance.');
      adviceHi.push('फसल की वृद्धि और रखरखाव के लिए अनुकूल परिस्थितियां।');
    }

    return lang === 'en' ? adviceEn : adviceHi;
  };

  // Auto-detect location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Reverse geocode to get location name
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const geoData = await geoRes.json();
            const locationName = geoData.address?.city || geoData.address?.town || geoData.address?.county || 'Current Location';
            setLocation(locationName);

            // Fetch weather for this location
            const weatherRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
            );
            const weather = await weatherRes.json();

            const current = weather.current;
            const daily = weather.daily;

            const getWeatherDescription = (code: number) => {
              if (code === 0) return 'Clear sky';
              if (code === 1 || code === 2) return 'Partly cloudy';
              if (code === 3) return 'Overcast';
              if (code === 45 || code === 48) return 'Foggy';
              if (code >= 51 && code <= 67) return 'Drizzle';
              if (code >= 71 && code <= 77) return 'Snow';
              if (code >= 80 && code <= 82) return 'Rain showers';
              if (code === 85 || code === 86) return 'Snow showers';
              if (code >= 80 && code <= 99) return 'Rain';
              return 'Cloudy';
            };

            const forecast = Array.from({ length: 7 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              return {
                day: i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' }),
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                icon: getWeatherIcon(getWeatherDescription(daily.weather_code[i])),
                condition: getWeatherDescription(daily.weather_code[i]),
                temp: Math.round((daily.temperature_2m_max[i] + daily.temperature_2m_min[i]) / 2),
                maxTemp: Math.round(daily.temperature_2m_max[i]),
                minTemp: Math.round(daily.temperature_2m_min[i]),
                rainfall: daily.precipitation_sum[i],
              };
            });

            setWeatherData({
              location: locationName,
              current: {
                icon: getWeatherIcon(getWeatherDescription(current.weather_code)),
                temp: Math.round(current.temperature_2m),
                name: getWeatherDescription(current.weather_code),
                humidity: current.relative_humidity_2m,
                windSpeed: Math.round(current.wind_speed_10m),
                feelsLike: Math.round(current.temperature_2m - 2),
              },
              forecast,
              farmingAdvice: getFarmingAdvice(current.temperature_2m, current.relative_humidity_2m, language),
            });
            toast.success(language === 'en' ? 'Location detected!' : 'स्थान पहचाना गया!');
          } catch (error) {
            console.error(error);
            toast.error(language === 'en' ? 'Could not fetch weather data' : 'मौसम डेटा प्राप्त नहीं कर सके');
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.log('Geolocation error:', error);
          setIsLoading(false);
          // User denied permission, allow manual search
        }
      );
    }
  }, [language]);

  return (
    <section className={`min-h-screen py-24 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-blue-50 to-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.title}
          </h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <MapPin className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={t.placeholder}
              className={`w-full pl-12 pr-32 py-4 rounded-xl border transition-colors ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'
              } focus:outline-none shadow-lg`}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">{t.search}</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-4" />
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                {t.fetchingData}
              </p>
            </motion.div>
          )}

          {weatherData && !isLoading && (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              {/* Current Weather */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Main Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`lg:col-span-2 rounded-2xl p-8 relative overflow-hidden ${
                    darkMode ? 'bg-gradient-to-br from-blue-900 to-blue-800' : 'bg-gradient-to-br from-blue-500 to-blue-600'
                  } text-white shadow-xl`}
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5" />
                      <span>{weatherData.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-2">
                          <weatherData.current.icon className="w-20 h-20" />
                          <div>
                            <div className="mb-1">{weatherData.current.temp}°C</div>
                            <p>{weatherData.current.name}</p>
                          </div>
                        </div>
                        <p className="text-blue-100">
                          Feels like {weatherData.current.feelsLike}°C
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    animate={{ 
                      x: [0, 50, 0],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                  />
                </motion.div>

                {/* Stats Card */}
                <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-xl'}`}>
                  <h3 className={`mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {t.currentConditions}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{t.humidity}</span>
                      </div>
                      <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                        {weatherData.current.humidity}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wind className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{t.windSpeed}</span>
                      </div>
                      <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                        {weatherData.current.windSpeed} km/h
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{t.feelsLike}</span>
                      </div>
                      <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                        {weatherData.current.feelsLike}°C
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7-Day Forecast */}
              <div className={`rounded-2xl p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-xl'}`}>
                <h3 className={`mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t.forecast7Day}
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                  {weatherData.forecast.map((day: any, index: number) => {
                    const Icon = day.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className={`p-4 rounded-xl text-center ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-50'
                        }`}
                      >
                        <p className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {day.day}
                        </p>
                        <p className={`mb-3 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {day.date}
                        </p>
                        <Icon className={`w-8 h-8 mx-auto mb-3 ${
                          darkMode ? 'text-blue-400' : 'text-blue-600'
                        }`} />
                        <p className={darkMode ? 'text-white' : 'text-gray-900'}>
                          {day.temp}°C
                        </p>
                        {day.rainfall > 0 && (
                          <p className="text-blue-500 mt-2">
                            {day.rainfall}mm
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Farming Advice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className={`rounded-2xl p-6 ${
                  darkMode ? 'bg-green-900/30 border border-green-800' : 'bg-green-50 border border-green-200'
                }`}
              >
                <h3 className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t.farmingAdvice}
                </h3>
                <div className="space-y-3">
                  {weatherData.farmingAdvice.map((advice: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className={`flex items-start gap-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      <span className="text-green-600 mt-1">•</span>
                      <span>{advice}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {!weatherData && !isLoading && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
                darkMode ? 'bg-gray-800' : 'bg-blue-50'
              }`}>
                <Cloud className={`w-12 h-12 ${darkMode ? 'text-gray-600' : 'text-blue-400'}`} />
              </div>
              <h3 className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {t.searchLocation}
              </h3>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                {t.enterLocation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
