import React,{ useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios'
import './Home.css';
function Home(props) {
    const[items,setItems] = useState([]);
    const[cartItems,setCartItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    function handleAddToCart(item) {
      //console.log('item',item);
      cartItems.push(item);
      //console.log('cart-data',cartItems);
      setCartItems(cartItems);
      const payload={
        "items":cartItems
      }
      const token = localStorage.getItem(ACCESS_TOKEN_NAME);
      axios.post(API_BASE_URL+'/add-to-cart',payload, { headers: { 'Authorization': "Bearer "+token }})
        .then(function (response) {
            if(response.status !== 200){
              console.log(response);
            }
            else{
              alert('1 quntity added successfully');
            }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products?limit=20', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
        .then(function (response) {
          console.log(response)
            if(response.status !== 200){
              redirectToLogin()
            }
            else{
              if(response.data.toString() !== items.toString()){
                setItems(response.data);
              }
            }
        })
        .catch(function (error) {
          redirectToLogin()
        });
        const token = localStorage.getItem(ACCESS_TOKEN_NAME);
        setIsLoggedIn(token?true:false);
      },[isLoggedIn])
    function redirectToLogin() {
      //props.updateTitle('Login')
      props.history.push('/login');
    }
    return(
        <div className="mt-2">
          {
            !isLoggedIn &&(
              <div>
              <p className="loginText">Hello Guest</p> 
              <p className='item-description price'>Please login to add items in cart</p>
              <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
              </div>
            )
          }
            {
              items.map(item=>(
                <div className='item-div' key={item.id}>
                    <img src={item.image} className='item-image'/>
                    <p className='item-description'>{item.title}</p>
                    <p className='item-description price'>{item.price+' $'}</p>
                    <button className="btn btn-primary" disabled={!isLoggedIn} onClick={() => handleAddToCart(item)}>Add To Cart</button>
                </div>
              ))
            }
        </div>
    )
}

export default withRouter(Home);