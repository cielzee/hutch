import React, { Component } from 'react';
import './App.css';

class Thumbnail extends Component {
  swapProduct = () => {
    this.props.swapProduct(this.props.product, this.props.type);
  }
  render() {
    return (
      <div className={this.props.selected ? "product-thumbnail active" : "product-thumbnail"} onClick={this.swapProduct}>
        <div className="product-thumbnail-image" style={{backgroundImage: `url(${this.props.product.url})`}}/>
        <div className="product-text">
          <div className="product-price">
          ${this.props.product.price}
          </div>
          {this.props.selected && <div className="product-details-link">
            View more
          </div>}
        </div>
      </div>
    )
  }
}

export default Thumbnail;
