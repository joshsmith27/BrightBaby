import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetProducts} from '../../actions/action';
import NewItemForm from './adminItem';
import { Link } from 'react-router-dom';
import DefaultImage from '../../addImage2.png';

class Admin extends Component {
	componentWillMount(){
		this.props.GetProducts();
	}

  render() {
    let NewItemForms;

// 		if(this.props.products[0] && typeof this.props.products !== 'string' ){
// 			NewItemForms = this.props.products[0].map((e)=>{
// debugger
// 				return (
//             <NewItemForm
//             productName={e.productName}
//             productImage={e.productImage}
//             productQuanity={e.productQuanity}
//             productId = {e.productId}
//             />
//       )
//     });
    var propType = typeof this.props.products;
		if(this.props.products.length > 0 && propType !== 'string' ){
			NewItemForms = this.props.products[0].map((e)=>{
				return <NewItemForm
				key={e.productid}
				productImage={e.productImages.length > 0 ?e .productImages[0].imagepath : ""}
				productName={e.name}
				productQuanity={e.productQuanity}
				productId = {e.productid}
			></NewItemForm>
		});
		NewItemForms.push(
      <NewItemForm
      key={0}
        productName="Add A New Item"
        productImage= {DefaultImage}
        productQuanity= "0"
        productId = "0"
        />
    )
		}else{
			NewItemForms = [<div key={0}>{this.props.products}</div>]
      NewItemForms.push(
          <NewItemForm
            key={"Add New Item"}
            productName="Add New Item"
            productImage= {DefaultImage}
            productQuanity= "0"
            productId = "0"
            />
      )
		}
    return (
      <div className="admin-main-container">
        <p className="Yellow-Text admin-header">Admin</p>
        <p className="Grey-Text admin-subTitle">Choose an item to edit or add a new item.</p>
        <div className="display-flex adminItemContainer">
        {NewItemForms}
        </div>
      </div>
    );
  }
}

function mapStateToProps({products}){
	return {products};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({GetProducts}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Admin)