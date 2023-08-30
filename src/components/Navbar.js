import React from 'react'
import { useEffect } from 'react';
import {
  Link,
  useLocation
} from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';
function Navbar() {
  let history=useHistory();
    const handlelogout=()=>{
      localStorage.removeItem('token')
      history.push("/login");

    }


  let location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Inotes</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about us' ? "active" : ""}`} to="/about us">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/"></Link>
            </li>
          </ul>

        </div>
        {!localStorage.getItem('token')?<form class="form-inline my-2 my-lg-0">
          <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
          < Link className="btn btn-primary mx-2" to="/signup" role="button">signup</Link>
        </form>:<button className="btn btn-primary mx-2"  role="button" onClick={handlelogout}>logout</button>}s
      </div>
    </nav>

  )
}

export default Navbar
