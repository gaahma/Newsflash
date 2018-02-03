import React from 'react';
import api from '../utils/api.js';


class Main extends React.Component{
  componentDidMount(){
    const $this = this;
    api.frontPage().then(res => $this.setState({articles: res.data}));
  }
  render(){
    return <button onClick={() => console.log(this.state)}>hi i'm a button</button>
    
  }
}

export default Main;