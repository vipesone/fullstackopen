const Filter = ({handleFilterChange}) => {

  return (
    <div>
      <label htmlFor="filter">Filter shown with</label>
      <input id="filter" onChange={handleFilterChange} />
    </div>
  )
}

export default Filter
