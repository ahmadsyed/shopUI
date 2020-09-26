import React from 'react';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiContants';
function Header(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(props.location.pathname.substring(1,props.location.pathname.length))
    if(props.location.pathname === '/') {
        title = 'Welcome'
    }
    function renderLogout() {
        if(props.location.pathname === '/'){
            return(
                <div className="ml-auto">
                    <button className="btn btn-primary" onClick={() => goToCart()}>Cart</button>
                     <button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button> 
                </div>
            )
        }
        if(props.location.pathname === '/cart'){
            return(
                <div className="ml-auto">
                    <button className="btn btn-primary" onClick={() => goToHome()}>Home</button>
                    <button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>
                </div>
            )
        }
        if(props.location.pathname === '/success'){
            return(
                <div className="ml-auto">
                    <button className="btn btn-primary" onClick={() => goToHome()}>Home</button>
                    <button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>
                </div>
            )
        }
        if(props.location.pathname === '/login'){
            return(
                <div className="ml-auto">
                    <button className="btn btn-primary" onClick={() => goToHome()}>Home</button>
                </div>
            )
        }
    }
    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }
    function goToCart() {
        //props.history.push('/cart')
    }
    function goToHome(){
        props.history.push('/')
    }
    return(
        <nav className="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3">{props.title || title}</span>
                {renderLogout()}
            </div>
        </nav>
    )
}
export default withRouter(Header);