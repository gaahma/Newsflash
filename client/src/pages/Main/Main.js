import React from 'react';
import api from '../../utils/api.js';
import Article from './Article';
import Categories from './Categories';
import './Main.css';


class Main extends React.Component{
  componentDidMount(){
    //api.frontPage().then(res => this.setState({articles: res.data.articles, categories: res.data.categories}));
    //api.frontPage().then(res => localStorage.setItem("frontPage", JSON.stringify(res.data)));
    this.setState({articles: JSON.parse(localStorage.getItem("frontPage")).articles});
    this.setState({categories: JSON.parse(localStorage.getItem("frontPage")).categories});
  }

  
  render(){
    if(!this.state){
      return null;
    }
    console.log(this.state);
    return (
      <div>
        <Categories categories={this.state.categories}/>
        {this.state.articles.map((a, i) => {
          return <Article title={a.title}
                          description={a.description}
                          img={a.img}
                          caption={a.caption}
                          key={i} />
        })}
      </div>
    )
    
  }
}

export default Main;