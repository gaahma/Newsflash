import React, {Component} from  'react';
import { login, logout, isLoggedIn } from '../../../utils/AuthService';
import './Navbar.css';

class Navbar extends Component {

  constructor(){
    super();
    
    this.styles = {
      menuVisible: {
        backgroundColor: "#222",
        position: 'absolute',
        //  height: '100px',
        //  width: '100px',
        right: '0px',
        top: '51px',
        borderLeft: '1px solid #e5e5e5',
        borderBottom: '1px solid #e5e5e5',
        padding: '1rem',
        zIndex: 1,
        opacity: 0.9,
        transition: '0.5s'
      },
      menuHidden: {
        right: '-300px',
      }
    }
  }

  state = {
    menuEnabled: false
  }

  componentDidMount(){
    window.addEventListener("resize", () => this.setState({menuEnabled: false}));
  }

  toggleMobileMenu(){
    if(this.state.menuEnabled){
      this.setState({menuEnabled: false});
    } else {
      this.setState({menuEnabled: true});
    }
  }


  
  render(){
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" 
                    className="navbar-toggle" 
                    onClick={this.toggleMobileMenu.bind(this)}>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span> 
            </button>
            <a className="navbar-brand" href="/">
              <p className="npr-orange">News</p>
              <p className="npr-blue">Flash</p>
              </a>
          </div>


          <div className="collapse navbar-collapse" >
            <ul className="nav navbar-nav navbar-right">
              <li ><a href="#" onClick={login} className="npr-blue"><span className="glyphicon glyphicon-log-in npr-orange"></span> Login</a></li>
              {/* <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li> */}
            </ul>
          </div>

          <div style={Object.assign({}, this.styles.menuVisible, !this.state.menuEnabled && this.styles.menuHidden)}>
            <ul className="nav navbar-nav navbar-right">
              <li ><a href="#" onClick={login} className="npr-blue menu-item"><span className="glyphicon glyphicon-log-in npr-orange"></span> Dashboard</a></li>
              <li ><a href="#" onClick={login} className="npr-blue menu-item"><span className="glyphicon glyphicon-log-in npr-orange"></span> Login</a></li>
              {/* <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li> */}
            </ul>
          </div>


        </div>
      </nav>
    )
  }
}

export default Navbar;