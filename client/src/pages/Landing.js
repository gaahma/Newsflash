import React, {Component} from  'react';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import api from '../utils/api';
import "./css/Landing.css";

class Landing extends Component{
  render(){
    return(
      <div /*className="container"*/>
        <div className="banner-wrapper">
          <img src="./assets/images/NPRLogo.png" 
              alt="NPR Logo Banner"
              className="img-responsive"/>
          <div className="newsflash">
            <h1 className="npr-orange">News</h1><h1 className="npr-blue">Flash</h1>
          </div>
        </div>
        <button className="btn btn-primary login"
                onClick={login}>Login</button>

      </div>
    )
  }
}

export default Landing;