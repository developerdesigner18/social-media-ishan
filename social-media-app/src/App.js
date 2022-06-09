import logo from './logo.svg';
import './App.css';
import Signup from './component/signup/Signup';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './component/logIn/login';
import Home from './component/home/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import NuserProfile from './component/NuserProfile/NuserProfile';
import Welcome from './component/welcome/Welcome';
import Proute from './component/Proute';
import LogoutProute from './component/LogoutProute';
function App() {
  return (
    <BrowserRouter>
    <div className='App'>
    <Routes>
      <Route path='/' element ={<LogoutProute><Welcome/></LogoutProute>}/>
      <Route path='/signup' element={<LogoutProute><Signup/></LogoutProute>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Proute><Home/></Proute>}/>
      <Route path='/nuser' element={<Proute><NuserProfile/></Proute>}/>
    </Routes>
    </div>
    </BrowserRouter>

  );
}

export default App;
