const SearchResultItem = ({ item, handleOnClick }) => {
  return (
    <div>{item.name.common} <button onClick={handleOnClick}>Show</button></div>
  )
}
export default SearchResultItem
