import React, { Component } from 'react';
import Logo from './SpruceBaby.svg';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import ScrollToTop from './ScrollToTop';
import Home from './home/home';
import Store from './store/store';
import Details from './store/details/detail';
import Cart from'./store/cart/cart';
import Admin from './admin/admin';
import AdminItemForm from './admin/adminItemForm/adminItemForm';


class App extends Component {
	constructor(props){
		super(props);
		this.state={};
	}

	render() {
		const backgroundLogo = {
			backgroundImage: 'url(' + Logo  + ')'
		};
		return (
			<div className='App'>
				<Router>
				<ScrollToTop>
					<div>
						<div className='cart-container'>
							<Link to={'/cart'}>
								<div className='Normal-Text cart-text'>CART
									<div className='cart-quanity'>{this.props.cart.products.length}</div>
								</div>
							</Link> 
						</div>
						<Link  to={'/'}><div className='logo-container' style={backgroundLogo}/></Link>
						<nav className='nav-container'>
							<Link  to={'/'}>Home</Link>
							<Link  to={'/store'}>Store</Link>
							<Link  to={'/store'}>Blog</Link>
						</nav>
						<Switch>
							<Route path='/details/:id' component={Details}></Route>
							<Route path='/store' component={Store}></Route>
							<Route path='/cart' component={Cart}></Route>
							<Route path='/admin/:id' component={AdminItemForm}></Route>
							<Route path='/admin' component={Admin}></Route>
							<Route path='/' component={Home}></Route>
						</Switch>
					</div>
					</ScrollToTop>
				</Router>
			</div>
		);
	}
}

function mapStateToProps({cart}){
	return {cart};
}
export default connect(mapStateToProps)(App);

