import { useState } from 'react'

const AnecdoteOfTheDay = ({anecdotes, votes, selected}) => {
  return (
    <>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
    </>
  )
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const MostVotes = ({votes, anecdotes}) => {
  const sorted = [...votes].sort((a, b) => b - a)
  if (sorted[0] == 0) {
    return <p>No votes yet</p>
  }
  const index = votes.indexOf(sorted[0])
  return (
    <>
      <p>{anecdotes[index]}</p>
      <p>has {votes[index]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const updateVotes = (voteIndex) => {
    const newVotes = [...votes]
    newVotes[voteIndex] += 1
    setVotes(newVotes)
  }

  const randomiseNextAnecdote = () => {
    const newIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(newIndex);
  }

  return (
    <>
      <h2>Anecdote of the day</h2>
      <AnecdoteOfTheDay anecdotes={anecdotes} votes={votes} selected={selected} />
      <div>
        <Button text="vote" handleClick={() => updateVotes(selected)} />
        <Button text="next anecdote" handleClick={() => randomiseNextAnecdote()} />
      </div>
      <h2>Anecdote with most votes</h2>
      <MostVotes votes={votes} anecdotes={anecdotes} />
    </>
  )
}

export default App
