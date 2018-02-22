import React, {Component} from 'react';


class Categories extends Component{

  render(){
    //Create a list of categories which is identical to the sub nav on npr.org/sections/news
    const list = this.props.categories.map((c, i) => (
      <li key={i+1} className="categories">
        <button className="categories" 
                onClick={() => this.props.setCategory(c.href)}>{c.name}</button>
      </li>)
    )
    //Adding a category "Front Page" so users can return to the original /sections/news page
    list.unshift(
      (<li key={0} className="categories">
        <button className="categories" 
                onClick={() => this.props.setCategory('/sections/news')}>Front Page</button>
      </li>))
    return(
      <div className="category-wrapper">
        <ul className="category-list">
          {list}
        </ul>
        <div className="gradient"></div>
      </div>
    )

    
  }
}

export default Categories;