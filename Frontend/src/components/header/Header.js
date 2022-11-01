import React, { useContext, useState } from 'react'
import {FaSearch, FaFacebookF, FaUser,FaTwitter,FaWhatsapp,FaInstagram,FaLinkedin} from 'react-icons/fa';
import {HiShoppingCart} from 'react-icons/hi'
import {BsChevronDown} from 'react-icons/bs';
import {IoMdClose} from 'react-icons/io';
import {GoChevronDown,GoChevronUp} from 'react-icons/go';
import {HiOutlineMenu} from 'react-icons/hi';
import {useNavigate} from 'react-router-dom';


import './Header.css'
import { DataContext } from '../../Context';

const Header = () => {
  const data = useContext(DataContext);
 const navigate = useNavigate();
  const searchProduct = () => {
    
   if(data.search.length !== 0) {
    var searchInput = data.search.replace(/[\s]/g,"")
    console.log(searchInput)
    
    const searchedProducts = data.products.filter((prod)=>{
      return prod.name.toLowerCase().includes(searchInput);
    

    })
    data.setSearchProducts(searchedProducts);
    window.location.href = "/searchproduct";
  }
  }
 const [toggleAccount,setToggleAccount] = useState(false);
 const  [toggleCat,setToggleCat] = useState(false);
const [toggleSettings,setToggleSettings] = useState(false);
  document.addEventListener("click",(e)=>{
    if(e.target.id !== 'cat-select' && e.target.className !== 'category-link'  ) {
      data.setCategory(false)
    }

  })
  const categoryLinks = [{id:1, name:'Electronics', },{ id:2,name:'Bags'},
  {
    id:3,
    name:'Clothes',

  },
  {
    id:4,
    name:'Sports',

  },
  {
    id:5,
    name:'Clocks',
  
  },
  {
    id:6,
    name:'Household Appliances',
   
  },
  {
    id:7,
    name:'Accessory'},
  {
    id:8,
    name:'Photo & Camera'
}
]
const pressEnter = (e) => {
  if(e.key === "Enter") {
    e.preventDefault();
    searchProduct();
  }
}

const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
}


console.log(data.newCart.length)


  return (
    <div>
    <div className='header'>
      <div className='col-1'>

 <div className='logo-container'>
   <h2 className='logo'>E-commerce</h2>

 <div className='mobile-menu'>
 
        <a className='mobile-list' id='account-shopping-cart'  href='/cart'>
      <div className='shopping-cart-field' >
        <HiShoppingCart id='shopping'/>
        
        <span>{data.newCart.length}</span>
        </div>
        </a>
    
       <HiOutlineMenu id='mobile-menu' onClick={()=>data.setSidemenu(true)} className='mobile-list'  />
  
       
        </div>
        
        
        </div>
 

      <div className='search-form'>
      <input value={data.search} onKeyPress={(e)=>pressEnter(e)} onChange={(e)=>data.setSearch(e.target.value)} type="text" placeholder='Search product' className='search-product' />
 <button onClick={()=>data.search.length !== 0 ? navigate("/searchproduct/?search="+data.search ): null}  className='search-btn'><FaSearch/> </button>
      
      </div>

   <ul className='account-list'>
    <div className='dropdown'>
    <li id='dropdown-header' className='account-item'><span className='account-link' id='account-btn' ><FaUser className='down-logo'/> Account <BsChevronDown className='down-logo'/></span></li>
    
            <div className='account-dropdown'>
              {
                localStorage.getItem("user") === null ?
                <>
                <a className='dropdown-item' id='login' href='/login'>Login</a>
              <a className='dropdown-item' id='register' href='/register'>Register</a>
              </> :
              <>
              <span className='logged-user'>{JSON.parse(localStorage.getItem("user")).user.username}</span>
              <button className='logout-btn' onClick={logout}>Logout</button>
              </>
              }
              
            </div>     
            </div>
    <li className='account-item'><a className='account-link' id='account-shopping-cart'  href='/cart'>
      <div className='shopping-cart-field' >
        <HiShoppingCart id='shopping'/>
        
        <span>{data.newCart.length}</span>
        </div>
        </a>
       
        
        </li>
   </ul>
   </div>
 
<div className='category-container'>
 <div className='category-body'>
  <button id='cat-select' onClick={() => data.setCategory(!data.category)} className='category-select'>Categories <i id='cat-select' className={data.category ? 'fa fa-chevron-up cat-down-logo' : 'fa fa-chevron-down cat-down-logo'}></i> 
  </button>

    
    
  <ul id={data.category ? "open-category-list" : "close-category-list"} className='category-list'>
  <li className='category-item'><a href='/categories/' className='category-link active-cat-link'>All Categories</a></li>
  {
   categoryLinks.map((category)=>(
    <li className='category-item'><a href={"/category/"+category.name} className='category-link'>{category.name}</a></li>
   ))    
  }

  
  </ul>

 </div>
 <div>
 <a href='/' className='middle-link'  >Home</a>
 <a href='/contact' className='middle-link'  >Contact</a>
 </div>
 <div className='social-media-container'>
  <div onClick={()=>window.open("https://www.facebook.com/")} className='social-media-icon web-icon'><FaFacebookF/></div>
  <div onClick={()=>window.open("https://twitter.com/home?lang=en")} className='social-media-icon web-icon'><FaTwitter/></div>
  <div onClick={()=>window.open("https://www.whatsapp.com/")} className='social-media-icon web-icon'><FaWhatsapp/></div>
  <div onClick={()=>window.open("https://www.instagram.com/")} className='social-media-icon web-icon'><FaInstagram/></div>
  <div onClick={()=>window.open("https://www.linkedin.com/feed/")} className='social-media-icon web-icon'><FaLinkedin/></div>
 </div>
</div></div>



<div  className='toggle' id={data.sidemenu ? "open-toggle" : "close-toggle"}>
          <button className='close-btn' onClick={()=>data.setSidemenu(false)}><IoMdClose/></button>
          <button href='/' onClick={()=>setToggleAccount(!toggleAccount)} className='toggle-btn'>Account { toggleAccount ? <GoChevronDown className='toggle-down-logo'/>    :  <GoChevronUp className='toggle-down-logo'/> }</button>
          <ul className={toggleAccount ? 'account-toggle-list-close' : 'account-toggle-list'}>
           { localStorage.getItem("user") === null ? <>
            <li className='account-toggle-item'><a href='/login' className='account-toggle-link'>Login</a></li>
            <li className='account-toggle-item'><a href='/register' className='account-toggle-link'>Register</a></li>
            </>
            : <li className='account-toggle-item'>
               <button id='account-toggle-logout-btn' className='account-toggle-item' onClick={logout}>logout</button>  

            </li>
           }
            </ul>
          <button  onClick={()=>setToggleCat(!toggleCat)} className='toggle-btn'>Categories { toggleCat ? <GoChevronDown className='toggle-down-logo'/>    : <GoChevronUp className='toggle-down-logo'/>  }</button>
          <ul  className={toggleCat ? 'category-toggle-list-close' : 'category-toggle-list'}>
            
          <li className='account-toggle-item'><a href='/categories' className='account-toggle-link'>All Categories</a></li>
    {
      categoryLinks.map((cat)=>(
        <li className='account-toggle-item'><a className='account-toggle-link' href={'/category/'+cat.name}>{cat.name}</a></li>
      ))
    }
        
          </ul>
          <button className='toggle-btn' onClick={()=>setToggleSettings(!toggleSettings)}>Other Settings { toggleSettings ? <GoChevronDown className='toggle-down-logo'/> :   <GoChevronUp className='toggle-down-logo'/>   }</button>
          <ul id='bottom-list' className={toggleSettings ? 'settings-toggle-list-close' : 'settings-toggle-list'}>
            <li className='account-toggle-item'><a href='/' className='account-toggle-link'>Home</a></li>
            <li className='account-toggle-item'><a href='/contact' className='account-toggle-link'>Contact</a></li>
          </ul>
          <div id='sidemenu-social-media' className='social-media-container'>
  <div onClick={()=>window.open("https://www.facebook.com/")}  className='social-media-icon'><FaFacebookF/></div>
  <div onClick={()=>window.open("https://twitter.com/home?lang=en")}     className='social-media-icon'><FaTwitter/></div>
  <div   onClick={()=>window.open("https://www.whatsapp.com/")}   className='social-media-icon'><FaWhatsapp/></div>
  <div  onClick={()=>window.open("https://www.instagram.com/")}  className='social-media-icon'><FaInstagram/></div>
    <div  onClick={()=>window.open("https://www.linkedin.com/feed/")}   className='social-media-icon'><FaLinkedin/></div>
  </div>
          </div>
 
   
  </div>
  )
}

export default Header