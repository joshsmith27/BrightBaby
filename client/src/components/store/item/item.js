import React, { Component } from 'react';
import { Link} from 'react-router-dom';
class Item extends Component {

  addToCart(id){
    this.props.AddToCart(id);
  }
  render() {
    return (
      <div className="item-main-container">
        <Link className="Links" to={`/details/${this.props.productId}`}>
          <div className="ProductImage" style={{backgroundImage: "url(" + this.props.productImage + ")"}}/>
          <div className="item-detail-container">
            <h4>{this.props.title.toUpperCase()}</h4>
            <p className="price">{`$${Number(this.props.price).toFixed(2)}`}</p>
          </div>
        </Link>
        <button className="addToCartButton" onClick={() => this.props.AddToCart(this.props.product, 1)}>Add To Cart</button>
      </div>
    );
  }
}

export default Item;
