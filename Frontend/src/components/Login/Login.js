import React, { useContext, useState, } from 'react'
import './Login.css';
import {FaGoogle,FaFacebook} from 'react-icons/fa';
import { DataContext } from '../../Context';
import {useNavigate} from "react-router-dom"
import { MdError } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';
import axios from "axios";
const Login = () => {

const data = useContext(DataContext);
const [logged,setLogged] = useState(false);
const [username,setUsername] = useState('');
const [password,setPassword] = useState('');
const [err,setErr] = useState(false);
const [message,setMessage] = useState('');
const navigate = useNavigate();
const loginUser = async () => {
  setLogged(true);
   await axios.post("http://localhost:8000/api/login/",{username,password}).then((res)=>{
    setErr(false);
localStorage.setItem("user",JSON.stringify(res.data));
window.location.href = "/"

   }).catch((err)=>{
   setMessage('Invalid password or username')
     setErr(true);
  }
   );



}


  return (
    <div className='login-form-container'>
     
 <div className='login-form'>
  <h3>LOGIN</h3>
  <div className='account-form-input-field'>
<label>Username</label>   

  <input className='form-text' type="text" onChange={(e)=>setUsername(e.target.value)} value={username} />
  </div>
  <div className='account-form-input-field'>
<label>Password</label>   

  <input onChange={(e)=>setPassword(e.target.value)} value={password} className='form-text' type="password" />
  </div>
  <button className='login-btn' onClick={loginUser}>Login</button>
  <a className='forgot-pswd' href='/'>Forgot password</a>
  <br/>
 
  <span className='unregistered-link'>If you don't have an account, then <a href='/register'>register</a></span>
  <div className='login-with-social-media'>
  <button id='loginFacebook' >Login with facebook <FaFacebook className='login-icon'/></button>
  <button id='loginGoogle' >Login with Google <FaGoogle className='login-icon'/></button>
  </div>
  {
          logged ? ( err ?
          <div className='account-alert account-alert-error'>
          <span className='account-alert-error-text'><MdError className='account-message-icon'/> {message}</span>
            </div> 
       :
       <div className='account-alert account-alert-success'>
       <span className='account-alert-success-text'><GiConfirmed className='account-message-icon'/> {message}</span>
         </div>     )
               : null
      }
    
 </div>

    </div>
  )
}

export default Login