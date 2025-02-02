# Weather Dashboard

This project is a weather dashboard built using React.js that fetches real-time weather data from the OpenWeatherMap API. The application demonstrates core React concepts such as functional components, hooks, API integration, and state management. It includes features such as real-time weather data display, error handling, and local storage to save the last searched city.

## Features

- **Search for City**: Users can search for a city and see the current weather.
- **Weather Information**: Displays temperature, humidity, wind speed, and weather conditions.
- **Weather Icon**: Fetches weather icons from an external API and displays them according to the weather conditions.
- **API Integration & Polling**: Fetches weather data from the OpenWeatherMap API and updates the data every 30 seconds.
- **Error Handling**: Displays user-friendly error messages for invalid city names, network failures, and other errors.
- **Local Storage**: Saves the last searched city and loads the data upon revisiting the app.
- **Responsive Design**: The app is responsive and works across different screen sizes.

## Requirements

- **React.js** (Functional components with hooks)
- **API Integration** (OpenWeatherMap API)
- **CSS Modules/Styled Components** for styling
- **Polling** to refresh data every 30 minutes
- **Error handling** for API failures and edge cases
- **Local Storage** to save the last searched city

## Setup & Installation

### 1. Clone the repository
\
git clone https://github.com/KartikAKGEC89/Qodex.git

### 2. Install dependencies
Navigate to the project folder and install the required dependencies:
cd assignment
npm install

### 3. Create an OpenWeatherMap API key
1. Go to [OpenWeatherMap API](https://openweathermap.org/api) and sign up for an API key.
2. Replace \`YOUR_API_KEY\` in the API call URL in the \`src/api.js\` file with your actual API key.

### 4. Start the development server
npm start
\
The application should now be running at http://localhost:3000.


### Weather-Dashboard

|-- /public  \
|   |-- index.html                # The main HTML file  \
| \
|-- /src \
|   |-- /components \
|   |   |-- WeatherCard.js         # Displays weather details like temperature, humidity, etc. \
|   |   |-- SearchInput.js         # Allows users to search for a city \
|   |   |-- WeatherApp.js          # Displays error messages for invalid city. Otherwise display Data of API call \
| \
|   |-- /utils \
|   |   |-- api.js                 # Contains API call logic to OpenWeatherMap API \
| \
|   |-- App.js                     # Main component that integrates all other components \
|   |-- index.js                   # Entry point for the React app, rendering App.js \
|   |-- index.css                  # Main CSS file for styling \
| \
|-- .gitignore                     # Specifies which files to ignore in Git \
|-- package.json                   # Contains project dependencies, scripts, and metadata \
|-- README.md                      # Project documentation \


## Key Components

### 1. **WeatherCard.js**
This component displays the weather details such as temperature, humidity, wind speed, and weather conditions.

### 2. **SearchInput.js**
A component for inputting a city name and triggering the weather search. This also handles calling the API to fetch weather data.

### 3. **WeatherApp.js**
Uses the Hooks to manage and share weather data across components globally.

## API Integration

The app uses the OpenWeatherMap API to fetch real-time weather data. Here's an example API call:

### Javascript
\
fetch(https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}&units=metric\)
  .then(response => response.json())
  .then(data => {
    setWeatherData(data);
  })
  .catch(error => console.error("Error fetching weather data:", error));

Replace \`API_KEY\` with your actual OpenWeatherMap API key.

## Polling

To automatically refresh the weather data every 30 minutes, the \`useEffect\` hook is used to set an interval that fetches the weather data:

### Javascript

useEffect(() => {
  const interval = setInterval(() => {
    fetchWeatherData(city);
  }, 30000); // 30 minutes interval

  return () => clearInterval(interval); // Cleanup on component unmount
}, [city]);


## Error Handling

If the API call fails (e.g., due to an invalid city name), an error message is displayed:

### Javascript

.catch(error => {
  setError("Error No Data for provided city.");
});
\

## Bonus Features

- **5-Day Forecast**: You can implement a 5-day weather forecast by using the API endpoint.
- **Celsius/Fahrenheit Switch**: A option to switch between Celsius and Fahrenheit.

## UI/UX & Styling

The app is designed to be visually appealing and responsive. You can use CSS Modules or Styled Components to style the application.

## Evaluation Criteria

- **Code Structure & Readability**: The code is modular, clean, and follows proper naming conventions.
- **React Best Practices**: Functional components, hooks (useState, useEffect) are used properly.
- **API Handling & Polling**: The weather data is fetched correctly and refreshed every 30 minutes.
- **Error Handling**: User-friendly error messages and proper edge case handling are implemented.
- **UI/UX & Styling**: The app is responsive and user-friendly.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
