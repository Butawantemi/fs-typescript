interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartGroupBasicBase extends CoursePartBase{
   description: string,
}

interface CoursePartBasic extends CoursePartGroupBasicBase {
  kind: "basic"
}

interface CoursePartSpecial extends CoursePartGroupBasicBase {
  requirements: string[],
  kind: 'special'
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartGroupBasicBase {
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Header = ({name}: {name: string}) => {
  return <h1>{name}</h1>
}

const Content = ({courses} : {courses: CoursePart[]}) => { 

  const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );

};
  return courses.map(course => {
    switch (course.kind) {
      case "basic":
        return <div key={course.name}><h3><strong>{course.name} {course.exerciseCount}</strong></h3><p><i>{course.description}</i></p></div> 
      case "group":
        return <div key={course.name}><h3><strong>{course.name} {course.exerciseCount}</strong></h3><p>Project exercise {course.groupProjectCount}</p></div>   
      case "background":
        return <div key={course.name}><h3><strong>{course.name} {course.exerciseCount}</strong></h3><p><i>{course.description}</i></p><p>Submit to {course.backgroundMaterial}</p></div>  
      case "special":
        return <div key={course.name}><h3><strong>{course.name} {course.exerciseCount}</strong></h3><p><i>{course.description}</i></p>
        <p>Required Skills: {course.requirements.map((r, i)=> <span key={i}>{r}, </span>)}</p></div>  
      default:
        return assertNever(course)
    }
  })
}

const Total = ({total} : {total: number}) => {
  return <p>Number of exercises {total}</p>
}


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
  name: "Backend development",
  exerciseCount: 21,
  description: "Typing the backend",
  requirements: ["nodejs", "jest"],
  kind: "special"
}
];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;