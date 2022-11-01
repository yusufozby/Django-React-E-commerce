import axios from 'axios';
import React, { useContext, useState } from 'react'
import { DataContext } from '../../Context';
import './Register.css';
import {MdError} from 'react-icons/md'
import {GiConfirmed, GiProtectionGlasses} from 'react-icons/gi';
const Register = () => {
 const [user,setUser] = useState('');
 const [password,setPassword] = useState('');
 const [email,setEmail] = useState('');
 const [rePassword,setRePassword] = useState('')
 const [address,setAddress] = useState('');
const [registered,setRegistered] = useState(false);
const [message,setMessage] = useState('');
const [err,setErr] = useState(false);

const data = useContext(DataContext);



const createAccount = async () => {
setRegistered(true);
const newAccount = {
 user:{ 
  username:user,
  password,
  email
 },
  Address:address,
 }
 const emailValidation = /^([0-9a-zA-Z._]+)@([a-zA-Z]+)\.([a-zA-Z.]+)$/
 const uniqueEmail = data.users.some((addeduser)=>{
  return ( addeduser.user.email === email )
 })
 const uniqueUsername= data.users.some((addeduser)=>{
   return addeduser.user.username === user
 })

 
 if(uniqueEmail && data.users.length !== 0){
   setErr(true);
   setMessage('Email already exists.');
 }
 else if(email === "" || password === "" || address === "" || user === "" ){
  setErr(true);
  setMessage('No field can be empty.');
 }
 else if(uniqueUsername){
   setErr(true);
   setMessage('Username already exists.')
 }
 else if(password !== rePassword){
   setErr(true);
   setMessage("Passwords don't match.");
 
 }
 else if(user.length < 6){
   setErr(true);
   setMessage('6 minimum characters required for username')
 
 }
 else if(password.length < 6) {
  setErr(true);
  setMessage('6 minimum characters required for password')

 }
 else if(!(/\d/.test(password))){
 setErr(true);
   setMessage('Password must have number character');
   

 }
 else if(!emailValidation.test(email)) {
 setErr(true);
 setMessage('Invalid Email.');
}
else {

 await axios.post("http://localhost:8000/api/register/",newAccount)
 .then((res)=>console.log(res.data))
 .catch((err)=>console.log(err))
 setErr(false);
 setMessage('Registered Successfully !!');
}
}

  return (






    <div>
          <div className='login-form-container'>
     
     <div className='login-form'>
      <h3>REGISTER</h3>
      <div className='account-form-input-field'>
    <label>Username</label>   
    
      <input value={user} onChange={(e)=>setUser(e.target.value)} className='form-text' type="text" />
      </div>
      <div className='account-form-input-field'>
    <label>Password</label>   
    
      <input value={password} onChange={(e)=>setPassword(e.target.value)} className='form-text' type="password" />
      </div>
      <div className='account-form-input-field'>
    <label>Email</label>   
    
      <input value={email} onChange={e=>setEmail(e.target.value)} className='form-text' type="email" />
      </div>
      <div className='account-form-input-field'>
    <label>re-Password</label>   
    
      <input onChange={(e)=>setRePassword(e.target.value)} value={rePassword}  className='form-text' type="password" />
      </div>
      <div className='account-form-input-field'>
    <label>Address</label>   
    
      <textarea value={address} onChange={e=>setAddress(e.target.value)} id='addressTextArea' className='form-text' type="text" />
      </div>
      <button onClick={()=>createAccount()} className='login-btn'>register</button>
      {
          registered ? (err ? 
            <div className='account-alert account-alert-error'>
              <span className='account-alert-error-text'><MdError className='account-message-icon'/> {message}</span>
                </div> 
          :
          <div className='account-alert account-alert-success'>
          <span className='account-alert-success-text'><GiConfirmed className='account-message-icon'/> {message}</span>
            </div> 
              
              ) : null
      }
     
     
     </div>
    
        </div>
    </div>
  )
}

export default Register