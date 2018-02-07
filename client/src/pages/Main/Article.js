import React, {Component} from 'react';


class Article extends Component{
  render(){
    return(
      <article className="col-xs-12">
        <div className="row article">
          <div className="col-lg-8 col-sm-6 col-xs-12">
            <h3 className="title center-block">{this.props.title}</h3>
            <p className="center-block">{this.props.description}</p>
          </div>

          <div className="col-lg-4 col-sm-6 col-xs-12">
            <div className="image-wrapper">
              {/* <img src={this.props.img} className="img-responsive article-img"/> */}
              <p className="caption center-block">{this.props.caption}</p>
            </div>
          </div>


        </div>
      </article>
    )
  }
}

export default Article;