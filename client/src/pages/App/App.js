import React from 'react';
// import ReactDOM from 'react-dom';
import Landing from '../Landing/Landing';
import Navbar from './Navbar.js';
import Callback from './Callback';
import Main from '../Main/Main.js';
import { Route, Router, Link } from 'react-router-dom';
import './App.css';
import history from '../../utils/history';
// import { requireAuth } from './utils/AuthService';


class App extends React.Component {

  render(){
    return(
      
      <div className="container-fluid navContainer" id="wrapper">
        <Navbar ref="navbar"/>
        <Router history={history}>
          <div className="container" id="content">
            <Route path="/" exact component={Landing}/>
            {/* <Route path="/special" component={Dashboard} onEnter={requireAuth} /> */}
            <Route path="/callback" exact component={Callback}/> 
            <Route path="/main" exact component={Main}/> 
          </div>
        </Router>

        <footer className="modal-footer" id="footer">Written by Adam Haag <a href="/disclaimer">(Disclaimer)</a></footer>
      </div>
    )
  }
}

export default App;