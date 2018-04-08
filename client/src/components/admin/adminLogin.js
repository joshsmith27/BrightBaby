import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as Actions from '../../Redux/actions/action';

class AdminLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            showError: false,
        }
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    login(event){
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/api/admin/login', data)
            .then((response)=>{
                if(response.successful){
                    this.props.history.push('/admin')
                }else{
                    this.setState({
                        showError: true,
                    })
                }
            })
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value,
            showError: false,
        })
    }
    render(){
        let error
        if(this.state.showError){
            error = 
            <div className="Error">
                Your Email and Password combination wasn't found. 
            </div>
        }
        return(
            <div>
                <form className="loginForm" onSubmit={this.login}>
                    <div className="title">Login</div>
                    {error}
                    <input type="text" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Email"/>
                    <br/>
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Password"/>
                    <br/>
                    <button className="">Login</button>
                </form>
            </div>
        )
    }
}

export default connect(state => state, Actions)(AdminLogin)
