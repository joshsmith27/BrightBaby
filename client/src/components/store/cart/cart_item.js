import React, { Component } from 'react';
import{UpdateCart, RemoveCart} from '../cart/add_to_cart_service';

class CartItem extends Component {
	constructor(props){
		super(props);
		this.state = {
			EditSaveText: 'Edit',
			EditSaveBool: false,
			productQuanity: this.props.productQuanity
		};
		this.SaveQuanity = this.SaveQuanity.bind(this);
		this.changeInput = this.changeInput.bind(this);
	}

	SaveQuanity(){   
		if(!this.state.EditSaveBool){
			this.setState({
				EditSaveText: 'Save',
				EditSaveBool: true  
			});
			this.refs.quanity.style.display = 'none';
			this.refs.quanityInput.style.display = '';
		}else{
			this.setState({
				EditSaveText: 'Edit',
				EditSaveBool: false  
			});  
			this.refs.quanity.style.display = '';
			this.refs.quanityInput.style.display = 'none';
			this.props.UpdateCartItem(this.props.productId, this.state.productQuanity)
		}
	}
	changeInput(e){
			if(e.target.value > Number(this.props.avaliablequantity)){
				this.setState({
					productQuanity: this.props.avaliablequantity
				});
			}else{
					this.setState({
						productQuanity: e.target.value
					});
				}
	}
	render() {
		const style ={'display':'none'};
		return (
			<div className="cart-item-main-container">
				<p className="Purple-Text product-name-cart">{this.props.productName}</p>
				<div className="image-quanity-container">
					<div className="cart-image" style={{backgroundImage: 'url(' + this.props.productImage + ')'}}/>
					<div className = "quanityText">
						<p className="Text-Normal">Cost <span className="Purple-Text">{`$${Number(this.props.productPrice).toFixed(2)}`}</span></p>
						<div className="display-flex">
							<p>Qty: <span ref="quanity">{this.state.productQuanity}</span></p>
							<input style={style} onChange={this.changeInput} min="1" type="number" className="quanity-input" ref="quanityInput" value={this.state.productQuanity}/>
						</div>

						<p ><span className="Purple-Text hover" onClick={()=>this.SaveQuanity()}>{this.state.EditSaveText} </span> | <span className="hover" onClick={()=>{this.props.RemoveCartItem(this.props.productId, this.state.productQuanity)}}>Remove</span></p>             
					</div>           
				</div>
			</div>
		);
	}
}

export default CartItem;

