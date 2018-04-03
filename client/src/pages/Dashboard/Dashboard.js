import React, {Component} from "react";
import Settings from '../Settings/Settings';
import api from '../../utils/api';
import './Dashboard.css';
class Dashboard extends Component{
  componentDidMount(){
    api.getUser()
       .then(res => {
         this.setState(res.data);
       });
  }

  calcReadingSpeed(){
    return parseInt((60000 / this.state.settings.speed) * this.state.settings.wordsPerFlash);
  }

  render(){
    if(!this.state){
      return null;
    }
    return (
      <div className="dashboard-wrapper">
        <h1 className="text-center">Stats</h1>
        <div className="stat">Logins: {this.state.logins}</div>
        <div className="stat">Articles Read: {this.state.articlesRead}</div>
        <div className="stat">Reading Speed: {this.calcReadingSpeed()} words/min</div>
        
        <h1>Settings</h1>
        <Settings settings={this.state.settings}/>
        
      </div>
    )


  }



}

export default Dashboard;