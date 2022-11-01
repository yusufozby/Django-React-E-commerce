import React, { useContext, useState } from 'react'
import { GiConfirmed } from 'react-icons/gi';
import { MdError } from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import emailjs from "emailjs-com"

import './Paymentform.css'
import { DataContext } from '../../../Context';
const Paymentform = () => {

   const data = useContext(DataContext);
    let navigate = useNavigate();
    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [number,setNumber] = useState('')
    const [CVV,setCVV] = useState('');
    const [expDate,setExpDate] = useState('');
    const [err,setErr] = useState(false);
    const [message,setMessage] = useState('')
    const [submit,setSubmit] = useState(false);

const cartFormatter = (e) => {
  const extractNumbers = e.target.value.replace(/[\D]/g,"")
    if(extractNumbers.length <= 4){
    setNumber(extractNumbers)
    }
    else if(extractNumbers.length <= 8){
        setNumber(`${extractNumbers.slice(0,4)} ${extractNumbers.slice(4,8)}`);
    }
    else if(extractNumbers.length < 12){
        setNumber(`${extractNumbers.slice(0,4)} ${extractNumbers.slice(4,8)} ${extractNumbers.slice(8,12)}`);
    }
    else {
        setNumber(`${extractNumbers.slice(0,4)} ${extractNumbers.slice(4,8)} ${extractNumbers.slice(8,12)} ${extractNumbers.slice(12,16)}`);
    }
 
}
const CVVFormatter = (e) => {
  const extractNumbers = e.target.value.replace(/[\D]/g,"")
  setCVV(extractNumbers);
}
const expDateFormatter = (e) => {
  const extractNumbers = e.target.value.replace(/[\D]/g,"")
  if(extractNumbers.length <= 2){
    setExpDate(extractNumbers)
  }
  else {
    setExpDate(`${extractNumbers.slice(0,2)}/${extractNumbers.slice(2,4)}`)
  }
}

    const payment = (e) => {
  e.preventDefault();
   setSubmit(true);
    if(CVV.length === 0 || expDate.length === 0 || number.length === 0  ||name.length === 0 || surname.length === 0 ){
      setErr(true);
      setMessage('All fields must be filled');
    }
  else if(CVV.length !== 3){
    setErr(true);
    setMessage('3 digits required for CVV');

  }
  else if(expDate.length !== 5){
    setErr(true);
    setMessage('invalid expiration date.')
  }
  else if(number.length < 19){
    setErr(true)
    setMessage('invalid cart digits');
  }
    
  else {
emailjs.sendForm('service_fd8micx','template_75wwqyi',e.target,'9DsVb8SYEmcAIhT-V').then(()=>{
  setErr(false);
  setMessage("We've sent you mail.Please check it out.")
  
}).catch(err =>{
setErr(true);
setMessage("Email doesn't exist");
})
  }


    }
  return (
    <div>
      <form onSubmit={payment}>
        <div id='moveDown' className='login-form'>
    <h3>Payment Form</h3>
    <div className='account-form-input-field'>
    
    <label>Cart Owner name</label>
      <input className='form-text' onChange={(e)=>setName(e.target.value)} value={name} type="text"/>
      </div>
      <div className='account-form-input-field' >
   
    <label>Cart Owner Surname</label>
      <input className='form-text'  onChange={(e)=>setSurname(e.target.value)} value={surname} type="text" />
      </div>
      <div  className='account-form-input-field'>

      <label>Cart Number</label>
      <input className='form-text ' maxLength={19} placeholder='xxxx xxxx xxxx xxxx' type="text" onInput={(e)=>cartFormatter(e)} value={number} />
     
      </div>
      
   
      <div id='cartInfo'  className='account-form-input-field'>

    
<input className='form-text text-w-40' type="text" value={CVV} maxLength={3} onChange={(e)=>CVVFormatter(e)} placeholder='CVV' />
<input className='form-text text-w-40' type="text" value={expDate} maxLength={5} onChange={(e)=>expDateFormatter(e)} placeholder='Expiration Date' />

</div>
    
   <button className='confirm-shopping'>Confirm</button>
   <div className='address-buttons payment-buttons'>
        <button onClick={()=>navigate('/')}>Back</button>
        
      </div>
   
         {
          submit ? (err ? 
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

{
      data.newCart.map((element)=>{
        return (
          <div>
            <input type="text"  name='products' value={element.product+"\t"} hidden/>
            <input type="text"  name='qty' value={element.qty+"\t"} hidden/>
   
          </div>
        )
      })
      
}
<input type="text" name='user-username' value={JSON.parse(localStorage.getItem("user")).user.username}  hidden/>
            <input type="text" name='user-email'  value={JSON.parse(localStorage.getItem("user")).user.email}  hidden/>
</form>
    </div>
  )
}

export default Paymentform