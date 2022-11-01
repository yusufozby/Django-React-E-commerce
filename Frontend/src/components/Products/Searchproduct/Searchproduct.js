import React, { useContext, useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import { DataContext } from '../../../Context';
import Pagenotfound from '../../Pagenotfound/Pagenotfound';
const Searchproduct = () => {

    const data= useContext(DataContext);
    const {cat} = useParams();
    console.log(cat);

    const categoryProduct = data.products.filter(cate => cate.category.name.toLowerCase() === cat.toLowerCase() );
   
   




 
   
    return (
    <div id='allproducts' className='latest-products'>
         {
         
            categoryProduct.length !== 0 ?
     categoryProduct.map((prod)=>(
      <div  className='column'>
         <div className='product-card'>
         <a href={ localStorage.getItem("user") !== null ? '/product/'+prod.id : "/login"}>  <img alt='' className='product-img' src={prod.img}/> </a> 
          <div className='product-card-body'>
       <strong className='product-name'>{prod.product}</strong>

           
            <span className='product-desc'> {prod.description}</span>
       {  prod.discount ?  <><span className='product-price-without-discount'>
          {prod.price+"₺"}</span> <span className='product-price'>
            {Number((prod.price*75)/100)+"₺"}</span> </>
               : <span  className='product-price'>{prod.price+"₺"}
               
               </span> 
       }
       <br/>
     

            <a href={localStorage.getItem("user") !== null ? '/product/'+prod.id : "/login"} className='product-btn'>View Product </a>
            </div> 
         </div>
        </div>
      ))
      : <Pagenotfound/>
}
    </div>
  )
}

export default Searchproduct