import React, { Component } from 'react';
import { Link} from 'react-router-dom';
class NewItemForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			EditSaveText: 'Add',
			Edit: false,
			productQuanity: this.props.productQuanity
		};
	}


	
	render() {
		let ItemName = this.props.productName ? <p className="Purple-Text product-name-cart">{this.props.productName}</p> : <p className="Purple-Text product-name-cart">Add A Product</p>
		let EditAdd = !this.state.Edit ? <p></p> : <p ><span className="Purple-Text hover" onClick={()=>this.SaveQuanity()}>Edit</span> | <span className="hover">Remove</span></p>           
		return (
			<div className="admin-item-main-container">
			<Link className = "Links"to={`/adminItemForm/${this.props.productId}`}>			
				{ItemName}
				<div className="image-quanity-container">
					<div className="cart-image" style={{backgroundImage: 'url(' + this.props.productImage + ')'}}/>
					<div className = "quanityText">
						{EditAdd}
					</div>           
				</div>
			</Link>
			</div>
		);
	}
}

export default NewItemForm;

