import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import DashBoard from './components/DashBoard';
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {
  return (

  
  <BrowserRouter>
  <Routes>

    <Route path="/" element = {<SignUp/>}/>
    <Route  path="/signIn" element={<SignIn/>}/>
    <Route path="/DashBoard" element={<DashBoard/>} />
  </Routes>
  
  </BrowserRouter>
  );
}

export default App;
