import axios from 'axios'
import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import SearchResults from './components/SearchResults'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [activeCountry, setActiveCountry] = useState({})
  const [weatherInformation, setWeatherInformation] = useState({})

  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_KEY

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchOnChange = (event) => {
    setActiveCountry({})
    setSearch(event.target.value)
  }

  const handleOnClick = (id) => {
    setActiveCountry(visibleCountries.find((country) => country.cca2 == id))
  }

  const visibleCountries = (search == '')
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    if (visibleCountries.length !== 1 && Object.keys(activeCountry).length === 0) return
    const targetCountry = (Object.keys(activeCountry).length ? activeCountry : visibleCountries[0])
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${targetCountry.capital[0]},${targetCountry.cca2}&APPID=${apiKey}&units=metric`)
      .then(response => {
        setWeatherInformation(response.data)
      })
  }, [activeCountry])

  return (
    <>
      <div>
        <label htmlFor="search">find countries</label>
        <input id="search" onChange={handleSearchOnChange} />
        <SearchResults
          visibleCountries={visibleCountries}
          handleOnClick={handleOnClick}
          activeCountry={activeCountry}
          weatherInformation={weatherInformation} />
      </div>
    </>
  )
}

export default App
