import React,{ useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios'
function Routers(props) {
    const[items,setItems] = useState([]);
    function handleBuyNow() {
      const token = localStorage.getItem(ACCESS_TOKEN_NAME);
        axios.get(API_BASE_URL+'/buy-now', { headers: { 'Authorization': "Bearer "+token  }})
        .then(function (response) {
          console.log(response)
            if(response.status !== 200){
              redirectToLogin()
            }
            else{
              props.updateTitle('Success')
              props.history.push('/success');
            }
        })
        .catch(function (error) {
          redirectToLogin()
        });
      
    }

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN_NAME);
        axios.get(API_BASE_URL+'/get-cart-items', { headers: { 'Authorization': "Bearer "+token  }})
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
      })
    function redirectToLogin() {
    props.history.push('/login');
    }
    return(
        <div className="mt-2">
            {
              items.length ==0 &&(
                <div>Please Add new Router in list</div>
              )
            }
            { items.length >0 &&(
            <button className="btn btn-primary" onClick={() => handleBuyNow()}>Buy Now</button>
            )
            }
        </div>
    )
}

export default withRouter(Routers);