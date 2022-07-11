import Course from './Course'

const Heading = ({ content }) => {
  return (
    <h1>{content}</h1>
  )
}

const Total = ({ courseParts }) => {

  const reduced = courseParts.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, 0);


  return (
    <strong>total of {reduced} exercises</strong>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  

  return (
    <div>
      <ul>

      {courses.map((course) => (
        <li key={course.id}>

          <Heading content={course.name} />
          <ul>
            {course.parts.map((part) => <Course key={part.id} course={part} />)}
          </ul>

          <Total courseParts={course.parts} />
        </li>
      ))}

      </ul>
    </div>
  )
}

export default App;