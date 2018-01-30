import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetDetails} from '../../../actions/action';
import FilePicker from './FilePicker';

class AdminItemForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			productQuanity: 1,
			title: this.props.title,
			price: this.props.price,
			description:this.props.description,
			moreInfomation: this.props.moreInfomations
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
				<div className="detail-flex-container image-price-container">
				<FilePicker defaultImage ="https://i5.walmartimages.com/asr/0c2179ec-ca15-41ff-bc40-13664c483d41_1.94cf4cd699abaf16947ded5f3b462de2.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF"/>
					
					<div className = "detail-details">
						{/* <p className="Yellow-Text name">{this.props.details.productName}</p>
						<p className="purple-Text price">{this.props.details.price}</p>
						<p className="normal-Text description">{this.props.details.description}</p> */}
						<input placeholder="Title..." className="input Yellow-Text name" value={this.state.title} />
						<br/>
						<input placeholder="Price..." className="input Purple-Text price"value={this.state.price}/>
						<textarea placeholder="Description..." className="textarea Normal-Text description" value={this.state.description}/>
					</div>
				</div>
				<div className = "additional-details-container">
					<p className="Yellow-Text more-information">MORE INFORMATION</p>
					{/* <p className ="Normal-Text">{this.props.details.additionalDetails}</p> */}
					<textarea placeholder="More Information..." className ={this.state.price}/>
					
				</div>
				<div className="saveQuanity-container">
					<div className="display-flex">
						<p>Current Quanity:</p>
						<input type="number" className="quanity-input" value={this.state.productQuanity}/>
					</div>
					
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
	return bindActionCreators({GetDetails}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AdminItemForm);

