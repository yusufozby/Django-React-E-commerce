import React, { useContext } from 'react'
import { DataContext } from '../../../Context'
import './Allproducts.css'

const Allproducts = () => {
    const data = useContext(DataContext);
 console.log(data.loading)
  return (
    <div id='allproducts' className='latest-products'>
  { data.loading ? <span className='loading'>Loading...</span> :         data.products.map((prod)=>(
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
  )
}

export default Allproducts