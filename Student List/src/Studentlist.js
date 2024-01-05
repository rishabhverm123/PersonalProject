export default function Studentlist(props) {
  return props.students.map((student, key) => {
    const { name, gender, marks, image } = student;
    return (
      <div class="student-details my-2">
        <div className="student-image">
          <img src={image} alt="img" />
        </div>
        <div className="student-info text-center">
          <h2>{name}</h2>
          <p>Gender: {gender}</p>
          <p>Class: 10th Grade</p>
          <p>Marks: {marks}</p>
          <button className="btn btn-danger" onClick={()=>props.event(name)}>Get Name</button>
        </div>
      </div>
    );
  });
}
