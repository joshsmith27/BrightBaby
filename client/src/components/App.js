import React, {Component} from 'react';
import Logo from '../Media/SpruceBaby.svg';
import ShoppingBag from '../Media/ShoppingBag.svg'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {ScrollToTop,Home, Store, Details, Cart, Admin, AdminItemForm, Nav} from './Routes';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAdmin: true
		};
	}

	render() {
		const backgroundLogo = {backgroundImage: 'url(' + Logo + ')'};
		const admin = this.state.isAdmin ? (<Route path="/admin" component={Admin}/>): null;
		const adminDetails = this.state.isAdmin ? (<Route path="/admin/:id" component={AdminItemForm}/>): null;
		return (
			<div className="App">
				<Router>
					<ScrollToTop>
							<div className="cart-container">
								<Link to={'/cart'}>
									<div className="ShoppingBag-Container">
										<div className="ShoppingBag" style={{ backgroundImage: 'url(' + ShoppingBag + ')'}}>
										
										</div>
									</div>
								</Link>
							</div>
							<Link to={'/'}>
								<div className="logo-container" style={backgroundLogo}/>
							</Link>
							<Nav isAdmin={this.state.isAdmin}/>
							<Switch>
								<Route path="/details/:id" component={Details}/>
								<Route path="/store" component={Store}/>
								<Route path="/cart" component={Cart}/> 
								{adminDetails}
								{admin}
								<Route path="/" component={Home}/>
							</Switch>
					</ScrollToTop>
				</Router>
			</div>
		);
	}
}

function mapStateToProps({cart}) {
				return {cart};
}
export default connect(mapStateToProps)(App);
