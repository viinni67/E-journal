import React from 'react'
import { useState } from 'react';
import {useHistory} from 'react-router-dom'
const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history=useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3005/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json.token);
        //console.log(json);
        if(json.success){
            console.log("sucess")
            localStorage.setItem('token',json.token);
            console.log(localStorage.getItem('token'))
            history.push("/");
        }
        else{
            alert('wrong credentials');
        }
    }

    const OnChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

       
        
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlfor="exampleInputEmail1">Email address</label>
                    <input value={credentials.email} name='email' type="email"  className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"  onChange={OnChange}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlfor="exampleInputPassword1">Password</label>
                    <input value={credentials.password}  name='password'  id='password' type="password" className="form-control"  onChange={OnChange}/>
                </div>
                
                <button type="submit" className="btn btn-primary my-1" >Submit</button>{' '}
               
            </form>
            <h2 id="help" className="form-text bold">do not have a account then sign up to make one </h2>



        </div>
    )
}

export default Login