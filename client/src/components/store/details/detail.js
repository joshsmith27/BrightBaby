import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import * as Actions from '../../../Redux/actions/action';
import Loading from '../../loading';
import ImageSelector from './ImageSelector';

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

	handleAddToCart(product, quanity){
		this.props.AddToCart(product, quanity)
		this.props.Alert({show:true, alertText:`Added To Cart`})
	}

	render() {
		if(this.props.details.details.name){
			let {name, price, description, moreinformation, productid, avaliableQuanity} = this.props.details.details
			return (
				<div className="details-main-container">
					<div className="detail-flex-container">
						<ImageSelector images={this.props.details.details.productImages}/>
						<div className = "detail-details">
							<p className="Yellow-Text name">{name.toUpperCase()}</p>
							<p className="purple-Text price">{`$${Number(price).toFixed(2)}`}</p>
							<p className="normal-Text description">{description}</p>
							<div className="button-quanity-container">
								<button className="addToCartButton biggerButton" onClick={() => this.handleAddToCart(this.props.details.details, this.state.productQuanity)}>Add To Cart</button>
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
			return (<Loading/>)
		}

	}
}
  
export default connect(state => state, Actions)(Details);

