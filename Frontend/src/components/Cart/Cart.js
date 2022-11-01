import React, { useContext } from 'react'
import { DataContext } from '../../Context'
import {FaTrashAlt}from 'react-icons/fa';
import Resim22 from '../../img/Resim22.jpg';
import { DeviceUUID } from 'device-uuid';
import './Cart.css'
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const data = useContext(DataContext);
 

const totalDiscount = data.newCart.reduce((prevPrice,currentPrice)=>{
  return currentPrice.discount ? prevPrice+(currentPrice.price*currentPrice.qty)/4 : prevPrice

},0);
const totalPrice = data.newCart.reduce((prevPrice,currentPrice)=>{
  return prevPrice+(currentPrice.price*currentPrice.qty)
},0)

console.log(data.newCart);

let navigate = useNavigate();


  return (
    <>
    <div className='cart-container-web'>
  { data.newCart.length > 0 ? data.newCart.map((prod,index)=>(
 

  <>


  
  <div className='product-cart'>
        <div className='product-cart-section'>
      
          <a className='product-cart-img-link' href={'/product/'+prod.productId}><img src={prod.img} className='product-cart-img' alt='' /></a>
  
  <a className='cart-link' href={'/product/'+prod.productId}>{prod.product}</a>
      </div>
      <div  className='product-cart-section prod-cart-settings'>
        <button onClick={()=>data.increaseQty(prod.id)}>+</button>
        <span>{prod.qty}</span>
        <button onClick={()=>data.decreaseQty(prod.id)}>-</button>
        </div>
        <div className='product-cart-price'> 
     { prod.discount ?     <span>{(prod.price*3/4)*prod.qty}₺</span> : <span>{(prod.price*prod.qty).toFixed(2)}₺</span> }
        </div>
        <div><FaTrashAlt onClick={()=>data.openCartModal(index,'prodCartContainer')}  className='delete-product'/> </div>
        
      </div>
      <div id='prodCartContainer'   className='prod-cart-modal-container'>
          <div className='prod-cart-modal'>
            <p>Are you sure to delete this product ?</p>
            <div className='prod-cart-modal-buttons'>
            <button onClick={()=>data.deleteProduct(prod.id,index,'prodCartContainer')}  className='prod-cart-delete-yes'>Delete</button>
            <button onClick={()=>data.closeCartModal(index,'prodCartContainer')}  className='prod-cart-delete-no'>Cancel</button>
            </div>
            
             </div>
          </div>
       
          
          </>

      
 ))
  :<>
   <h3 id='empty-cart-title'>You don't have  product in your cart</h3>
   <a className='empty-cart-link' href='/categories/'>Lets start adding some !</a>
   <img className='sad-image' src={Resim22} alt='' />
   </>}
   <button onClick={()=>navigate('/paymentform')} style={{"display": data.newCart.length !== 0 ? "block" : "none"}} className='complete-shopping' >Complete Shopping</button>
   <div style={{"display":data.newCart.length === 0 ? "none":"block"}} className='payment-details'>
   <h4>Payment Details</h4> 
   { data.newCart.map((prod)=>(
   <>
            
             <div className='sum-price-container'>
             <div className='sum-price first-row-sum-price'>{prod.product}</div>
             
             <div className='sum-price'>{(prod.qty*prod.price).toFixed(2)}₺</div>
             
             </div>
             
             </> 
   ))
}
<div className='sum-price-container'>
<div className='sum-price first-row-sum-price'>Total discount :</div>
<div className='sum-price'>-{totalDiscount.toFixed(2)}₺</div>
</div>
<hr style={{"marginTop":"50px"}}/>
<div className='sum-price-container'>
             <div className='sum-price first-row-sum-price'>Total price :</div>
             
             <div className='sum-price'>{(totalPrice-totalDiscount).toFixed(2)}₺</div>
             </div>
</div>

  
    </div>
  <div className='cart-container-mobil'>
    {data.newCart.length !== 0 ? 
  data.newCart.map((prod,index)=>(
    <>
    <div className='product-cart'>
    <div className='product-cart-section'>
      
      <a className='product-cart-img-link' href={'/product/'+prod.productId}><img src={prod.img} className='product-cart-img' alt='' /></a>


  </div>
  <div id='productCartSection' className='product-cart-section'>
    <a className='cart-link' href={'/product/'+prod.productId}>{prod.product}</a>
   <span className='product-cart-price'>{(prod.price*prod.qty).toFixed(2)}₺</span>
   <div  className='product-cart-section prod-cart-settings'>
        <button onClick={()=>data.increaseQty(prod.id)}>+</button>
        <span>{prod.qty}</span>
        <button onClick={()=>data.decreaseQty(prod.id)}>-</button>
        </div>
        <div><FaTrashAlt onClick={()=>data.openCartModal(index,'prodCartContainerMobile')}  className='delete-product'/> </div>
        <div id='prodCartContainerMobile'   className='prod-cart-modal-container'>
          <div className='prod-cart-modal'>
            <p>Are you sure to delete this product ?</p>
            <div className='prod-cart-modal-buttons'>
            <button onClick={()=>data.deleteProduct(prod.id,index,'prodCartContainerMobile')}  className='prod-cart-delete-yes'>Delete</button>
            <button onClick={()=>data.closeCartModal(index,'prodCartContainerMobile')}  className='prod-cart-delete-no'>Cancel</button>
            </div>
            
             </div>
          </div>
       
  </div>
  
    </div>
    </>
  )
  
  )  
: <>
<h3 id='empty-cart-title'>You don't have  product in your cart</h3>
<a className='empty-cart-link' href='/categories/'>Lets start adding some !</a>
<img className='sad-image' src={Resim22} alt='' />
</>  }
<button onClick={()=>navigate('/paymentform')} style={{"display": data.newCart.length !== 0 ? "block" : "none","marginLeft":"10px"}} className='complete-shopping' >Complete Shopping</button>
  <div style={{"display":data.newCart.length === 0 ? "none":"block"}} className='payment-details'>
   <h4>Payment Details</h4> 
   { data.newCart.map((prod)=>(
   <>
            
             <div className='sum-price-container'>
             <div className='sum-price first-row-sum-price'>{prod.product}</div>
             
             <div className='sum-price'>{(prod.qty*prod.price).toFixed(2)}₺</div>
             
             </div>
             
             </> 
   ))
}
<div className='sum-price-container'>
<div className='sum-price first-row-sum-price'>Total discount :</div>
<div className='sum-price'>-{(totalDiscount).toFixed(2)}₺</div>
</div>
<hr style={{"marginTop":"50px"}}/>
<div className='sum-price-container'>
             <div className='sum-price first-row-sum-price'>Total price :</div>
             
             <div className='sum-price'>{(totalPrice-totalDiscount).toFixed(2)}₺</div>
             </div>
</div>

  </div>

    </>
  )
}

export default Cart