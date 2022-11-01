import React, { useContext, useState } from 'react'
import './Slides.css'
import resim3 from '../../img/resim3.png'
import Resim4 from '../../img/Resim4.png'
import Resim5 from '../../img/Resim5.png'
import {MdNavigateNext,MdNavigateBefore} from 'react-icons/md';
import { IoMdClose } from 'react-icons/io'
import {IoClose} from 'react-icons/io5';
import { DataContext } from '../../Context'
import {FaCloudUploadAlt} from 'react-icons/fa';
import Messages from './Messages/Messages'



const Slides = () => {
 

 const [slidePosition,setSlidePosition] = useState(0);
 const [comment,setComment] = useState(false);
 const data = useContext(DataContext);

 const nextSlide = () => {

  setSlidePosition(slidePosition > -200 ? slidePosition-100 : slidePosition);
  if(slidePosition <= 0 && slidePosition > -200) {
  document.querySelector(".page-"+String((-slidePosition)/100+2)).id = "active";
  document.querySelector(".page-"+String((-slidePosition)/100+1)).id = "";
  }
}

const prevSlide = () => {
  setSlidePosition(slidePosition < 0 ? slidePosition+100 : slidePosition)
  if(slidePosition >= -200 && slidePosition < 0) {
  document.querySelector(".page-"+String((-slidePosition)/100)).id = "active";
  document.querySelector(".page-"+String((-slidePosition)/100+1)).id = "";
  }
}

 var slideImgs = document.querySelectorAll(".slide-img");
slideImgs.forEach((element,index)=>{
element.style.left = String(slidePosition+index*100)+"%";

})


  return (
    <div className='slide-container'>
<div className='col-3 pad'>

  <h3>Trade-in-offer</h3>
  <h1 id='first-slogan'>GET MORE</h1>
  
  <h1 id='second-slogan'>PAY LESS</h1>
<p className='description'>Lorem Ipsum is simply dummy text of the printing andimen book.</p>
<button className='shop-now'>Shop now</button>
</div>
<div className='col-3 pad'>
  <div className='slide-card'>
    <div  className='slide-card-img-container'>
<img className='slide-img first-slide' src={Resim4}  alt=''/>
<img className='slide-img second-slide'  src={resim3}  alt=''/>
<img className='slide-img third-slide' src={Resim5}  alt=''/>
<div className='page-slide-container'>
  <div className='page-slide page-1'  id='active'></div>
  <div className='page-slide page-2'></div>
  <div className='page-slide page-3'></div>
</div>
    <button   className='slide-position-btn' id='next' onClick={()=>nextSlide() }><MdNavigateNext style={{"background":"#303030"}}/></button>
    <button className='slide-position-btn' id='prev' onClick={()=>prevSlide()}><MdNavigateBefore style={{"background":"#303030"}}/></button>    
    </div>
    <p className='slide-card-desc'>Lorem Ipsum is simply dummy text of the printing andimen book.Lorem Ipsum is simply dummy text of the printing andimen book.Lorem Ipsum is simply dummy text of the printing andimen book.</p>
 
<button onClick={()=>setComment(true)}  className='review-company'>Add Comment</button>
<div id={comment ? 'open-comment' : 'close-comment'} className='comment-container'>
<Messages />
  <div id={comment ? 'open-comment-form' : 'close-comment-form'}  className='comment-form'>
   
  <i className='close-comment-btn' onClick={()=>setComment(false)}  ><IoMdClose/></i>
   
      <form onSubmit={(e)=>data.commentForm(e)} className='comment-form-field comment-row'>
      <div className='comment-col-2'>
        <div className='comment-field'>
          <input id='name' type="text" value={data.sender} onChange={(e)=>data.setsender(e.target.value)} onFocus={()=>data.activatedInput('name','name-placeholder')} onBlur={()=>data.passivedInput('name','name-placeholder')} className='comment-input'/>
          <span id='name-placeholder' >Name</span>
        </div>
        <div className='comment-field'>
          <input id='email' type="email" value={data.senderMail} onChange={(e)=>data.setsenderMail(e.target.value)} onFocus={()=>data.activatedInput('email','email-placeholdeer')} onBlur={()=>data.passivedInput('email','email-placeholdeer')} className='comment-input'/>
          <span id='email-placeholdeer' >Email</span>
        </div>
        </div>
   
        <div className='comment-text'>
       
        <textarea value={data.comment} onChange={(e)=>data.setcomment(e.target.value)} placeholder="Enter your review" id='message' className='comment-input'></textarea>
         
    

        </div>
        <button onClick={()=>data.addComment()} className='send-message'>Send Comment</button>
        </form>
    
  </div>
</div>
  </div>
</div>

  </div>
  )
}

export default Slides