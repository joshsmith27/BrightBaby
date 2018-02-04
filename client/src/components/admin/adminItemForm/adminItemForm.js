import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetDetails, UpdateProduct} from '../../../actions/action';
import FilePicker from './FilePicker';
import DefaultImage from '../../../addImage2.png';


class AdminItemForm extends Component {
	constructor(props){
		super(props);
		let {currentQuanity, title, price, description, additionalInfo, ProductImage} = this.props.details
		this.state = {
			productQuanity: currentQuanity ? currentQuanity : 0,
			title: title ? title : '',
			price: price ? price : '',
			description: description ? description : '',
			additionalInfo: additionalInfo ? additionalInfo : '', 
			productImage: ProductImage ? ProductImage : DefaultImage
		};
		this.changeInput = this.changeInput.bind(this);
		this.saveImage = this.saveImage.bind(this);
		this.updateProduct =this.updateProduct.bind(this);
	}
	changeInput(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	saveImage(base64){
		this.setState({
			productImage:base64
		})
	}

 updateProduct(){
	 let product = {
		 Title: this.state.title,
		 Price: this.state.price,
		 Description: this.state.price,
		 ProductImage: this.state.productImage,
		 MoreInfromation: this.state.additionalInfo 
	 }
	 this.props.UpdateProduct(this.props.match.params.id, product)
 }

	componentWillMount(){
		const id = this.props.match.params.id;
		this.props.GetDetails(id);
	}

	render() {
		return (
			<div className="details-main-container">
				<div className="detail-flex-container image-price-container">
				<FilePicker defaultImage={this.state.productImage} saveImage={this.saveImage}/>
					
					<div className = "detail-details">
						<input placeholder="Title..." name="title" onChange={this.changeInput} className="input Yellow-Text name" value={this.state.title} />
						<br/>
						<input type="number"  placeholder="Price..." name="price" onChange={this.changeInput} className="input Purple-Text price" value={this.state.price}/>
						<textarea placeholder="Description..." name="description" onChange={this.changeInput} className="textarea Normal-Text description" value={this.state.description}/>
					</div>
				</div>
				<div className = "additional-details-container">
					<p className="Yellow-Text more-information">MORE INFORMATION</p>
					<textarea placeholder="More Information..." name="additionalInfo" onChange={this.changeInput} className="textarea Normal-Text description" value={this.state.additionalInfo}/>
				</div>
				<div className="saveQuanity-container">
					<div className="display-flex">
						<p>Current Quanity:</p>
						<input type="number" className="quanity-input" name="productQuanity" onChange={this.changeInput}  value={this.state.productQuanity}/>
					</div>
					<button className="addToCartButton biggerButton" onClick={this.updateProduct}>Save</button>
				</div>
			</div>
		);
	}
}
function mapStateToProps({details}){
	return {details};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({GetDetails, UpdateProduct}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AdminItemForm);

