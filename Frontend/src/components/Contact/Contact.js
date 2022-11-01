import React from 'react';
import './Contact.css';
import {MdLocationPin} from 'react-icons/md';
import {FaPhone} from 'react-icons/fa';
import {SiGmail} from 'react-icons/si';
const Contact = () => {
  return (
    <div id='contact-container'>
      <div className='contacts-types'>
<div className='contact-section'>
  
  <p><MdLocationPin className='contact-icon'/> Ferah Mah, Taşlıbayır Sok.,Natoyolu Cad. İlke 2 sitesi No:59 D:18</p>
</div>
<div className='contact-section'>
  
  <p><FaPhone className='contact-icon'/> +0 (551) 126 70 73</p>
</div>
<div className='contact-section'>
  
  <p> <SiGmail className='contact-icon'/> Ozbay.yusuf02@gmail.com</p>
</div>
<div id='message-textarea' className='contact-section'>
   
<label>Leave your message</label>
  <textarea  className='message-us' >  </textarea>
  <button className='send-email-btn'>Send message</button>
</div>
    </div>
    <iframe className='location-company' title='dsa' src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d102042.49629867959!2d30.568834242428093!3d36.94227697341406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m5!1s0x14c388abbdee4dc1%3A0x33cd99661511ca42!2zVmFyc2FrIEthcsWfxLF5YWthLCBIYWzEsSBTYWhhLCBLZXBlei9BbnRhbHlh!3m2!1d36.9719422!2d30.707743699999998!4m3!3m2!1d36.842045999999996!2d30.599106!5e0!3m2!1str!2str!4v1659352944002!5m2!1str!2str"height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}

export default Contact