const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((runningTotal, current) => runningTotal + current.exercises, 0);
  return (
    <p>Number of exercises {total}</p>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map((value, index) => <Part key={index} part={value.name} exercises={value.exercises} />)}
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
