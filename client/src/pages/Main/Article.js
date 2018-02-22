import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import api from '../../utils/api';
import history from '../../utils/history';


class Article extends Component{
  // onClick={() => api.getArticle(this.props.link).then(res => this.props.setArticle(res.data))}
  render(){
    console.log(this.props);
    return(
      <Link to={{pathname: '/reader', link: this.props.link, details: this.props}}>
      <article className="col-xs-12">
        <div className="row article">
          <div className="col-lg-8 col-sm-6 col-xs-12">
            <h3 className="title center-block">{this.props.title}</h3>
            <p className="center-block">{this.props.description}</p>
          </div>

          <div className="col-lg-4 col-sm-6 col-xs-12">
            <div className="image-wrapper">
              <img src={this.props.img} className="img-responsive article-img"/>
              <p className="caption center-block">{this.props.caption}</p>
            </div>
          </div>
        </div>
      </article>
      </Link>
    )
  }
}

export default Article;