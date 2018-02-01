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
		if(this.props.products && typeof this.props.products !== 'string' ){
			Items = this.props.products.map((e)=>{
				return <Item
				key={e.mass}
				productImage=''
				title={e.name}
				price={e.height}
				productId = {e.mass}
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
	return bindActionCreators({GetProducts}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Store);

