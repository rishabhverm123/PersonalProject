
import './App.css';
import {React,useState} from 'react';
import { Generator } from './Generator/Generator';
import { ToastContainer } from 'react-toastify';



function App() {

  return (
    <div className="App bg_image h-100">
      <ToastContainer />
          <Generator />
    </div>
  );
}




export default App;
