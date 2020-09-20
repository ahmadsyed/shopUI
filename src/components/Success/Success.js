import React,{ useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiContants';
import axios from 'axios'
function Success(props) {
    return(
        <div className="mt-2">
            Items have been bought successfully, Please Pay cash On delivery
        </div>
    )
}

export default withRouter(Success);