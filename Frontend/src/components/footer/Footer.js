import React from 'react';
import './Footer.css';

import Resim19 from '../../img/Resim19.png';
import Resim20 from '../../img/Resim20.png';
const Footer = () => {
  return (
    <div className='footer'>
    <div className='footer-content'>
      <div className='col-3'>
        <h2>Contact</h2>
  <b>Address :</b><p> Ferah Mah., Taşlıbayır Sok., Natoyolu Cad., İlke 2 sitesi no:59 D:18 İstanbul / Üsküdar</p>
  <br/>
  <b>Phone : </b><p>+0 (551) 126 70 73</p><br/>
  <b>Email : </b><p>Ozbay.yusuf02@gmail.com</p>
  <br/>
  <br/>
  <h2>İnstall App</h2>
 <a className='google-app-link' href='/'>  <img className='google-app' src={Resim19} alt=''/> </a>
 <a className='google-app-link' href='/'>  <img className='google-app' id='app-store' src={Resim20} alt=''/></a>
</div>
<div className='footer-col'>
  <h2>Titles</h2>
  <ul>
    <li><a href='/'>Home</a></li>
    <li><a href='/help'>Contact</a></li>
    <li><a href='/login'>Login</a></li>
    <li><a href='/register'>Register</a></li>
    <li><a href='/announcements'>Announcements</a></li>
  </ul>
</div>

<div className='footer-col'>
  <h2>Links</h2>
  <ul>
    <li><a href='/'>Link 1</a></li>
    <li><a href='/'>Link 2</a></li>
    <li><a href='/'>Link 3</a></li>
    <li><a href='/'>Link 4</a></li>
    <li><a href='/'>Link 5</a></li>

  </ul>
</div>
        
 
  
    </div>
    </div>
  )
}

export default Footer