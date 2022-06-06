import logo from './logo.svg';
import './App.css';
import Signup from './component/signup/Signup';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './component/logIn/login';
function App() {
  return (
    <BrowserRouter>
    <div className='App'>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </div>
    </BrowserRouter>

  );
}

export default App;
