import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetProducts, AddToCart} from '../../Redux/actions/action';
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
		this.props.GetProducts()
		.then(()=>{
			this.setState({
				isLoaded: true,
			});
		})
	}
	render() {
		let Items = [];
		var propType = typeof this.props.products;
		if(this.props.products.length > 0 && propType !== 'string' ){
			Items = this.props.products[0].map((e)=>{
				let defaultimage = defaultimage = e.productImages.filter((image)=>{
						if(image.is_default){
							return image
						}
						
					})[0]
				return <Item
				key={e.productid}
				productImage={e.productImages.length > 0 ? `/uploads/${defaultimage.imagepath}` : ""}
				title={e.name}
				price={e.price}
				productId = {e.productid}
				product={e}
				AddToCart={this.props.AddToCart}
			></Item>
		});
		
		}
		if (this.state.isLoaded){
			return (
				<div className ="store-main-container">
				<p className="Yellow-Text store-header">STORE</p>
				<div className="store-inner-container">
				{Items}
				</div>
				</div>
			);
		}else {
			return(
				
				<Loader/>
			);
		}
	}
}
function mapStateToProps({products}){
	return {products};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({GetProducts, AddToCart}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Store);

