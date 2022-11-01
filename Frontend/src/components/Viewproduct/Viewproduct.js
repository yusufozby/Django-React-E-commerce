import React, { useContext, useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import { DataContext } from '../../Context';
import Pagenotfound from "../Pagenotfound/Pagenotfound"
import './Viewproduct.css';
const Viewproduct = () => {
    const data = useContext(DataContext);

    const navigate = useNavigate();
    const {id} = useParams();
   

    const productDetails = data.products.filter((prod)=>prod.id === Number(id));
   var selectedProducts = data.products.find((prod) => prod.id === Number(id));
   console.log(selectedProducts)


  
    const relatedProducts = data.products.filter((prod) => {
     if(prod.id === Number(id)){
      return false
     }
     else {
    return  prod.category.name === selectedProducts.category.name
     }
    })
    
  return (

    <>
    
   {   productDetails.map((prod)=>(
        <div className='details'>
        <div className='details-card-img'>
       <img className='product-details-img' src={prod.img} alt='' />
        </div>
        <div className='product-details'>
            <h2>{prod.product}</h2>
            
           <p className='product-description'>{prod.description}</p>

            <small>seller : <span id='seller'>qLink</span></small>
    { prod.discount ? <div className='discount-in-desc-container'><h2 className='discount-in-desc'>{prod.price}₺</h2> <h2 id='product-price'>{(prod.price*3)/4}₺</h2></div>:        <h2 id='product-price'>{prod.price}₺</h2>   }
           <hr/>
          
           <button onClick={()=>data.addToCart(prod.id)} className='add-to-cart'>Add to Cart</button>
           <br/>
           <br/>
          <small><b>Delivery Date :</b> It will arrive within 2 days at most</small>
          <hr/>
          <div className='product-features'>
       <div className=' col-3 mt-15'>
          <small className='product-feature-script'><b>key1 : </b>value1 </small>
       </div>
       <div className=' col-3 mt-15'>
          <small className='product-feature-script'><b>key2 : </b>value2 </small>
       </div>
       <div className=' col-3 mt-15'>
          <small className='product-feature-script'><b>key3 : </b>value3 </small>
       </div>
       <div className=' col-3 mt-15'>
          <small className='product-feature-script'><b>key4 : </b>value4 </small>
       </div>
       <div className=' col-3 mt-15'>
          <small className='product-feature-script'><b>key5 : </b>value5 </small>
       </div>
       <div className=' col-3 mt-15'>
          <small className='product-feature-script'><b>key6 : </b>value6 </small>
       </div>
       </div>
       <hr/>
       
        <small className='product-other-feature'>&#8226; Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
        
       
        <small className='product-other-feature'>&#8226; Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
        
       
        <small className='product-other-feature'>&#8226; Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
       
        

        <small className='product-other-feature'>&#8226; Lorem Ipsum is simply dummy text of the printing and typesetting industry.</small>
        
        </div>
        </div>
        )) 
   }
<h1 className='trends-title'>Related Products</h1>
<div id='relatedItems'  className='latest-products'>

    {  relatedProducts.map((prod)=>(
      <div className='column'>
         <div className='product-card'>
        <a href={'/product/'+prod.id}>  <img className='product-img' alt='' src={prod.img}/> </a>
          <div className='product-card-body'>
       <strong className='product-name'>{prod.product}</strong>

           
            <span className='product-desc'> {prod.description}</span>
       {  prod.discount ?  <><span className='product-price-without-discount'> {prod.price+"₺"}</span> <span className='product-price'>{Number((prod.price*75)/100)+"₺"}</span> </>   : <span  className='product-price'>{prod.price+"₺"}</span>  }
       <br/>
     

            <a href={'/product/'+prod.id} className='product-btn'>View Product </a>
            </div> 
         </div>
        </div>
      ))
    }
</div>
</> 
   
  )
}

export default Viewproduct