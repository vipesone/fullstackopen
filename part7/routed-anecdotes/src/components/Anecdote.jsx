import { Link } from "react-router-dom"

const Anecdote = ({ anecdote }) => {
  if (!anecdote) {
    return <>
      <h2 style={{ color: 'red' }}>No anecdote found!</h2>
      <Link to="/">Go back to list of anecdotes</Link>
    </>
  }
  return <div>
    <h2>{`${anecdote.content} by ${anecdote.author}`}</h2>
    <p>{`has ${anecdote.votes} votes`}</p>
    <p>For more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
}

export default Anecdote
