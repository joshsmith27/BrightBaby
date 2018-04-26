import React, {Component} from 'react';
import states from '../states'

class Demographics extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstname: "",
            lastname:"",
            email: "",
            address: "",
            city:"",
            state:"",
            zip:""
        };
        this.cancel = this.cancel.bind(this);
        this.next = this.next.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    cancel(e){
        e.preventDefault()
        this.props.history.push('/cart')
    }
    next(e){
        e.preventDefault();
        for(var item in this.state){
            if(!this.state[item]){
                this.refs[item].className = `label-container error`
            }
        }
        this.props.history.push('/checkout/paymentinfo');
    }
    handleChange(e){
        this.setState({
            [e.target.name]: [e.target.value]
        })
    }
    handleClick(e){
        if(this.refs[e.target.name]){
            this.refs[e.target.name].className = `label-container`
        }
    }
   render(){
       const state_options = states.states.map((state, i)=>{
            return <option key={i} value={state}>{state}</option>
       })
      
       return (
           <div className="demographics-container">
                <div onClick={this.handleClick} ref="firstname" className="label-container">
                    <label>First Name</label>
                    <input value={this.state.firstname} onChange={this.handleChange} name="firstname" type="text"/>
                </div>
                <div onClick={this.handleClick} ref="lastname" className="label-container">
                    <label>Last Name</label>
                    <input value={this.state.lastname} onChange={this.handleChange} name="lastname" type="text"/>
                </div>
                <div onClick={this.handleClick} ref="email" className="label-container">
                    <label>Email</label>
                    <input value={this.state.email} onChange={this.handleChange} name="email" type="text"/>
                </div>
                <div onClick={this.handleClick} ref="address" className="label-container">
                    <label>Address</label>
                    <input value={this.state.address} onChange={this.handleChange} name="address" type="text"/>
                </div>
                <div onClick={this.handleClick} ref="city" className="label-container">
                    <label>City</label>
                    <input value={this.state.city} onChange={this.handleChange} name="city" type="text"/>
                </div>
                <div onClick={this.handleClick} ref="state" className="label-container">
                    <label>State</label>
                    <select value={this.state.state} onChange={this.handleChange} name="state">
                        {state_options}
                    </select>
                </div>
                <div onClick={this.handleClick} ref="zip" className="label-container">
                    <label>Zip</label>
                    <input value={this.state.zip} onChange={this.handleChange} name="zip" type="text"/>
                </div>
                <div className="button-container">
                    <button onClick={this.cancel}>Cancel</button>
                    <button onClick={this.next}>Next</button>
                </div>
           </div>
       )
   } 
}
export default Demographics;