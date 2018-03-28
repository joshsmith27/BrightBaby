import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetDetails, UpdateProduct} from '../../../Redux/actions/action';
import FilePicker from './FilePicker';
import Loader from '../../loading';
import axios from 'axios';
import YesNo from './YesNo';

class AdminItemForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			isLoaded:false,
			avaliablequantity: 0,
			name: '',
			price: '',
			description: '',
			moreinformation: '',
			imagesToSave: [],
			ishomeproduct: false,
		}
		this.changeInput = this.changeInput.bind(this);
		this.saveImageNames = this.saveImageNames.bind(this);
		this.updateProduct = this.updateProduct.bind(this);
		this.deleteProduct = this.deleteProduct.bind(this);
		this.changeIsHomeProduct = this.changeIsHomeProduct.bind(this);
	}
	changeInput(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	saveImageNames(files){
		this.setState({
			imagesToSave:files
		})
	}

	updateProduct(){
		let product = {
			Name: this.state.name,
			Price: this.state.price,
			Description: this.state.description,
			MoreInformation: this.state.moreinformation,
			Quanity: this.state.avaliablequantity,
			ProductImages: this.state.imagesToSave,
			IsHomeProduct: this.state.ishomeproduct,
		}
		this.props.UpdateProduct(this.props.match.params.id, product)
		.then(()=>{
			this.props.history.push(`/admin`)
		})
	}
	deleteProduct(){
		debugger
		axios.delete(`/api/products/delete/${this.props.match.params.id}`)
			.then(()=>{
				debugger
				this.props.history.push('/admin');
			})
	}
	componentDidMount(){
		if(this.props.match.params.id > 0){
			const id = this.props.match.params.id;
			this.props.GetDetails(id)
			.then((response=>{
				response.value.data.details.isLoaded = true;
				this.setState(response.value.data.details)
			}))
		}else{
			this.setState({
				isLoaded:true
			})
		}
	}
	changeIsHomeProduct(bool){
		this.setState({
			ishomeproduct:bool,
		})
	}

	render() {
	let button;
	if(this.props.match.params.id != 0){
		button = <button className="addToCartButton biggerButton" onClick={this.deleteProduct}>Delete</button>
	}
	if(this.state.isLoaded)	{
		return (
			<div className="details-main-container">
				<div className="detail-flex-container image-price-container">
					<FilePicker productId={this.props.details.details.productid} saveImageNames={this.saveImageNames}/> 

					<div className = "detail-details">
						<input placeholder="Title..." name="name" onChange={this.changeInput} className="input Yellow-Text name" value={this.state.name} />
						<br/>
						<input type="number"  placeholder="Price..." name="price" onChange={this.changeInput} className="input Purple-Text price" value={this.state.price}/>
						<textarea placeholder="Description..." name="description" onChange={this.changeInput} className="textarea Normal-Text description" value={this.state.description}/>
					</div>
				</div>


				<div className = "additional-details-container">
					<p className="Yellow-Text more-information">MORE INFORMATION</p>
					<textarea placeholder="More Information..." name="moreinformation" onChange={this.changeInput} className="textarea Normal-Text description" value={this.state.moreinformation}/>
				</div>
				<div className="saveQuanity-container">
					<div className="display-flex">
						<p>Avaliable Quanity:</p>
						<input type="number" className="quanity-input" name="avaliablequantity" onChange={this.changeInput}  value={this.state.avaliablequantity}/>
					</div>
					<div className="ishomeproduct-container">
						<label>Feature This Product On Home Page?</label>
						<br/>
						<YesNo changeYesNo={this.changeIsHomeProduct} yesno={this.state.ishomeproduct}/>
					</div>
					<div className="admin-button-container">
						<button className="addToCartButton biggerButton" onClick={this.updateProduct}>Save</button>
						{button}
					</div>

				</div>
			</div>
		);
	}else{
		return (
			<Loader/>
		);
	}

	}
}
function mapStateToProps({details}){
	return {details};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({GetDetails, UpdateProduct}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AdminItemForm);

