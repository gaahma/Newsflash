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

    this.setState({speed: 200 ,endOfParagraphPause: 1, punctuationPause: 3, wordsPerFlash: 2});
  }
  ignoreTitlePunctuation(flash){
    flash.replace(/"/g,"");
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
    this.setState({articleFlash: ""});
    console.log("stopped");
  }


  readArticle3(previousFlashHadPunctuation, previousFlashWasEndOfParagraph){
    let updateState,
        hasPunctuation = false,
        isEndOfParagraph = false,
        speed;
    
    if(previousFlashWasEndOfParagraph && this.state.endOfParagraphPause !== 1){
      speed = this.state.speed * this.state.endOfParagraphPause;
    } else if (previousFlashHadPunctuation && this.state.punctuationPause !== 1){
      speed = this.state.speed * this.state.punctuationPause;
    } else {
      speed = this.state.speed;
    }

    if(this.state.article[this.state.sectionIndex].content[this.state.contentIndex]){
      updateState = {
        articleFlash: this.state.article[this.state.sectionIndex].content[this.state.contentIndex],
        contentIndex: this.state.contentIndex + 1
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
          articleFlash: this.state.article[this.state.sectionIndex + 1].content[0]
        }   
      }
    } else {
      updateState = null;
    }

    if(updateState && this.state.punctuationPause !== 1 && this.containsPunctuation(updateState.articleFlash)){
      hasPunctuation = true;
    }
    var interval = setTimeout(() => {
      if(updateState){
        this.setState(updateState);
        this.readArticle3(hasPunctuation, isEndOfParagraph);
      } else {
        this.setState({articleFlash: ""});
      }   
    }, speed);

    this.setState({interval: interval}); 
  }

  readArticle4(previousFlashHadPunctuation, previousFlashWasEndOfParagraph){
    let updateState,
        hasPunctuation = false,
        isEndOfParagraph = false,
        speed;
    
    if(previousFlashWasEndOfParagraph && this.state.endOfParagraphPause !== 1){
      speed = this.state.speed * this.state.endOfParagraphPause;
    } else if (previousFlashHadPunctuation && this.state.punctuationPause !== 1){
      speed = this.state.speed * this.state.punctuationPause;
    } else {
      speed = this.state.speed;
    }

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
      updateState = null;
    }

    if(updateState && this.state.punctuationPause !== 1 && this.containsPunctuation(updateState.articleFlash)){
      hasPunctuation = true;
    }
    var interval = setTimeout(() => {
      if(updateState){
        this.setState(updateState);
        this.readArticle4(hasPunctuation, isEndOfParagraph);
      } else {
        this.setState({articleFlash: ""});
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
        <button onClick={this.readArticle4.bind(this)}>Start</button>
        <button onClick={this.stop.bind(this)}>Stop</button>
      </div>
    )
  }
}

export default Reader;