import logo from "./logo.svg";
import "./App.css";
import Studentlist from "./Studentlist.js";
import data from "./helper/Data.json";
import data2 from "./helper/Data.json";
import { useState } from "react";

function App() {
  const [students, setStudent] = useState(data);
   const clearAll=()=>{
    debugger;
      let list=students;
      list=[];
      setStudent(list)
  }
  const Reset=()=>{
    debugger;
    const list=[...data2];
    setStudent(list)
}
const Demo=(name)=>{
    alert(name);
}
  return (
    <div className="App">
      <div className="container mt-2 ">
        <div className="row">
          <div className="col-sm-12 ">
            <div class="alert alert-dark" role="alert">
              <h3>{students.length} Students</h3>
            </div>
          </div>
          <div className="main">
          <div className="col-sm-12 ">
            <Studentlist students={students} event={Demo}/>
          </div>
          <div className="col-sm-12">
            {
              students.length?
              <button className="btn btn-danger" onClick={()=>clearAll()}>Clear All</button>
              :
              <button className="btn btn-success" onClick={()=>Reset()}>Reset</button>
            }
           
          
          </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
