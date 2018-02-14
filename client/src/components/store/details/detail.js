import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetDetails, AddToCart} from '../../../actions/action';


class Details extends Component {
	constructor(props){
		super(props);
		this.state = {
			productQuanity: 1,
		};
		this.changeInput = this.changeInput.bind(this);
	}
	
	changeInput(e){
		if(e.target.value > this.props.details.details.avaliablequantity){
			this.setState({
				productQuanity: this.props.details.details.avaliablequantity
			});
		}else{
			this.setState({
				productQuanity: e.target.value
			});
		}
	}
	
	componentWillMount(){
		const id = this.props.match.params.id;
		this.props.GetDetails(id);
	}

	render() {
		if(this.props.details.details){
			let {name, price, description, moreinformation, productid, avaliableQuanity} = this.props.details.details
			let image = this.props.details.details.productImages[0].imagepath
			return (
				<div className="details-main-container">
					<div className="detail-flex-container">
						<div className = "detail-image" style={{backgroundImage: 'url(' + image + ')'}}></div>
						<div className = "detail-details">
							<p className="Yellow-Text name">{name.toUpperCase()}</p>
							<p className="purple-Text price">{`$${Number(price).toFixed(2)}`}</p>
							<p className="normal-Text description">{description}</p>
							<div className="button-quanity-container">
								<button className="addToCartButton biggerButton" onClick={() => this.props.AddToCart(this.props.details.details, this.state.productQuanity)}>Add To Cart</button>
								<div className="display-flex">
									<p>Qty:</p>
									<input onChange={this.changeInput} type="number" min="1" className="quanity-input" value={this.state.productQuanity}/>
								</div>
							</div>
						</div>
					</div>
					<div className = "additional-details-container">
						<p className="Yellow-Text more-information">MORE INFORMATION</p>
						<p className ="Normal-Text">{moreinformation}</p>
					</div>
				</div>
			);
		}else{
			return (<div>loading...</div>)
		}

	}
}
function mapStateToProps({details}){
	return {details};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({GetDetails, AddToCart}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Details);

