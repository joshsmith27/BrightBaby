import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetProducts} from '../../actions/action';
import Item from './item/item';
class Store extends Component {

	componentDidMount(){
		this.props.GetProducts();
	}
	render() {
		console.log('hello', this.props.products)
			const Items = this.props.products.map((e)=>{
				<Item
				key={e.ProductId}
				productImage={e.ProductImage}
				title={e.PropductTitle}
				price={e.ProductPrice}
				productId = {e.ProductId}
			></Item>
		});

		
		return (
			<div className ="store-main-container">
			<p className="Yellow-Text store-header">STORE</p>
			<div className="store-inner-container">
				<Item
					productImage="https://i5.walmartimages.com/asr/0c2179ec-ca15-41ff-bc40-13664c483d41_1.94cf4cd699abaf16947ded5f3b462de2.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF"
					title="Product Name"
					price="Price"
					productId = "2"
				></Item>
        		<Item
					productImage="https://i5.walmartimages.com/asr/0c2179ec-ca15-41ff-bc40-13664c483d41_1.94cf4cd699abaf16947ded5f3b462de2.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF"
					title="Product Name"
					price="Price"
					productId = "2"
				></Item>
				<Item
					productImage="https://i5.walmartimages.com/asr/0c2179ec-ca15-41ff-bc40-13664c483d41_1.94cf4cd699abaf16947ded5f3b462de2.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF"
					title="Product Name"
					price="Price"
					productId = "2"
				></Item>
				<Item
					productImage="https://i5.walmartimages.com/asr/0c2179ec-ca15-41ff-bc40-13664c483d41_1.94cf4cd699abaf16947ded5f3b462de2.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF"
					title="Product Name"
					price="Price"
					productId = "2"
				></Item>
        
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

