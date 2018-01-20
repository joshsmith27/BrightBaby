import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {Get_Details} from '../../../actions/action';

class Details extends Component {
	constructor(props){
		super(props);
		this.state = {
			productQuanity: 1,
		};
		this.changeInput = this.changeInput.bind(this);
	}
	changeInput(e){
		this.setState({
			productQuanity: e.target.value
		});
	}
	
	render() {
		return (
			<div className="details-main-container">
				<div className="detail-flex-container">
					{/* <div className = "detail-image" style={{backgroundImage: 'url(' + this.props.details.productImage + ')'}}></div> */}
					<div className = "detail-image" style={{backgroundImage: 'url(' + 'https://i5.walmartimages.com/asr/0c2179ec-ca15-41ff-bc40-13664c483d41_1.94cf4cd699abaf16947ded5f3b462de2.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF' + ')'}}></div>
					<div className = "detail-details">
						{/* <p className="Yellow-Text name">{this.props.details.productName}</p>
						<p className="purple-Text price">{this.props.details.price}</p>
						<p className="normal-Text description">{this.props.details.description}</p> */}
						<p className="Yellow-Text name">GOOGLE HOME</p>
						<p className="Purple-Text price">$1.00</p>
						<p className="Normal-Text description">Vivamus suscipit tortor eget felis porttitor volutpat. Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit amet.</p>
						<div className="button-quanity-container">
							<button className="addToCartButton biggerButton" onClick={() => this.addToCart(this.props.productId)}>Add To Cart</button>
							<div className="display-flex">
								<p>Qty:</p>
								<input onChange={this.changeInput} type="number" className="quanity-input" value={this.state.productQuanity}/>
							</div>
						</div>
					</div>
				</div>
				<div className = "additional-details-container">
					<p className="Yellow-Text more-information">MORE INFORMATION</p>
					{/* <p className ="Normal-Text">{this.props.details.additionalDetails}</p> */}
					<p className ="Normal-Text">Sed porttitor lectus nibh. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Donec sollicitudin molestie malesuada. Nulla porttitor accumsan tincidunt.</p>

				</div>
			</div>
		);
	}
}
function mapStateToProps({details}){
	return {details};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({Get_Details}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Details);

