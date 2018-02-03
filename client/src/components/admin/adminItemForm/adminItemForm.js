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
			title: this.props.details.title,
			price: this.props.details.price,
			description:this.props.details.description,
			moreInfomation: this.props.details.moreInfomations,
			productImage: this.props.details.ProductImage
		};
		this.changeInput = this.changeInput.bind(this);
		this.saveImage = this.saveImage.bind(this)
	}
	changeInput(e, prop){
		e.preventDefault();
		this.setState({
			[prop]: e.target.value
		});
	}

	saveImage(base64){
		debugger
		this.setState({
			productImage:base64
		})
	}

	componentWillMount(){
		const id = this.props.match.params.id;
		this.props.GetDetails(id);
	}

	render() {
		debugger
		return (
			<div className="details-main-container">
				<div className="detail-flex-container image-price-container">
				<FilePicker defaultImage={this.state.productImage} saveImage={this.saveImage}/>
					
					<div className = "detail-details">
						<input placeholder="Title..." className="input Yellow-Text name" value={this.state.title} />
						<br/>
						<input placeholder="Price..." className="input Purple-Text price"value={this.state.price}/>
						<textarea placeholder="Description..." className="textarea Normal-Text description" value={this.state.description}/>
					</div>
				</div>
				<div className = "additional-details-container">
					<p className="Yellow-Text more-information">MORE INFORMATION</p>
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

