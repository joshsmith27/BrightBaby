import React, {Component} from 'react';
import Logo from '../Media/SpruceBaby.svg';
import ShoppingBag from '../Media/ShoppingBag.svg'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as Actions from '../Redux/actions/action';
import Alert from'./alert/alert';
import {ScrollToTop,Home, Store, Details, Cart, Admin, AdminItemForm, Nav, AdminLogin} from './Routes';
import axios from 'axios';
class App extends Component {
	componentDidMount(){
		axios.get('/api/userAdmin')
			.then((response)=>{
				this.props.ChangeAdmin(response.data.successful);
			})
	}
	render() {
		const backgroundLogo = {backgroundImage: 'url(' + Logo + ')'};
		const admin = this.props.IsAdmin ? (<Route path="/admin" component={Admin}/>): (<Route path="/admin" component={AdminLogin}/>);
		const adminDetails = this.props.IsAdmin ? (<Route path="/admin/:id" component={AdminItemForm}/>): <Route path="/admin/:id"  component={AdminLogin}/>;
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
								<Nav/>
								<Switch>
									<Route path="/details/:id" component={Details}/>
									<Route path="/store" component={Store}/>
									<Route path="/cart" component={Cart}/> 
									<Route path="/adminLogin" component={AdminLogin}/> 
									{adminDetails}
									{admin}
									<Route path="/" component={Home}/>
								</Switch>
						</ScrollToTop>
					</Router>
					<Alert/>
				</div>
		);
	}
}

export default connect(state => state, Actions)(App);
