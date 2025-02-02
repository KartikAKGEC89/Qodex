import React, { useState, useEffect } from 'react';
import { getWeatherData } from '../utils/Api';
import WeatherCard from './WeatherCard';
import forecastsun from '../assets/forecastsun.png';
import SearchInput from './SearchInput';
import '../index.css';

function WeatherApp() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('Celsius');
  const apiKey = '4118ec2eaee5638e14927f5cf5e52f17';

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => console.error('Error fetching location:', error)
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
    const interval = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const data = await getWeatherData(lat, lon);
      console.log('Weather data:', data);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
      fetchWeatherByCity(savedCity);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (city) {
        fetchWeatherByCity(city);
      }
    }, 3000000); 
    return () => clearInterval(interval);
  }, [city]);

  const fetchWeatherByCity = async (cityName) => {
    try {
      setError(null);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`);
      const data = await response.json();

      if (data.cod !== 200) {
        throw new Error(data.message);
      }

      const lat = data.coord.lat;
      const lon = data.coord.lon;

      localStorage.setItem('lastCity', cityName);

      const forecastData = await getWeatherData(lat, lon);
      setWeatherData(forecastData);
      console.log('Weather data:', forecastData);
      setCity(cityName);
    } catch (err) {
      localStorage.clear();
      setWeatherData([]);
      setError(err.message);
    }
  };

  return (
    <div className="weather-app">
        <SearchInput onSearch={fetchWeatherByCity} unit={unit}
        setUnit={setUnit} />
      <div className="header">
        <div className="place-time">
          <h3 className="current-place" style={{ color: 'white' }}>Place</h3>
          <div className="current-time" style={{ color: 'white' }}>{currentTime}</div>
        </div>
        <div className="title">
          <h1 style={{ color: 'white' }}>Weather App</h1>
          <img src={forecastsun} alt="Sun" />
        </div>
      </div>
      <div className="weather-data" style={{ alignItems: "center" }}>
      {error && <h1 style={{color:"white"}}>Error No Data for provided city</h1>}
      {weatherData.map((day, index) => (
        <WeatherCard key={index} day={day} highlight={index === 0} unit={unit} />
      ))}
    </div>
    </div>
  );
}

export default WeatherApp;