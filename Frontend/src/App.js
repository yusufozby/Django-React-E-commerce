import './App.css';
import Header from './components/header/Header';
import { DataContext } from './Context';
import { useEffect, useState } from 'react';
import Slides from './components/slides/Slides';
import Content from './components/content/Content';
import axios from 'axios';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router,Routes,Route, resolvePath } from 'react-router-dom';
import Allproducts from './components/Products/Allproducts/Allproducts';
import Searchproduct from './components/Products/Searchproduct/Searchproduct';
import CategoryProducts from './components/Products/Categoryproducts/CategoryProducts';
import Viewproduct from './components/Viewproduct/Viewproduct';
import Cart from './components/Cart/Cart';

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Contact from './components/Contact/Contact';
import Pagenotfound from './components/Pagenotfound/Pagenotfound';
import Announcements from './components/Annoucements/Announcements';

import Paymentform from './components/Payment/PaymentForm/Paymentform';





const App =  () => {
const [cart,setCart] = useState([]);
const [sidemenu,setSidemenu] = useState(false);
const [category,setCategory] = useState(false);
const [prodNumber,setProdNumber] = useState(0);
const [fileUrl,setFileUrl] = useState('');
const [validImg,setValidImg] = useState('');
const [latestProducts,setLatestProducts] = useState([]);
const [comments,SetComments] = useState([]);
const [comment,setcomment] = useState('');
const [sender,setsender] = useState('');
const [message,setMessage] = useState('');
const [senderMail,setsenderMail] = useState('');
const [products,setProducts] = useState([]);
const [date,setdate] = useState('');
const [verifyComIcon,setVerifyComIcon] = useState(false);
const [search,setSearch] = useState('');
const [searchProducts,setSearchProducts] = useState([]);
const [loading,setLoading] = useState(false);
const [users,setUsers] = useState([]);

const getProducts = async () => {

  await axios.get("http://localhost:8000/api/getproducts/?latest=true").then((res)=>setLatestProducts(res.data.filter(product => product.latest )))

}
const getComments = async () => {
 
  await axios.get("http://localhost:8000/api/getcomments/").then((res)=>SetComments(res.data))
 
}

const getAllProducts = async () => {
  
  setLoading(true);
  await axios.get("http://localhost:8000/api/getproducts/").then(res=>{
    setProducts(res.data);
    console.log(res.data);
  })
  setLoading(false)
}
 const getCart = async () => {
var newCart=[];
const loggedUser = JSON.parse(localStorage.getItem("user"))
   await axios.get("http://localhost:8000/api/getcart/").then((res) => 
   setCart(res.data)
   );
 



 }
var newCart=[]
 cart.forEach(element => {
  if(localStorage.getItem("user") !== null){
  if(element.account.user.email ===JSON.parse(localStorage.getItem("user")).user.email ) {
             newCart.push(element);        
  }
  }
 }
 )
 console.log(newCart);



const getUsers = async () => {
  await axios.get("http://localhost:8000/api/allusers/").then((res)=>{
    setUsers(res.data);
    console.log(res.data)
  })
} 
useEffect(()=>{
getUsers();
},[])


const addToCart = async (id) => {
  if(localStorage.getItem("user") === null) {
    window.location.href = "/"
  }
  else {
  var AlreadyHaveProd = newCart.every((element)=> element.productId !== id);
  var selectedProduct = products.find((element) => element.id === id);
  var loggedAccount = users.find((activeUser) =>JSON.parse(localStorage.getItem("user")).user.email === activeUser.user.email);
   console.log(loggedAccount)
  
  setProdNumber(cart.length)
  var prodInCart = {
    id:selectedProduct.id,
  product:selectedProduct.product,
    price:selectedProduct.price,
    img:selectedProduct.img,
    qty:1,
  
    discount:selectedProduct.discount,
    account:loggedAccount,

  }
  if(AlreadyHaveProd) {
    await axios.post("http://localhost:8000/api/addcart/",prodInCart).then(() =>getCart() );
    
  }
  else {
    const updatedCart = newCart.map((element) => {
      if(element.productId === id){
        element.qty += 1
      }
      return element
    })
    setCart(updatedCart);
    var chosenProduct = newCart.find((element) => element.productId === id);
  
    await axios.put("http://localhost:8000/api/updatecart/"+chosenProduct.id,chosenProduct).then(()=>getCart())
  }
}
  }



const increaseQty = async (id) => {
  const updatedCart= newCart.map((element) => {
    if(element.id === id){
      element.qty += 1
    }
    return element
  })
  setCart(updatedCart);
  var slctProduct = newCart.find((element) => element.id === id);

  await axios.put("http://localhost:8000/api/updatecart/"+slctProduct.id,slctProduct).then(()=>getCart())
}
const decreaseQty = async (id) => {
  const updatedCart = newCart.map((element) => {
    if(element.id === id && element.qty > 1){
      element.qty -= 1
    }
    return element
  })
  setCart(updatedCart);
  var slctProduct = cart.find((element) => element.id === id);

  await axios.put("http://localhost:8000/api/updatecart/"+slctProduct.id,slctProduct).then(()=>getCart())
}


const openCartModal = (closeId,modalId) => {
  var cartModals = document.querySelectorAll("#"+modalId);
  cartModals.forEach((element,index)=>{
if(index === closeId){
  element.className = "prod-cart-modal-container prod-cart-container-open"
}
  }) 
 
}
const closeCartModal = (closeId,modalId) => {
  var cartModals = document.querySelectorAll("#"+modalId);
  cartModals.forEach((element,index)=>{
if(index === closeId){
  element.className = "prod-cart-modal-container"
}
  }) 
}

const deleteProduct = (id,closeId,modalId) =>{
  closeCartModal(closeId,modalId);
  setTimeout(async ()=>{
    await axios.delete("http://localhost:8000/api/deletecart/"+id).then(()=>getCart());
  },500)
  
  
}





const addComment = async () => {
  let time = new Date()
   
var emailValidation = /^([a-zA-Z0-9_.]+)[a-zA-Z0-9]@([a-zA-Z0-9]+).([a-zA-Z0-9.]+)$/
if(!emailValidation.test(senderMail)){
 



setVerifyComIcon(false);

document.querySelector(".message").id = "err-msg";
  
setMessage('Invalid email. Please enter valid email')




}
else if(comment === '' || senderMail === '' || sender === ''){
  setMessage('All sections must be filled out !!');
  document.querySelector(".message").id = "err-msg";
 

  setVerifyComIcon(false);

}
else {
  var addedComment = {
    comment,
    
    sender,
    senderMail,
  
    date: time.getUTCDate()+' / '+(time.getUTCMonth()+1)+' / ' +time.getFullYear()
    
  }
  await axios.post("http://localhost:8000/api/addcomment/",addedComment).then(res=>{
  console.log(res.data);  
  getComments();
  });
setcomment('');
setsenderMail('');
setsender('');
setMessage('Comment added successfully !!');
setVerifyComIcon(true);
document.getElementById('name-placeholder').className = "";
document.getElementById('email-placeholdeer').className = "";
document.querySelector(".message").id = "";



}

document.querySelector(".message").style.display = "block";
setTimeout(()=>{
  document.querySelector(".message").style.display = "none";
},3000)
  

}

useEffect(()=>{
  getProducts();
  
  },[])
  useEffect(()=>{
    getAllProducts();
    
    },[])
  useEffect(()=>{
    getComments();
    },[])
   
    useEffect(()=>{
      getCart();
      },[])
  


const activatedInput = (inputId,spanId) => {
  document.getElementById(inputId).className = "comment-input activated-input";
  document.getElementById(spanId).className = "activated-placeholder";
  document.getElementById(spanId).style.color = "#3f00ff";
}
const passivedInput = (inputId,spanId) => {
 
 var input = document.getElementById(inputId)
  input.className = "comment-input";

  if(input.value.length === 0) {
    document.getElementById(spanId).className = "";
    
  }
  document.getElementById(spanId).style.color = "#555";
}


const uploadFile = (e) => {
var file = e.target.files[0];
setValidImg(file.type)


  console.log(validImg)
var reader = new FileReader();
reader.readAsDataURL(file);

reader.onload = (e) => {
var fileURL = e.target.result

setFileUrl(fileURL);
}
}
const uploadImg = (e) => {
  e.preventDefault();
  document.querySelector("#uploadImg").click();


}


let validExtensions = ['image/jpg','image/png','image/jpeg'];
if(validExtensions.includes(validImg)) {


  document.querySelector(".comment-img").style.zIndex="1"
 
  document.querySelector(".comment-img").style.display="block"
   document.querySelector(".delete-img-btn").style.zIndex="2";
   }

  

 
const deleteImg = () => {
  document.querySelector(".comment-img").style.zIndex="-1"
  document.querySelector(".comment-img").style.display="none"
  document.querySelector(".delete-img-btn").style.zIndex="-1";
  setFileUrl('');
  setValidImg('');
}

 
const commentForm = (e) => {
  e.preventDefault();
}

 return (
<DataContext.Provider value={
  {
    prodNumber,
  sidemenu,
  setSidemenu,
  uploadImg,
  category,
  setCategory,
  activatedInput,
  passivedInput,
  uploadFile,
  fileUrl,
  deleteImg,
  commentForm,
  latestProducts,
  comments,
  sender,
   comment,
  SetComments,
  verifyComIcon,
  setVerifyComIcon,
  setsender,
  setcomment,
  senderMail,
  setsenderMail,
  addComment,
  date,
  setdate,
  message,
  setMessage,
  products,
  setSearch,
  search,
  setSearchProducts,
  searchProducts,
  cart,
  setCart,
  addToCart,
  increaseQty,
  decreaseQty,
  deleteProduct,
  closeCartModal,
  openCartModal,
  loading,
  users,
  newCart
}}>
  <Router>
<div className='App' >

      <Header/>
      <Routes>
        <Route element={
        <>
        <Slides/>
        <Content/>
        </>
        } path='/' />
       <Route element={<Allproducts/>} path='/categories'/>
       <Route element={<Searchproduct/>} path='/category/:cat' />
<Route element={<CategoryProducts/>} path='/searchproduct' />
<Route element={<Viewproduct/>} path='/product/:id' />
<Route element={<Cart/>} path='/cart'/>
<Route element={<Login/>} path='/login' />
<Route element={<Register/>} path='/register' />          
<Route element={<Contact/>} path='/contact' />
<Route element={<Announcements/>} path='/announcements' />
<Route element={<Pagenotfound/>} path="*" />
<Route element={<Paymentform/>} path='/paymentform' />
</Routes>
<Footer/>

</div>
</Router>
</DataContext.Provider>
  );
}

export default App;
