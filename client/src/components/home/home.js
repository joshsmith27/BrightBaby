import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Loader from '../loading';
import axios from 'axios';
class Home extends Component {
	constructor(props){
		super(props)
		this.state = {
			isLoaded: false,
			products: []
		}
	}

	componentDidMount(){
		axios.get('/api/gethomeproducts')
		.then((products)=>{
			this.setState({
				products: products.data,
				isLoaded: true,
			})
		})
	}

	render() {

		const productCards = this.state.products.map((product)=>{
			let defaultImage = '';
			  product.images.forEach((image)=>{
				if(image.is_default){
					 defaultImage = image.imagepath;
				}
			  });
			console.log(defaultImage);
			return(
				<div className="product-banner" style={{ backgroundImage: 'url(' + `/uploads/${defaultImage}` + ')'}}>
					<div className="text-home-product-container">
						<h1>{product.name}</h1>
						<div className="link-container">
							<Link className="shop-now" to={`/store`}>
								Shop Now
							</Link>
						</div>

					</div>

				</div>
			)
		})

		if(this.state.isLoaded){
			return(
				<div className="home-container">
					{productCards}
				</div>
			);
		}else{
			return (
				<div className="Home-Container">
					<Loader/>
				</div>
			);
		}

	}
}

export default Home;
