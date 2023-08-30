import Navbar from './components/Navbar';
import Home from './components/Home'
import About from './components/About';
import './App.css';
import{
  BrowserRouter,
  Route
} from  'react-router-dom/cjs/react-router-dom.min';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
   const [Alt,setAlt]=useState("hello")
   const showAlert=()=>{
    
   }

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          {/* <Alert msg={"hello"} /> */}
          <div className='container'>
          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route exact path="/about us">
              <About/>
            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/signup">
              <Signup/>
            </Route>
          </Switch>
        </div>
        </BrowserRouter>
      </NoteState>   
    </>
  );
}

export default App;
