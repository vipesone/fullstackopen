const Header = (props) => {
  return (
    <h2>{props.course}</h2>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((runningTotal, current) => runningTotal + current.exercises, 0);
  return (
    <strong>Total of {total} exercises</strong>
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
      {props.parts.map((value, index) => <Part key={value.id} part={value.name} exercises={value.exercises} />)}
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course
