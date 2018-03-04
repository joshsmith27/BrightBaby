import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetProducts, AddToCart} from '../../actions/action';
import Loader from '../loading';
import Item from './item/item';
class Store extends Component {
	constructor(){
		super()
		this.state = {
			isLoaded : false,
		}
	}
	componentWillMount(){
		this.props.GetProducts();
	}
	render() {
		let Items = <Loader/>;
		
		var propType = typeof this.props.products;
		if(this.props.products.length > 0 && propType !== 'string' ){
			Items = this.props.products[0].map((e)=>{
				return <Item
				key={e.productid}
				productImage={e.productImages.length > 0 ?e .productImages[0].imagepath : ""}
				title={e.name}
				price={e.price}
				productId = {e.productid}
				product={e}
				AddToCart={this.props.AddToCart}
			></Item>
		});
		
		}else{
			Items = <div>{this.props.products}</div>
		}
		return (
			<div className ="store-main-container">
			<p className="Yellow-Text store-header">STORE</p>
			<div className="store-inner-container">
			{Items}
			</div>
			</div>
			
		);
	}
}
function mapStateToProps({products}){
	return {products};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({GetProducts, AddToCart}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Store);

