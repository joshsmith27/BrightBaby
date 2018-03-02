import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Loader from '../loading'
class Home extends Component {
	render() {
		return (
			<div className="Home-Container">
				<Loader/>
			</div>
		);
	}
}

export default Home;
