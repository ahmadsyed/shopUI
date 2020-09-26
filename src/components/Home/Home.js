import React, {useState} from 'react';
import axios from 'axios';
import '../LoginForm/LoginForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiContants';
import { withRouter } from "react-router-dom";

function Home(props) {
    const [state , setState] = useState({
        sapid : "12:12:34:65-e3:t5:87:54",
        hostname : "192.168.0.1",
        loopback: '192.168.1.1',
        mac_address:'00:1A:C2:7B:00:47',
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const token = localStorage.getItem(ACCESS_TOKEN_NAME);
        const payload={
            "sapid":state.sapid,
            "hostname":state.hostname,
            "loopback":state.loopback,
            "mac_address":state.mac_address,
        }
        axios.post(API_BASE_URL+'/add-router', payload,{ headers: { 'Authorization': "Bearer "+token  }})
            .then(function (response) {
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Router added successfully'
                    }))
                    redirectToRouters();
                    props.showError(null)
                }
                else{
                    props.showError("something went wrong");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToRouters = () => {
        //props.updateTitle('Routers')
        props.history.push('/Routers');
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Sap ID</label>
                <input type="text" 
                       className="form-control" 
                       id="sapid" 
                       placeholder="sap ID" 
                       value={state.sapid}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Host Name</label>
                <input type="text" 
                       className="form-control" 
                       id="host" 
                       placeholder="Host Name"
                       value={state.hostname}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Loopback</label>
                <input type="text" 
                       className="form-control" 
                       id="loopback" 
                       placeholder="Loopback"
                       value={state.loopback}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Mac Address</label>
                <input type="text" 
                       className="form-control" 
                       id="mac" 
                       placeholder="Mac Address"
                       value={state.mac_address}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
        </div>
    )
}

export default withRouter(Home);