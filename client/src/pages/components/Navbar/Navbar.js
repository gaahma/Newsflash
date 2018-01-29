import React, {Component} from  'react';
import './Navbar.css';

class Navbar extends Component {

  render(){
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <p className="npr-orange">News</p>
              <p className="npr-blue">Flash</p>
              </a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li ><a href="#" className="npr-blue"><span className="glyphicon glyphicon-log-in npr-orange"></span> Login</a></li>
            {/* <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li> */}
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;