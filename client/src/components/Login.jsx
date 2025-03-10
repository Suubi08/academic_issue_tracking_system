import React from 'react'
import { Link, useNavigate} from 'react-router-dom'


function Login() {
    const navigate =useNavigate();
    
  return (
    <div className='container'>
       <div><h1 className='welcome'>Welcome, Log into your AITS account</h1></div> 
       <div className="container2">
        <p className='log-p'>It is our great pleasure to have you on board!</p>
        <div>
            <label htmlFor="username" className='labels'>Username</label>
            <input type="text" name="username" id="username"  className='input-style' placeholder='Enter your Username'/>
        </div>
        <div>
            <label htmlFor="pwd" className='labels'>  Password</label>
            <input type="password" name="pwd" id="pwd"  className='input-style' placeholder='Enter your Password'/>
        </div>
        <div className='forgot'>
            <div className='checkbox'>
            <input type="checkbox" name="checkbox" id="checkbox" className='mr-1'/>
            <label htmlFor="checkbox" className='text-gray-700 text-base'>Remember me</label>
            </div>
            <div>
                <a href="#">Forgot Password?</a>
            </div>
        </div>
         <div>
            <button type="button" className="btn">Login</button>
         </div>
         <div>
            <p className='log-p'>Don't have an Account? <Link to="/Register" className='Link'>Register</Link></p>
        </div>
       </div>
    </div>
  )
}

export default Login;