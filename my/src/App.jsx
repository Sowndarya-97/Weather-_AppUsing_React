import { useEffect, useState } from 'react';
import './App.css';
import PropTypes from "prop-types"

/*Images */
import Snowicon from './assets/snowicon.png'
import Cloudicon from './assets/cloud icon.avif'
import Clearicon from './assets/cloud icon.avif'
import Drizzleicon from './assets/drizzleicon.png'
import Humidityicon from './assets/humidityicon.png'
import Rainicon from './assets/rain icon.avif'
import Windicon from './assets/windicon.png'


const WeatherDetails=({icon, temp, city, country,lat,log,humidity,wind})=> {
  return(
    <>
      <div className="images">
        <img src={icon} alt="image" />
      </div>

      <div className="temp">{temp}°C</div>

      <div className="location">{city}</div>

      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">latitude</span>
          <span>{lat}</span>
        </div>
      
      <div>
          <span className="log">longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={Windicon} alt="humidity" className='icon'/>
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>


        <div className="element">
          <img src={Humidityicon} alt="wind" className='icon'/>
          <div className="data">
            <div className="wind-percent">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>

  </>
  )
}

WeatherDetails.propTypes={
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,
  

}

  
function App() {
    const [icon, setIcon] = useState(Snowicon)
    const [temp, setTemp] = useState(0)
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [lat,setLat] = useState(0)
    const [log,setLog] = useState(0)
    const [humidity,setHumidity] = useState(0)
    const [wind, setWind] = useState(0)
    const [text, setText]= useState("")
    const [cityNotFound, setcityNotFound] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] =useState(null)
    let api_key = "ecc58efede5442d3dff6f0d9c9208799";

    const weatherIconMap = {
      "01d": Clearicon,
      "01n":Clearicon,
      "02d": Cloudicon,
      "02n":Cloudicon,
      "03d":Drizzleicon,
      "03n":Drizzleicon,
      "04d":Drizzleicon,
      "04n":Drizzleicon,
      "09d":Rainicon,
      "09n":Rainicon,
      "10d":Rainicon,
      "10n":Rainicon,
      "13d":Snowicon,
      "13n":Snowicon,
    };


  const search = async ()=>{
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;


  try {
    let res = await fetch(url);
    let data = await res.json()
    console.log(data);
    if (data.cod ==="404") {
      console.log("City not found");
      setcityNotFound(true);
      setLoading(true);
      return;
    }
    setHumidity(data.main.humidity)
    setWind(data.wind.speed)
    setTemp(Math.floor(data.main.temp))
    setCity(data.name)
    setCountry(data.sys.country)
    setLat(data.coord.lat)
    setLog(data.coord.lon)

    const weatherIconCode = data.weather[0].icon;
    setIcon(weatherIconMap[weatherIconCode] || Clearicon)
    setcityNotFound(false);
  } 
  catch (error) {
    console.log("An error occurred", error.message);
    // setError("An error occurred while fetching weather data");
  }
  finally{
    setLoading(false)
  }
    }

    const handleCity =(e)=>{
      setText(e.target.value);
    }

    const handleKeyDown =(e)=>{
      if (e.key==="Enter") {
        search()
      }
    };

    useEffect(function(){
      search()
    },[]);
  return (
    <div>
      <div className="container">
        <h3>Weather App</h3>
        <div className="input-container">
            <input type="text"
             className='cityInput' 
             placeholder='Search City' 
             onChange={handleCity}
             value={text}
             onKeyDown={handleKeyDown}/>
            <div className="search-icon" onClick={()=>search()}>
                <p><ion-icon name="search-outline"></ion-icon></p>
            </div>
        </div>
        {!loading && !cityNotFound &&<WeatherDetails icon={icon} temp={temp} city={city} country={country}
        lat={lat} log={log} humidity={humidity} wind={wind}/>}


        {loading &&<div className='loading-message'>Loading....</div>}
        {error &&<div className='error-message'>{error}</div>}
        {cityNotFound &&<div className="city-not-found">City not found</div>}

        <p className="copyrights">
          Designed by <span>Sowndarya</span>
        </p>
        </div>
        
        
    </div>
  )
}

export default App;
