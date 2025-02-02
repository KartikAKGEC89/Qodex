const apiKey = '4118ec2eaee5638e14927f5cf5e52f17';

export const getWeatherData = async (lat, lon) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();

    const dailyForecasts = {};
    data.list.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toISOString().split('T')[0]; 
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = entry;
      }
    });
    
    const fiveDayForecast = Object.values(dailyForecasts).slice(0, 7); 
    return fiveDayForecast;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};