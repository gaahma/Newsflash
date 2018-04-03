import React, {Component} from 'react';
import api from '../../utils/api';

class Settings extends Component {
  constructor(){
    super();

  }
  componentDidMount(){
    if(this.props.settings){
      this.setState(this.props.settings);
      this.setState({speedInput: this.props.settings.speed});
    }
  }

  generatePauseOptions(){
    var key = 1;
    var result = [<option key={0} value={1}>None</option>];
    for(var i = 1.25; i < 5.25; i += 0.25){
      result.push(<option key={key} value={i}>{i}</option>);
      key++;
    }
    return result;
  }

  validateSpeed(){
    var newSpeed = parseInt(this.state.speedInput);
    if(newSpeed !== NaN && newSpeed >= 50 && newSpeed <= 3000){
      this.setState({speed: newSpeed});
      return true;
    } else {
      this.setState({speedInput: this.state.speed});
      return false;
    }
  }


  handleChange(e){
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  render(){
    if(!this.state){
      return null;
    }
    return (
      
      <div className="settings-wrapper">
      <p>Content Types </p>
        <select value={this.state.contentTypesEnabled}
                className="setting"
                onChange={this.handleChange.bind(this)}
                name="contentTypesEnabled">
          <option value={true}>Enabled</option>
          <option value={false}>Disabled</option>
        </select>
        <br/>  
        <p>Words per Flash </p>
        <select value={this.state.wordsPerFlash}
                onChange={this.handleChange.bind(this)}
                className="setting"
                name="wordsPerFlash">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <br/>
        <p>End of Paragraph Pause </p>
        <select value={this.state.endOfParagraphPause}
                className="setting"
                onChange={this.handleChange.bind(this)}
                name="endOfParagraphPause">
          {this.generatePauseOptions()}
        </select>
        <br/>
        <p>Punctuation Pause </p>
        <select value={this.state.punctuationPause}
                className="setting"
                onChange={this.handleChange.bind(this)}
                name="punctuationPause">
          {this.generatePauseOptions()}
        </select>
        <br/>

        <p>Flash rate (50 - 2000 milliseconds) </p>
        <input value={this.state.speedInput}
               className="setting"
               name="speedInput"
               onChange={this.handleChange.bind(this)}
               onBlur={this.validateSpeed.bind(this)}
               />
        <br/>

        <button className="save"
          onClick={() => {
            if(this.validateSpeed()){
              console.log("submit to server");
              api.updateSettings(this.state).then(() => window.location.href = "/dashboard");
            }
        }}>Save</button>


      </div>

    )
  }
}

export default Settings;