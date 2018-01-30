import React, { Component } from 'react';
import Logo from './brightbaby.svg';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
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
									<div className='cart-quanity'>0</div>
								</div>
							</Link> 
						</div>
						<Link  to={'/'}><div className='logo-container' style={backgroundLogo}/></Link>
						<nav className='nav-container'>
							<Link  to={'/'}>Home</Link>
							<Link  to={'/store'}>Store</Link>
						</nav>
						<Switch>
							<Route path='/details/:id' component={Details}></Route>
							<Route path='/store' component={Store}></Route>
							<Route path='/cart' component={Cart}></Route>
							<Route path='/adminUser' component={Admin}></Route>
							<Route path='/adminItemForm/:id' component={AdminItemForm}></Route>
							<Route path='/' component={Home}></Route>
						</Switch>
					</div>
					</ScrollToTop>
				</Router>
			</div>
		);
	}
}

export default App;
