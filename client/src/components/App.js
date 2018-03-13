import React, { Component } from 'react';
import Logo from '../Media/SpruceBaby.svg';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {ScrollToTop, Home, Store, Details, Cart, Admin, AdminItemForm, Nav} from './Routes'

class App extends Component {
	constructor(props){
		super(props);
		this.state={
			isAdmin: false,
		};
	}

	render() {
		const backgroundLogo = {
			backgroundImage: 'url(' + Logo  + ')'
		};
		const admin = this.state.isAdmin ? <Route path='/admin' component={Admin}></Route>: null;
		const adminDetails = this.state.isAdmin ? <Route path='/admin/:id' component={AdminItemForm}></Route> : null;
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
						<Nav isAdmin={this.state.isAdmin}/>
						<Switch>
							<Route path='/details/:id' component={Details}></Route>
							<Route path='/store' component={Store}></Route>
							<Route path='/cart' component={Cart}></Route>
							{admin}
							{adminDetails}
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

