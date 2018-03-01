import React, {Component} from 'react';


class Categories extends Component{
  componentWillMount(){
    this.setState({selected: 0});
  }

  categoryClicked(href, i){
    this.props.setCategory(href, i);
    this.setState({selected: i});
  }
  render(){
    //Create a list of categories which is identical to the sub nav on npr.org/sections/news
    const list = this.props.categories.map((c, i) => (
      <li key={i} className="categories">
        <button className={i === this.state.selected ? "categories selected" : "categories"}
                onClick={() => this.categoryClicked(c.href, i)}>{c.name}</button>
      </li>)
    )
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