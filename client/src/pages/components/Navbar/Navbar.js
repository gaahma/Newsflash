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
        right: '0px',
        top: '51px',
        borderLeft: '1px solid #e5e5e5',
        borderBottom: '1px solid #e5e5e5',
        padding: '1rem',
        zIndex: 1,
        opacity: 0.9,
        //transition: '0.25s'
      },
      menuHidden: {
        right: '-500px',
      }
    }
  }

  state = {
    menuEnabled: false
  }

  componentDidMount(){
    window.addEventListener("resize", 
      () => {
        if(window.innerWidth > 767){
          this.setState({menuEnabled: false})
        }
      }
    );
  }

  toggleMobileMenu(){
    if(this.state.menuEnabled){
      this.setState({menuEnabled: false});
    } else {
      this.setState({menuEnabled: true});
    }
  }


  
  render(){
    var MenuItems;
    if(!isLoggedIn()){
      MenuItems = 
        (<ul className="nav navbar-nav navbar-right">
          <li ><a href="#" onClick={login} className="npr-blue"><span className="glyphicon glyphicon-book npr-orange"></span> Tutorial</a></li>
          <li ><a href="#" onClick={login} className="npr-blue"><span className="glyphicon glyphicon-log-in npr-orange"></span> Login</a></li>
        </ul>
        );
    } else {
      MenuItems = 
        (<ul className="nav navbar-nav navbar-right">
          <li ><a href="#" onClick={login} className="npr-blue"><span className="glyphicon glyphicon-book npr-orange"></span> Tutorial</a></li>
          <li ><a href="#" onClick={login} className="npr-blue"><span className="glyphicon glyphicon-paperclip npr-orange"></span> Saved</a></li>
          <li ><a href="#" onClick={login} className="npr-blue"><span className="glyphicon glyphicon-user npr-orange"></span> Stats</a></li>
          <li ><a href="#" onClick={logout} className="npr-blue"><span className="glyphicon glyphicon-log-out npr-orange"></span> Logout</a></li>
        </ul>
        );
    }
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

          {/* There are two menus.  The first collapses when the screen is below 768, and 
              a mobile menu button will appear */}
          <div className="collapse navbar-collapse" >
            {MenuItems}
          </div>
          {/* This second menu is hidden off screen until the mobile menu button is pressed */}
          <div style={Object.assign({}, this.styles.menuVisible, !this.state.menuEnabled && this.styles.menuHidden)}>
            {MenuItems}
          </div>


        </div>
      </nav>
    )
  }
}

export default Navbar;