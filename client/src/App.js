import React from 'react';
// import ReactDOM from 'react-dom';
import Landing from './pages/Landing';
import Navbar from './pages/components/Navbar/Navbar';
import Callback from './pages/Callback';
import Main from './pages/Main';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import './App.css';
// import { requireAuth } from './utils/AuthService';
//const history = require('./utils/history');  //Maybe not required.... hanging onto this for a bit in case


class App extends React.Component {

  render(){
    return(
      
      <div className="container-fluid" id="wrapper">
        <Navbar/>
        <BrowserRouter>
          <div className="container" id="content">
            <Route path="/" exact component={Landing}/>
            {/* <Route path="/special" component={Dashboard} onEnter={requireAuth} /> */}
            <Route path="/callback" exact component={Callback}/> 
            <Route path="/main" exact component={Main}/> 
          </div>
        </BrowserRouter>

        <footer className="modal-footer" id="footer">Written by Adam Haag <a href="/disclaimer">(Disclaimer)</a></footer>
      </div>
    )
  }
}

export default App;