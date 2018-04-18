import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../Redux/actions/action';
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
	handleAddToCart(product){
		this.props.AddToCart(product, 1)
		this.props.Alert({show:true, alertText:`${product.name} Has Been Added To Cart`})
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
				AddToCart={()=>{this.handleAddToCart(e)}}
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
  
export default connect(state => state, Actions)(Store);

