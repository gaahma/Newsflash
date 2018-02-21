import React, {Component} from 'react';
import api from '../../utils/api.js';
import history from '../../utils/history.js';
import './Reader.css';

class Reader extends Component{
  componentWillMount(){
    var link = this.props.location.link || localStorage.getItem("link");
    var article = JSON.parse(localStorage.getItem("article"));

    if(link && !article){
      api.getArticle(link)
         .then(res => {this.setState({article:res.data.articleText}); localStorage.setItem("article", JSON.stringify(res.data.articleText))})
         .catch(e => console.log(e));
      localStorage.setItem("link", link);
      this.setState({articleFlash: "", sectionIndex: 0, contentIndex: 0});
    } else {
      this.setState({articleFlash: "", sectionIndex: 0, contentIndex: 0, article: article});
      //history.push("/main");
    }

    this.setState({speed: 1000});
  }
  stop(){
    if(this.state.interval){
      clearInterval(this.state.interval);
    }
    this.setState({articleFlash: ""});
    console.log("stopped");
  }
  readArticle(){

    this.setState({currentContent: this.state.article[this.state.sectionIndex].content})

    var interval = setInterval(() => {
      if(this.state.article[this.state.sectionIndex] && this.state.currentContent[this.state.contentIndex]){
        this.setState({
          articleFlash: this.state.currentContent[this.state.contentIndex],
          contentIndex: this.state.contentIndex + 1
        });
        
      } else if (this.state.article[this.state.sectionIndex + 1]){
        this.setState({
          sectionIndex: this.state.sectionIndex + 1,
          contentIndex: 0,
        }); 
      } else {
        this.stop();
      }

    }, this.state.speed);

    this.setState({interval: interval});
  }

  readArticle2(){
    var interval = setTimeout(() => {
      if(this.state.article[this.state.sectionIndex].content[this.state.contentIndex]){

        this.setState({
          articleFlash: this.state.article[this.state.sectionIndex].content[this.state.contentIndex],
          contentIndex: this.state.contentIndex + 1
        });

      } else if (this.state.article[this.state.sectionIndex + 1]){

        this.setState({
          sectionIndex: this.state.sectionIndex + 1,
          contentIndex: 1,
          articleFlash: this.state.article[this.state.sectionIndex + 1].content[0]
        });

      } else {
        this.stop();
        
      }
      this.readArticle2();
    }, this.state.speed);

    this.setState({interval: interval});
  }
  render(){
    if(!this.state){
      return null;
    }
    return (
      <div className="reader-wrapper">
        <div className="reader-text text-center">{this.state.articleFlash}</div>
        <button onClick={this.readArticle2.bind(this)}>Start</button>
        <button onClick={this.stop.bind(this)}>Stop</button>
      </div>
    )
  }
}

export default Reader;