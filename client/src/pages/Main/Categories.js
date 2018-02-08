import React, {Component} from 'react';


class Categories extends Component{

  render(){
    return(
      <ul className="category-list">
        {this.props.categories.map((c, i) => (
          <li key={i} className="categories">
            <button className="categories" 
                    onClick={() => this.props.setCategory(c.href)}>{c.name}</button>
          </li>)
        )}
      </ul>
    )

    
  }
}

export default Categories;