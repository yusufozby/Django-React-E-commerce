import React, { useContext } from 'react'
import resim7 from '../../img/Resim7.jpg'
import resim9 from '../../img/Resim9.png'
import resim8 from '../../img/Resim8.png'
import resim10 from '../../img/Resim10.png'
import resim17 from '../../img/Resim17.png'

import './Content.css'
import { DataContext } from '../../Context';

const Content = () => {
   const data = useContext(DataContext);


  return (
    <div>
    <div className='discounted-prod'   >

<div className='discounted-prod-content'>
    <h1>50% off</h1>
    <h2>Don't miss out this oppurtunity</h2>
    <button className='buy-discounted-product'>Buy now</button>

</div>

    </div>

    <div className='content-container'>
   
  
       <div className='col-content-1'>
       <div className='service-card'>
        <img className='service-img' alt='' src={resim7} />
        <div className='service-card-body'><div className='service-text' id='text-1'>
          7 / 24 support
          </div></div>
       </div>
       </div>
       <div className='col-content-1'>
       <div className='service-card'>
       <img className='service-img' alt='' src={resim8} />
       <div className='service-card-body'>
       <div className='service-text' id='text-2'>
         Happy Selling
          </div>
          </div>
       </div>
       </div>
       <div className='col-content-1'>
       <div className='service-card'>
       <img className='service-img' alt='' src={resim9} />
       <div className='service-card-body'>
       <div className='service-text' id='text-3'>
       Promotions
          </div>
          </div>
       </div>
       </div>
       <div className='col-content-1'>
       <div className='service-card'>
       <img className='service-img' alt='' src={resim10} />
       <div className='service-card-body'>
       <div className='service-text' id='text-4'>
       Save Money
          </div>
          </div>
       </div>
       </div>
    
    
    </div>
    <div className='trends'>
    <h1 className='trends-title'>Our trends</h1>
    <h2 className='trends-desc'>Summer campaigns & developments</h2>
    <div className='trends-container'>
      <div className='trends-col-2'>
         <div className='trends-img' id='trendImg'>
<div className='trends-content'>
  <h3>Crazy Campaign</h3>
  <h1>Buy one get two</h1>
  <button className='trends-img-btn'>Learn more</button>

</div>
         </div>
      </div>
      <div className='trends-col-2'>
         <div className='trends-img' id='trendImg2'>
         <div className='trends-content'>
         <h3>Spring / Summer</h3>
  <h2>upcoming season</h2>
  <p>Best accessories are on sale here.</p>
  <button className='trends-img-btn'>Learn more</button>
  </div>

         </div>
      </div>
      <div className='trends-col-1'>
         <div className='trends-img' id='trendImg3'>
         <div className='trends-content'>
      
  <h1>Seasonal sales</h1>
  <span>Summer Campaigns</span>
  
  </div>

         </div>
      </div>
      <div className='trends-col-1'>
         <div className='trends-img' id='trendImg4'>
         <div className='trends-content'>
      
  <h3>Household appliances</h3>
  <span>All brands are here</span>
  
  </div>

         </div>
      </div>
      <div className='trends-col-1'>
         <div className='trends-img' id='trendImg5'>
         <div className='trends-content'>
      
  <h2>T-shirts</h2>
  <span>New Trendy prints</span>
  
  </div>

         </div>
      </div>

    <div>
    <h1 id='latest-products-title' className='trends-title'>Latest Products</h1>
    <h2 className='trends-desc'>Products that came out in this summer are on sale </h2>
    </div>


    </div>
     <div className='latest-products'>
    {
      data.latestProducts.map((prod)=>(
      <div key={prod.id} className='column'>
         <div className='product-card'>
         <a href={ localStorage.getItem("user") !== null ?'/product/'+prod.id : "/login"}>  <img className='product-img' alt='' src={'http://localhost:8000/'+prod.img}/> </a>
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
<div className='announcements-section '>
 
   <div>
   <h2>Announcements</h2>
   <p>
   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
   </p>
  
   <a href='/announcements' className='announces-btn'>Announces</a>

   </div>
   
   </div>
   <div className='comments-section'>
   <hr className='divider'/>
   <h1 className='comments-title'>Comments</h1>
   { data.comments.map((com) => (
   <div key={com.id} className='comment-card'>
      <div className='comment-header'>
        
         <span>{com.sender}</span>
      </div>
      <div className='comment-body-section'>
      <p>{com.comment}</p>

 
       <span>{com.date}</span>
   
      </div>
    
   </div>
   ))
   }
   </div>
   </div>
   
    </div>
  )
}

export default Content