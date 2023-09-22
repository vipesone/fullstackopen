import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import SearchResults from './components/SearchResults'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [activeCountry, setActiveCountry] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, []);

  const handleSearchOnChange = (event) => {
    setActiveCountry(null)
    setSearch(event.target.value)
  }

  const handleOnClick = (id) => {
    setActiveCountry(visibleCountries.find((country) => country.cca2 == id))
  }

  const visibleCountries = (search == '')
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <div>
        <label htmlFor="search">find countries</label>
        <input id="search" onChange={handleSearchOnChange} />
        <SearchResults visibleCountries={visibleCountries} handleOnClick={handleOnClick} activeCountry={activeCountry} />
      </div>
    </>
  )
}

export default App
