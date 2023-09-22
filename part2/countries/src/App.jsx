import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import SearchResults from './components/SearchResults'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, []);

  const handleSearchOnChange = (event) => {
    setSearch(event.target.value)
  }

  const visibleCountries = (search == '')
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))


  return (
    <>
      <div>
        <label htmlFor="search">find countries</label>
        <input id="search" onChange={handleSearchOnChange} />
        <SearchResults visibleCountries={visibleCountries} />
      </div>
    </>
  )
}

export default App
