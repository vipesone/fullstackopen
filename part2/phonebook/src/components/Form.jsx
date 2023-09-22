const Form = ({ handleNameChange, handleNumberChange, handleSubmitClick }) => {

  return (
    <>
      <form>
        <div>
          <label htmlFor="name">name:</label>
          <input id="name" onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="number">number:</label>
          <input id="number" onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmitClick}>add</button>
        </div>
      </form>
    </>
  )
}

export default Form
