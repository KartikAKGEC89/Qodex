import React from 'react';
import Rain from '../assets/rainsun.png';

function WeatherCard({ day, highlight, unit }) {
  if (!day || !day.main || !day.weather) {
    return <p>Loading...</p>;
  }

  const date = new Date(day.dt * 1000).toDateString();
  let temp = day.main.temp;

  if (unit === 'Kelvin') {
    temp = temp + 273.15;
  }

  temp = temp.toFixed(0);
  const humidity = day.main.humidity;
  const description = day.weather[0]?.description || "No description available";
  const icon = day.weather[0]?.icon;


  const cardStyle = {
    borderLeft: highlight ? "0" : "1px solid #ccc",
    borderRight: highlight ? "0" : "1px solid #ccc",
    width: highlight ? "400px" : "100px",
    textAlign: "center",
    padding: highlight ? "10px" : "10px",
    margin: "10px",
    transition: "all 0.3s ease",
  };

  const imgStyle = {
    width: highlight ? "100px" : "50px",
    height: highlight ? "100px" : "50px",
    transition: "all 0.3s ease",
  };

  return (
  <div className="weather-card" style={cardStyle}>
    {highlight && (
        <>
  <div style={{ display: "flex", alignItems: "center" }}>
    <img
      src={Rain}
      alt={description}
      style={imgStyle}
    />
    <h1 style={{ color: "white", marginLeft: "10px" }}>WEATHER</h1>
  </div>

  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "20px", marginRight: "20px" }}>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "100px" }}>
    <h1 style={{ color: "white", fontSize: "70px", marginBottom: "5px" }}>{temp}°</h1>
    <h3 style={{ color: "white", marginTop: "0px" }}>{date.slice(0, 10)}</h3>
  </div>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
    <img
      src={`https://openweathermap.org/img/wn/${icon}.png`}
      alt={description}
      style={imgStyle}
    />
    <h3 style={{ color: "white", marginTop: "10px" }}>{description}</h3>
  </div>
</div>

</>

    )}

    {!highlight && (
      <>
        <h3 style={{ color: "white" }}>{date.split(' ')[0]}</h3>
        <img
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          alt={description}
          style={imgStyle}
        />
          <h4 style={{ color: "white" }}>{temp}°</h4>
          <h4 style={{ color: "white" }}>Humidity: {humidity}</h4>
      </>
    )}
  </div>
);

}

export default WeatherCard;