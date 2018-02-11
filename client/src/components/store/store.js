import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetProducts} from '../../actions/action';
import Item from './item/item';
class Store extends Component {

	componentWillMount(){
		this.props.GetProducts();
	}
	render() {
		let Items;
		debugger
		var propType = typeof this.props.products;
		if(this.props.products.length > 0 && propType !== 'string' ){
			Items = this.props.products[0].map((e)=>{
				return <Item
				key={e.productid}
				productImage=''
				title={e.name}
				price={e.price}
				productId = {e.productid}
			></Item>
		});
		
		}else{
			Items = <div>{this.props.products}</div>
		}
		console.log(this.props.products)
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
	return bindActionCreators({GetProducts}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Store);

