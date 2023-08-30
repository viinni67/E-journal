import React from 'react'
import { useState } from 'react';
import {useHistory} from 'react-router-dom'
const Signup = () => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "" ,cpassword:""});
  let history=useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add password confirmation validation
    if (credentials.password !== credentials.cpassword) {
      alert("Password and confirm password do not match.");
      return;
    }

    const response = await fetch("http://localhost:3005/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.token);
      history.push("/login");
    } else {
      alert("User already exists or some other error occurred.");
    }
  }

  const onchange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  }
  return (
    <div className='conatainer'>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input type="text" name='name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"  onChange={onchange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={onchange}  required/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder="Password"  onChange={onchange} minLength={10} required/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">confirm Password</label>
          <input type="password" name='cpassword' className="form-control" id="exampleInputPassword1" placeholder="confirm Password" onChange={onchange}  minLength={10} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  )
}

export default Signup