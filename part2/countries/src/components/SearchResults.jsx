import SearchResultItem from "./SearchResultItem"
import CountryDetails from "./CountryDetails"

const SearchResults = ({visibleCountries}) => {
  if (visibleCountries.length >= 10) {
    return <p>Too many search results</p>
  } else if (visibleCountries.length == 0) {
    return <p>No search results found</p>
  } else if (visibleCountries.length == 1) {
    return <CountryDetails country={visibleCountries[0]} />
  }
  return (
    <>
      {visibleCountries.map((country, index) => <SearchResultItem key={country.cca2} item={country} />)}
    </>
  )
}

export default SearchResults
