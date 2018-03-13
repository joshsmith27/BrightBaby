import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component{
    render(){
        if(this.props.isAdmin){
            return(
                <nav className='nav-container'>
                    <Link  to={'/'}>Home</Link>
                    <Link  to={'/store'}>Store</Link>
                    <Link  to={'/about'}>About</Link>
                    <Link  to={'/admin'}>Admin</Link>                    
                </nav>
                )
        }else{
            return(
            <nav className='nav-container'>
                <Link  to={'/'}>Home</Link>
                <Link  to={'/store'}>Store</Link>
                <Link  to={'/about'}>About</Link>
            </nav>
            )
        }
    }
}

export default Nav