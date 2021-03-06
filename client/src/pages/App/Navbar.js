import React, {Component} from  'react';
import { login, logout, isLoggedIn } from '../../utils/AuthService';
import history from '../../utils/history';

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
        opacity: 0.95,
        transition: '0.25s'
      },
      menuHidden: {
        right: '-500px',
      }
    }
  }

  state = {
    menuEnabled: false,
  }

  componentDidMount(){
    //if the window size changes to 768 or higher, force close the mobile menu. 
    //it isn't needed at those screen sizes
    window.addEventListener("resize", 
      () => {
        if(window.innerWidth > 767){
          this.setState({menuEnabled: false})
        }
      }
    );
    setInterval(this.setState({loggedIn: isLoggedIn()}), 600000);  //check for login status every 10 minutes
    this.setState({loggedIn: isLoggedIn()});
  }

  menuItemClicked(location){
    history.push(location);
    this.setState({menuEnabled: false});
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
    if(!this.state.loggedIn){
      MenuItems = 
        (<ul className="nav navbar-nav navbar-right">
          <li ><button className="nav-button npr-blue"><span className="glyphicon glyphicon-question-sign npr-orange"></span> About</button></li>
          <li ><button onClick={login} className="nav-button npr-blue"><span className="glyphicon glyphicon-log-in npr-orange"></span> Login</button></li>
        </ul>
        );
    } else {
      MenuItems = 
        (<ul className="nav navbar-nav navbar-right">
          <li ><button onClick={()=> this.menuItemClicked("/main")} className="nav-button npr-blue"><span className="glyphicon glyphicon-th npr-orange"></span> Browse</button></li> 
          <li ><button onClick={() => this.menuItemClicked("/reader")} className="nav-button npr-blue"><span className="glyphicon glyphicon-book npr-orange"></span> Reader</button></li>
          <li ><button onClick={() => this.menuItemClicked("/dashboard")} className="nav-button npr-blue"><span className="glyphicon glyphicon-cog npr-orange"></span> Dashboard</button></li>
          <li ><button onClick={logout} className="nav-button npr-blue"><span className="glyphicon glyphicon-log-out npr-orange"></span> Logout</button></li>
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
            <a className="navbar-brand" href="https://www.npr.org/donations/support">
              <p className="npr-orange">Support</p>
              <p className="npr-blue"> NPR</p>
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