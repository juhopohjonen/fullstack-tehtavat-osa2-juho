import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ name, capital, area, languages, flagUrl }) => {
  
  const exampleObject = {
    'main': {

      'temp': 'loading...',
    },

    "weather": [
      {
        'icon': 'loading...'
      }
    ],

    "wind": {
      'speed': 'loading...'
    }
  }

  const [ weatherData, setWeatherData] = useState(exampleObject)

  var langArray = []

  var languageKeys = Object.keys(languages)
  for (var i = 0; i < languageKeys.length; i++) {
    let value = languages[languageKeys[i]]
    langArray.push(value)
  }

  const makeApiCall = () => {
    const api_key = process.env.REACT_APP_API_KEY
    const openweathermap_url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
    axios.get(openweathermap_url).then(
      response => {
        setWeatherData(response.data)
      }
    )

  }

  const getWeatherIcon = (weatherIcon) => {
    if (weatherIcon === 'loading...') {
      return;
    }

    return <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={'Weather icon'} />

  }

  useEffect(makeApiCall, [])

  
  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>

      <h4>languages</h4>

      <ul>
        {langArray.map(language => <li key={language}>{language}</li>)}
      </ul>

      <img src={flagUrl} alt={`Flag of ${name}`} />

      <h2>Weather in {capital}</h2>
      <p>temperature {weatherData.main.temp} celcius</p>
      {getWeatherIcon(weatherData.weather[0].icon)}
      <p>wind {weatherData.wind.speed} m/s</p>
    </div>
  )
}

const CountryResult = ({ countryName, quickSelect }) => <p>{countryName} <button onClick={() => quickSelect(countryName)}>show</button></p>

const Countries = ({ countriesToShow, quickSelectFunc }) => {

  if (countriesToShow.length > 10) {
    return (
      <p>Too many matches, please specify another</p>
    )
  } else if (countriesToShow.length === 1) {
    const currentCountry = [...countriesToShow][0]
        
    return (
      <Country 
        name={currentCountry.name.common}
        capital={currentCountry.capital[0]}
        area={currentCountry.area}
        flagUrl={currentCountry.flags['png']}
        languages={currentCountry.languages}
      />
    )
  } else if (countriesToShow.length === 0) {
    return (
      <p>No any matches :/</p>
    )
  }

  return (
    <div>
      {countriesToShow.map(country => <CountryResult quickSelect={quickSelectFunc} key={country.name.common} countryName={country.name.common} /> )}
    </div>
  )
}


const App = () => 
{

  const [ countryData, setCountryData ] = useState([])
  const [ countriesToShow, setCountriesToShow ] = useState([])

  const [ filterValue, setFilterValue ] = useState('')

  const fetchCountryData = () => {
    const promise = axios.get('https://restcountries.com/v3.1/all')
    promise.then(
      request => {
        setCountryData(request.data)
        setCountriesToShow(request.data)
      }
    )
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)

    const countryCopy = [...countryData]
    
    const countriesToShowObjs = 
    filterValue !== '' ? 
    countryCopy.filter(country => country.name.common.toLowerCase().includes(filterValue.toLowerCase()))
    : countryCopy

    setCountriesToShow(countriesToShowObjs)
  }

  const quickSelectCountry = (countryName) => {
    setFilterValue(countryName)

    const countryCopy = [...countryData] 
    const fakeCountries = []


    for (var i = 0; i < countryCopy.length; i++) {
      let country = countryCopy[i]
      let countryIndexName = country.name.common

      if (countryIndexName === countryName) {
        fakeCountries.push(country)
        break
      }
    }

    setCountriesToShow(fakeCountries)
    console.log('fakecountries', fakeCountries)

  }

  useEffect(fetchCountryData, [])


  return (
    <div>
      <div>filter countries <input value={filterValue} onChange={handleFilterChange} /></div>
      <Countries countriesToShow={countriesToShow} quickSelectFunc={quickSelectCountry} />
    </div>
  )
}

export default App;