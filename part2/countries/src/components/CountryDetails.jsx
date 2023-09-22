const CountryDetails = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <strong>languages:</strong>
      <ul>{
        Object.keys(country.languages).map((key, index) => {
          return <li key={key}>{country.languages[key]}</li>
        })
      }</ul>
      <div> <img src={country.flags.svg} width={200} /></div>
    </div>
  )
}

export default CountryDetails
