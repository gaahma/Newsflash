import React from 'react';
import api from '../../utils/api.js';
import Article from './Article';
import Categories from './Categories';
import {logout} from '../../utils/AuthService.js';
import './Main.css';


class Main extends React.Component{
  componentDidMount(){
    api.frontPage()
       .then(res => this.setState({articles: res.data.articles, categories: res.data.categories}))
       .catch(e => logout());
    // api.getUser();

    
    //api.frontPage().then(res => localStorage.setItem("frontPage", JSON.stringify(res.data)));
    //this.setState({articles: JSON.parse(localStorage.getItem("frontPage")).articles});
    //this.setState({categories: JSON.parse(localStorage.getItem("frontPage")).categories});
  }

  setCategory(category){
    api.categoryPage(category).then(res => this.setState({articles: res.data}));
  }

  render(){
    if(!this.state){
      return null;
    }
    return (
      <div>
        <Categories categories={this.state.categories} setCategory={this.setCategory.bind(this)}/>
        {this.state.articles.map((a, i) => {
          return <Article title={a.title}
                          description={a.description}
                          img={a.img}
                          caption={a.caption}
                          link={a.link}
                          key={i} />
        })}
      </div>
    )
    
  }
}

export default Main;