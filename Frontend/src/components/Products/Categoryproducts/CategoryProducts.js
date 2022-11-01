import React, { useContext } from 'react'
import { DataContext } from '../../../Context'
import './CategoryProducts.css'
import Resim21 from '../../../img/Resim21.png'
import { useLocation } from 'react-router-dom'
const CategoryProducts = () => {
    const data = useContext(DataContext);
    const location = useLocation();
    const queryparams= new URLSearchParams(location.search);
    const searchedProduct = queryparams.get("search");
    
    const searchedProducts = data.products.filter((item) =>  item.product.toLowerCase().includes(searchedProduct.toLowerCase()));
console.log(searchedProduct);
             
  return (
    <div className='category-products'>
          {(searchedProducts.length  === 0)  ?
            <div className='product-not-found-container'> 
            <h1  className='no-prod-found'>Error-404 No Product Found !!</h1>  
            <img alt='' src={Resim21} className='no-prod-found-img' />
            </div>
   :         null}
           <div  className='latest-products'>
       
     {
searchedProducts.map((prod)=>(
      <div className='column'>
         <div className='product-card'>
         <a href={localStorage.getItem("user") ? '/product/'+prod.id : "/login"}>  <img className='product-img' alt='' src={prod.img}/> </a>
          <div className='product-card-body'>
       <strong className='product-name'>{prod.product}</strong>

           
            <span className='product-desc'> {prod.description}</span>
       {  prod.discount ?  <><span className='product-price-without-discount'> {prod.price+"₺"}</span> <span className='product-price'>{Number((prod.price*75)/100)+"₺"}</span> </>   : <span  className='product-price'>{prod.price+"₺"}</span>  }
       <br/>
     

            <a href={ localStorage.getItem("user") !== null ? '/product/'+prod.id : "/login"} className='product-btn'>View Product </a>
            </div> 
         </div>
        </div>
      ))
}
</div>
    </div>
  )
}

export default CategoryProducts