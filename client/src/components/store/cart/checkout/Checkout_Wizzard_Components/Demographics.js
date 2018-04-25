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
        // this.props.history.push('/checkout/paymentinfo');
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
                    <input name="firstname" type="text"/>
                </div>
                <div onClick={this.handleClick} ref="lastname" className="label-container">
                    <label>Last Name</label>
                    <input name="lastname" type="text"/>
                </div>
                <div onClick={this.handleClick} ref="email" className="label-container">
                    <label>Email</label>
                    <input name="email" type="text"/>
                </div>
                <div onClick={this.handleClick} ref="address" className="label-container">
                    <label>Address</label>
                    <input name="address" type="text"/>
                </div>
                <div onClick={this.handleClick} ref="city" className="label-container">
                    <label>City</label>
                    <input name="city" type="text"/>
                </div>
                <div onClick={this.handleClick} ref="state" className="label-container">
                    <label>State</label>
                    <select name="state">
                        {state_options}
                    </select>
                </div>
                <div onClick={this.handleClick} ref="zip" className="label-container">
                    <label>Zip</label>
                    <input name="zip" type="text"/>
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