
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login.js'
import {Logged} from './components/Logged/Logged.js'
import { ToastContainer} from 'react-toastify';
import { Home } from './components/Logged/Home/Home.js';
import { Dashboard } from './components/Logged/Dashboard/Dashboard.js';
import { Protected } from './components/Protected.js';
import ForgotPassword from './components/Login/ForgotPassword.js';
import { Orders } from './components/Logged/Orders/Orders.js';

function App() {
  return (
    <div className="App h-100 ">
    <BrowserRouter>
      <ToastContainer />
        <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/forgot-password' element={<ForgotPassword />}></Route>
            <Route path='' element={<Navigate replace to="/Logged" />} />
            <Route path='*' element={<Navigate replace to="/Logged" />} />
            <Route path='/Logged' element={<Protected />}>
              <Route path='' element={<Logged />} >
                 <Route path='' element={<Home />} />
                 <Route path='*' element={<Navigate replace to="/Logged" />} />
                 <Route path='Dashboard' element={<Dashboard />} />
                 <Route path='orders' element={<Orders />} />

                 
              </Route>

            </Route>
        </Routes>
      </BrowserRouter>
  
       
    </div>
  );
}

export default App;
