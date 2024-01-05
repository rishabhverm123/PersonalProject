
import "./App.css";

import { useEffect,useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    debugger;
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-12 text-center">
          <div class="alert alert-danger" role="alert">
            <h3>STOPWATCH</h3>
          </div>
        </div>
        <div className="col-12 text-center border border-danger rounded-3 p-3">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button type="button" onClick={() => setRunning(true)} className="btn btn-danger">
              Start
            </button>
            <button type="button" onClick={() => setRunning(false)} className="btn btn-warning">
              Pause
            </button>
            <button type="button" onClick={() => setTime(0)} className="btn btn-success">
              Reset
            </button>
          </div>
          <div className="card mt-4 w-50" style={{left:'25%'}}>
  <div className="card-body text-center">
    <h5>Elapsed Time: <strong>
    <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </strong></h5>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}

export default App;
