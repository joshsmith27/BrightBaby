import React, {Component} from 'react';
import states from '../states'

class Demographics extends Component {
    constructor(props){
        super(props);
        this.cancel = this.cancel.bind(this);
    }
    cancel(e){
        e.preventDefault()
        this.props.history.push('/cart')
    }
   render(){
       const state_options = states.states.map((state, i)=>{
            return <option key={i} value={state}>{state}</option>
       })
      
       return (
           <form className="demographics-container">
                <div className="label-container">
                    <label>First Name</label>
                    <input type="text"/>
                </div>
                <div className="label-container">
                    <label>Last Name</label>
                    <input type="text"/>
                </div>
                <div className="label-container">
                    <label>Email</label>
                    <input type="text"/>
                </div>
                <div className="label-container">
                    <label>Address</label>
                    <input type="text"/>
                </div>
                <div className="label-container">
                    <label>City</label>
                    <input type="text"/>
                </div>
                <div className="label-container">
                    <label>State</label>
                    <select>
                        {state_options}
                    </select>
                </div>
                <div className="label-container">
                    <label>Zip</label>
                    <input type="text"/>
                </div>
                <div className="button-container">
                    <button onClick={this.cancel}>Cancel</button>
                    <button>Next</button>
                </div>
           </form>
       )
   } 
}
export default Demographics;