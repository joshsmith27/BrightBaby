import React, { Component } from 'react';
import Item from './item/item';
class Store extends Component {
	render() {
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

export default Store;
