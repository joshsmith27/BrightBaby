import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetDetails} from '../../../actions/action';

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

		return (
			<div className="details-main-container">
				<div className="detail-flex-container">
					<div className = "detail-image" style={{backgroundImage: 'url(' + this.props.details.productImage + ')'}}></div>
					<div className = "detail-details">
						<p className="Yellow-Text name">{this.props.details.productName}</p>
						<p className="purple-Text price">{this.props.details.price}</p>
						<p className="normal-Text description">{this.props.details.description}</p>
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
					<p className ="Normal-Text">{this.props.details.additionalDetails}</p>
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Details);

