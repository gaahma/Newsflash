import React, {Component} from 'react';
import api from '../../utils/api.js';
import history from '../../utils/history.js';
import Mousetrap from 'mousetrap';
import ReaderModel from './readerModel';
import './Reader.css';

class Reader extends Component{

  componentWillMount(){
    var link = this.props.location.link || localStorage.getItem("link");
    var article = JSON.parse(localStorage.getItem("article"));

    if(link && !article){
      api.getArticle(link)
         .then(res => {
           console.log(res.data); 
           this.setState({
             article: res.data.sections,
             storyImage: res.data.storyImage,
             storyTitle: res.data.storyTitle
           }); 
           //localStorage.setItem("article", JSON.stringify(res.data.sections))
           
          })
         .catch(e => console.log(e));
      localStorage.setItem("link", link);
      this.setState({articleFlash: "", sectionIndex: 0, contentIndex: 0});
    } else {
      this.setState({articleFlash: "", sectionIndex: 0, contentIndex: 0, article: article});
    }

    this.setState({speed: 400,
                   endOfParagraphPause: 1, 
                   punctuationPause: 1, 
                   wordsPerFlash: 2,
                   contentTypesEnabled: true});

    
    

  }

  componentDidMount(){
    //Bind keyboard shortcuts to the component
    Mousetrap.bind(["space", "left", "right", "r"], this.keyEvents.bind(this));

    

  }

  componentWillUnmount(){
    //unbind when component is going to unmount
    Mousetrap.unbind(["space", "left", "right", "r"], this.keyEvents.bind(this));
  }


  //This function interprets keyboard shortcuts
  //and calls the corresponding functions
  keyEvents(e){
    console.log(e.code);
    switch(e.code){
      case "Space": 
        this.toggleReading();
        break;
      case "KeyR": 
        this.resetReader();
        break;
      case "ArrowLeft":
        this.backOneFlash();
        break;
      default: console.log("default");
    }
  }


  //Start or stop the reader
  toggleReading(){
    this.toggleReader.blur();  //blur the stop/start button.  If the button was clicked to start
                               //the reader, the start/stop keyboard shortcut will be ineffective
                               //because the button has focus.
    if(this.state.isReading){
      this.stop();
      this.setState({isReading: false});
    } else {
      this.setState(
        {
          isReading: true,
          contentType: this.state.article[this.state.sectionIndex].type
        });
      this.readArticle();
    }
  }
  //Reset to the beginning of the article
  resetReader(){
    this.resetReaderBtn.blur(); //Blur reset button, interferes with keyboard shortcuts
                                //if it retains focus after click
    this.stop();                
    this.setState({
      isReading: false,
      contentIndex: 0,
      sectionIndex: 0,
      articleFlash: ""
    })
  }

  //Tests a flash for substrings that include titles.  
  //Otherwise title punctuation would be erroneously flagged
  //as sentence punctuation
  ignoreTitlePunctuation(flash){
    flash.replace(/"/g,"");  //remove any quotation marks. Otherwise, this function would 
                             //fail to catch substings such as '"Mrs.'
    if(flash === "Mr." ||
       flash === "Mrs."||
       flash === "Ms." ||
       flash === "Dr.") return "";
    return flash;
  }
  //Tests the current flash of words for punctuation
  //returns true if present, false otherwise
  containsPunctuation(flash){
    const match = flash.split(" ")
                       .map(this.ignoreTitlePunctuation) //See the function above ^^
                       .join(" ")
                       .match(".*[.,;:?!].*");
    if (match) return true;
    return false;
  }

  //Stops the reader, but maintains user position in the article (not a reset)
  stop(){
    if(this.state.interval){
      clearInterval(this.state.interval);
    }
    if(!(this.state.sectionIndex === 0 && this.state.contentIndex === 0)){
      this.step(-this.state.wordsPerFlash);
    }
    
    this.setState({isReading: false});

  }

  setContentType(section){
    this.setState({contentType: section.type});
  }
  //Recursively read the article
  readArticle(previousFlashHadPunctuation, previousFlashWasEndOfParagraph){
    let updateState,
        hasPunctuation = false,
        isEndOfParagraph = false;
        // speed;
    let {
         article, 
         sectionIndex, 
         contentIndex, 
         wordsPerFlash,
         endOfParagraphPause,
         punctuationPause, 
         speed } = this.state;

    if(article[sectionIndex].content[contentIndex]){
      updateState = {
        articleFlash: article[sectionIndex]
                          .content
                          .slice(contentIndex, contentIndex + wordsPerFlash)
                          .join(" "),
        contentIndex: contentIndex + wordsPerFlash
      } 
    } else if (article[sectionIndex + 1]){
      if(endOfParagraphPause !== 1){
        isEndOfParagraph = true;
        updateState = {
            contentIndex: 0,
            articleFlash: ""
          }
      } else {
        updateState = {
          contentIndex: wordsPerFlash,
          articleFlash: article[sectionIndex + 1]
                            .content
                            .slice(0, wordsPerFlash)
                            .join(" "),
        }
      updateState.sectionIndex = sectionIndex + 1;
      updateState.contentType = article[sectionIndex + 1].type;     
      }
    } else {
      this.setState({isReading: false});
      //insert function that updates articles read to api here
      updateState = null;
    }

    if(updateState && punctuationPause !== 1 && this.containsPunctuation(updateState.articleFlash)){
      hasPunctuation = true;
    }

    if(updateState && endOfParagraphPause !== 1 && previousFlashWasEndOfParagraph){
      speed = speed * endOfParagraphPause;
    } else if (punctuationPause !== 1 && previousFlashHadPunctuation){
      speed = speed * punctuationPause;
    } else {
      speed = speed;
    }
    
    var interval = setTimeout(() => {
      if(updateState){
        console.log(this.state.articleFlash);
        this.setState(updateState);
        this.readArticle(hasPunctuation, isEndOfParagraph);
      } else {
        this.resetReader();
      }   
    }, speed);

    this.setState({interval: interval}); 
  } // end of readArticle function


  step(amt, offset){
    if(offset){
      if(offset === 1){
        this.step(-1);
      } else {
        this.step(offset);
      }
      this.step(amt);
      return;
    }
    
    
    var {sectionIndex, contentIndex, article, wordsPerFlash} = this.state;
    var newContentIndex = amt + contentIndex;
    if((newContentIndex < article[sectionIndex].content.length && newContentIndex >= 0)){
      console.log("if");
      this.setState({
        contentIndex: newContentIndex,
        articleFlash: article[sectionIndex]
                      .content
                      .slice(newContentIndex, newContentIndex + wordsPerFlash)
                      .join(" ") 
      })
    } else {
      if(newContentIndex < 0 && article[sectionIndex -1]){
        console.log("mod");
        const mod = (article[sectionIndex -1].content.length % wordsPerFlash) -1;
        this.setState({
           sectionIndex: sectionIndex -1, 
           contentIndex: article[sectionIndex-1].content.length - 1
          }, () => this.step(amt, -mod));
       
      } else if (newContentIndex > 0 && article[sectionIndex + 1]){
        console.log("else if");
        this.setState({
          sectionIndex: sectionIndex + 1, 
          contentIndex: 0
        }, () => this.step(0));
        //this.step(newContentIndex - contentIndex);
      } else {
        console.log("else");
          this.resetReader();
        
      }
  }
}

  render(){
    if(!this.state){
      return null;
    }
    
    return (
      <div className="reader-wrapper">
        {/* <div className="row">
          
        </div> */}
        <div className="row">
          <div className="col-xs-offset-1 col-xs-10">
            <h1 className="text-center">{this.state.storyTitle}</h1>
            <img className="img-responsive" src={this.state.storyImage} alt="story image"/>
          </div>
        </div>
        <div className="row">
          <div className={"col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6"}>
            <h4 className={"reader-text text-center " + this.state.contentType}>
                {this.state.articleFlash}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="control-panel">
          <ul className="controlPanel">
            <li className="control">
              <button className="controls" 
                      onClick={this.resetReader.bind(this)}
                      ref={resetReaderBtn => {this.resetReaderBtn = resetReaderBtn}}
                      ><span className="glyphicon glyphicon-fast-backward"></span>
              </button>
            </li>

            <li className="control">
              <button className="controls"
                    onClick={() => this.step(-this.state.wordsPerFlash * 5)}
                    ref="backwards"
                    ><span className="glyphicon glyphicon-backward"></span>
              </button>
            </li>

          <li className="control"><button className="controls"
                    ref="stepBackward"
                    onClick={() => this.step(-this.state.wordsPerFlash)}
                    ><span className="glyphicon glyphicon-step-backward"></span>
          </button></li>

          <li className="control"><button onClick={this.toggleReading.bind(this)} 
                    className="controls" 
                    ref={toggleReader => {this.toggleReader = toggleReader}}
                    >
                    <span className={this.state.isReading ? "glyphicon glyphicon-pause" : "glyphicon glyphicon-play"}></span>
            </button></li>



          <li className="control">
            <button className="controls" 
                    onClick={() => this.step(this.state.wordsPerFlash)}
                    ref="forward"
                    ><span className="glyphicon glyphicon-step-forward"></span>
            </button>
          </li>

          <li className="control">
            <button className="controls"
                    onClick={() => this.step(this.state.wordsPerFlash * 5)}
                    ref="fastForward"
                  ><span className="glyphicon glyphicon-forward"></span>
            </button>
          </li>
            <li className="control">
              <button className="controls"
                    ref="fastForward"
                    ><span className="glyphicon glyphicon-fast-forward"></span>
              </button>
            </li>

            </ul>
          </div>
        </div>
      </div>
      
    )
  }
}

export default  Reader;