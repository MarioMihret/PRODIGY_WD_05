import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css';

function App() {
  const [data, setData] = useState(null) // Initialize with null
  const [location, setLocation] = useState('Addis Ababa') // Default to Ethiopia
  const [error, setError] = useState(null) // State to manage errors

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data)
          setError(null) // Clear any previous errors
        })
        .catch((error) => {
          // Handle 404 errors specifically
          if (error.response && error.response.status === 404) {
            setError('Location not found. Please try again.'); 
          } else {
            setError('An error occurred. Please try again later.'); 
          }
        })
      setLocation('')
    }
  }

  // Fetch data on component mount (for default location)
  useEffect(() => {
    searchLocation({ key: 'Enter' }); // Trigger the search function
  }, []);

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        {error && (
          <div className="error">
            <p>{error}</p> 
          </div>
        )}
        {data && (
          <>
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                <h1>{data.main.temp.toFixed()}°F</h1> 
              </div>
              <div className="description">
                <p>{data.weather[0].main}</p> 
              </div>
            </div>

            <div className="bottom">
              <div className="feels">
                <p className='bold'>{data.main.feels_like.toFixed()}°F</p> 
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                <p className='bold'>{data.main.humidity}%</p> 
                <p>Humidity</p>
              </div>
              <div className="wind">
                <p className='bold'>{data.wind.speed.toFixed()} MPH</p> 
                <p>Wind Speed</p>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default App;