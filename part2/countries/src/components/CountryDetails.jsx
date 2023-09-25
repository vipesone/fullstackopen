const CountryDetails = ({ country, weatherInformation }) => {
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
      <div><img src={country.flags.svg} width={200} /></div>
      {(Object.keys(weatherInformation).length > 0 &&
        <>
          <h2>Weather in {country.capital[0]}</h2>
          <p>temperature {weatherInformation.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weatherInformation.weather[0].icon}@2x.png`} />
          <p>wind {weatherInformation.wind.speed} m/s</p>
        </>
      )}
    </div>
  )
}

export default CountryDetails
