import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetDetails} from '../../../actions/action';
import{AddToCart} from '../cart/add_to_cart_service';

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
	
	componentWillMount(){
		const id = this.props.match.params.id;
		this.props.GetDetails(id);
	}

	render() {

		if(this.props.details.details){
			let {name, price, description, moreinformation, productid} = this.props.details.details
			let image = this.props.details.images[0].imagepath
			return (
				<div className="details-main-container">
					<div className="detail-flex-container">
						<div className = "detail-image" style={{backgroundImage: 'url(' + image + ')'}}></div>
						<div className = "detail-details">
							<p className="Yellow-Text name">{name.toUpperCase()}</p>
							<p className="purple-Text price">{`$${Number(price).toFixed(2)}`}</p>
							<p className="normal-Text description">{description}</p>
							<div className="button-quanity-container">
								<button className="addToCartButton biggerButton" onClick={() => AddToCart(this.props.details.details, this.state.productQuanity)}>Add To Cart</button>
								<div className="display-flex">
									<p>Qty:</p>
									<input onChange={this.changeInput} type="number" className="quanity-input" value={this.state.productQuanity}/>
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
	return bindActionCreators({GetDetails}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Details);

