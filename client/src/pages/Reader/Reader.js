import React, {Component} from 'react';
import api from '../../utils/api.js';
import history from '../../utils/history.js';
import Mousetrap from 'mousetrap';
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

    this.setState({speed: 250 ,endOfParagraphPause: 1, punctuationPause: 3, wordsPerFlash: 2});
  }

  componentDidMount(){
    //Bind keyboard shortcuts to the component
    Mousetrap.bind(["space", "left", "right", "r"], this.keyEvents.bind(this));
  }

  componentWillUnmount(){
    //unbind when component is going to unmount
    Mousetrap.unbind(["space", "left", "right", "r"], this.keyEvents.bind(this));
  }

  //This function handle the keyboard shortcut functionality
  keyEvents(e){
    console.log(e);
    switch(e.code){
      case "Space": 
        this.toggleReading();
        break;
      case "KeyR": 
        this.resetReader();
        break;
      default: console.log("default");
    }
  }

  toggleReading(){
    if(this.state.isReading){
      this.stop();
      this.setState({isReading: false});
    } else {
      this.setState({isReading: true});
      this.readArticle();
    }
  }

  resetReader(){
    this.stop();
    this.setState({
      isReading: false,
      contentIndex: 0,
      sectionIndex: 0,
    })
  }
  ignoreTitlePunctuation(flash){
    flash.replace(/"/g,"");  //remove any quotation marks. Otherwise, this function would 
                             //fail to catch substings such as "Mrs.
    if(flash === "Mr." ||
       flash === "Mrs."||
       flash === "Ms." ||
       flash === "Dr.") return "";
    return flash;
  }
  containsPunctuation(flash){
    const match = flash.split(" ")
                       .map(this.ignoreTitlePunctuation)
                       .join(" ")
                       .match(".*[.,;:?!].*");
    if (match) return true;
    return false;
  }
  stop(){
    if(this.state.interval){
      clearInterval(this.state.interval);
    }
    this.setState({articleFlash: "", isReading: false});

  }

  readArticle(previousFlashHadPunctuation, previousFlashWasEndOfParagraph){
    let updateState,
        hasPunctuation = false,
        isEndOfParagraph = false,
        speed;

    if(this.state.article[this.state.sectionIndex].content[this.state.contentIndex]){
      updateState = {
        articleFlash: this.state
                          .article[this.state.sectionIndex]
                          .content
                          .slice(this.state.contentIndex, this.state.contentIndex + this.state.wordsPerFlash)
                          .join(" "),
        contentIndex: this.state.contentIndex + this.state.wordsPerFlash
      } 
    } else if (this.state.article[this.state.sectionIndex + 1]){
      if(this.state.endOfParagraphPause !== 1){
        isEndOfParagraph = true;
        updateState = {
            sectionIndex: this.state.sectionIndex + 1,
            contentIndex: 0,
            articleFlash: ""
          }
      } else {
        updateState = {
          sectionIndex: this.state.sectionIndex + 1,
          contentIndex: 1,
          articleFlash: this.state
                            .article[this.state.sectionIndex]
                            .content
                            .slice(this.state.contentIndex, this.state.contentIndex + this.state.wordsPerFlash)
                            .join(" "),
        }   
      }
    } else {
      this.setState({isReading: false});
      updateState = null;
    }

    if(updateState && this.state.punctuationPause !== 1 && this.containsPunctuation(updateState.articleFlash)){
      hasPunctuation = true;
    }

    if(this.state.endOfParagraphPause !== 1 && previousFlashWasEndOfParagraph){
      speed = this.state.speed * this.state.endOfParagraphPause;
    } else if (this.state.punctuationPause !== 1 && previousFlashHadPunctuation){
      speed = this.state.speed * this.state.punctuationPause;
    } else {
      speed = this.state.speed;
    }

    var interval = setTimeout(() => {
      if(updateState){
        this.setState(updateState);
        this.readArticle(hasPunctuation, isEndOfParagraph);
      } else {
        this.resetReader();
      }   
    }, speed);

    this.setState({interval: interval}); 
  }

  render(){
    if(!this.state){
      return null;
    }
    return (
      <div className="reader-wrapper">
        <div className="reader-text text-center">{this.state.articleFlash}</div>
        <button onClick={this.toggleReading.bind(this)}>{this.state.isReading ? "Stop" : "Start"}</button>
      </div>
    )
  }
}

export default Reader;