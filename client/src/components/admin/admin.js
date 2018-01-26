import React, { Component } from 'react';
import NewItemForm from './adminItem';

class Admin extends Component {
  render() {
    return (
      <div className="admin-main-container">
        <p className="Yellow-Text admin-header">Admin</p>
        <p className="Grey-Text admin-subTitle">Choose an item to edit or add a new item.</p>
        <div className="display-flex adminItemContainer">
      <NewItemForm
        productName=""
        productImage=""
        productQuanity="1"
        productId="1"
        />
      <NewItemForm
        productName=""
        productImage=""
        productQuanity="1"
        productId="1"
        />
      <NewItemForm
        productName=""
        productImage=""
        productQuanity="1"
        productId="1"
        />
      <NewItemForm
        productName=""
        productImage=""
        productQuanity="1"
        productId="1"
        />
      <NewItemForm
        productName=""
        productImage=""
        productQuanity="1"
        productId="1"
        />
        </div>

      </div>
    );
  }
}

export default Admin;