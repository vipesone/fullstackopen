const CountryDetails = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <strong>languages:</strong>
      <ul>{
        Object.keys(country.languages).map((key, index) => {
          return <li key={key}>{country.languages[key]}</li>
        })
      }</ul>
    </div>
  )
}

export default CountryDetails
