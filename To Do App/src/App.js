
import './App.css';

import {Notes} from './components/Notes.js'

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <div className="App">
      <ToastContainer />
      <Notes />
    </div>
  );
}

export default App;
