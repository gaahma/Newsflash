import React, {Component} from 'react';

class Categories extends Component{

  render(){
    return(
      <ul className="center-block">
        {this.props.categories.map((c, i) => <li key={i} className="categories">{c.name}</li>)}
      </ul>
    )

    
  }
}

export default Categories;