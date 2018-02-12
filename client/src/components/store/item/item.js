import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import {AddToCart} from '../cart/add_to_cart_service'
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
            <h4>{this.props.title}</h4>
            <p className="price">{this.props.price}</p>
          </div>
        </Link>
        <button className="addToCartButton" onClick={() => this.AddToCart(this.props.product, 1)}>Add To Cart</button>
      </div>
    );
  }
}

export default Item;
