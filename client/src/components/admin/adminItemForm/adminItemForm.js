import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {Get_Details} from '../../../actions/action';
import FilePicker from './FilePicker';

class AdminItemForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			productQuanity: 1,
			image:this.props.imgBase64,
		};
		this.changeInput = this.changeInput.bind(this);
	}
	changeInput(e, prop){
		e.preventDefault();
		this.setState({
			[prop]: e.target.value
		});
	}
	render() {
		return (
			<div className="details-main-container">
				<div className="detail-flex-container">
					{/* <div className = "detail-image" style={{backgroundImage: 'url(' + this.props.details.productImage + ')'}}></div> */}
					<div className = "detail-image" style={{backgroundImage: `url('${this.state.image}')`}}>
					</div>
					
					<div className = "detail-details">
						{/* <p className="Yellow-Text name">{this.props.details.productName}</p>
						<p className="purple-Text price">{this.props.details.price}</p>
						<p className="normal-Text description">{this.props.details.description}</p> */}
						<input placeholder="Title..." className="input Yellow-Text name" value="Google Home" />
						<input placeholder="Price..." className="input Purple-Text price"value="$1.00"/>
						<textarea placeholder="Description..." className="textarea Normal-Text description" value="Vivamus suscipit tortor eget felis porttitor volutpat. Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit amet."/>
					</div>
				</div>
				<div className = "additional-details-container">
					<p className="Yellow-Text more-information">MORE INFORMATION</p>
					{/* <p className ="Normal-Text">{this.props.details.additionalDetails}</p> */}
					<textarea placeholder="More Information..." className ="textarea Normal-Text More-details-form-textarea" value="Sed porttitor lectus nibh. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Donec sollicitudin molestie malesuada. Nulla porttitor accumsan tincidunt."/>
					
				</div>
				<div className="saveQuanity-container">
					<div className="display-flex">
						<p>Qty:</p>
						<input type="number" className="quanity-input" value={this.state.productQuanity}/>
					</div>
					<FilePicker/>
					<br/>
					<br/>
					<button className="addToCartButton biggerButton" onClick={() => this.addToCart(this.props.productId)}>Save</button>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(AdminItemForm);

