import React, {Component} from 'react';
import states from '../states'

class Demographics extends Component {
   render(){
       
       const state_options = states.states.map((state)=>{
            return <option value={state}>{state}</option>
       })
       return (
           <form className="demographics-container">
                <div>
                    <div>
                        <label>First Name</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type="text"/>
                    </div>
                </div>
                <div>
                    <div>
                        <label>Email</label>
                        <input type="text"/>
                    </div>
                </div>
                <div>
                    <div>
                        <label>Address</label>
                        <input type="text"/>
                    </div>
                </div>
                <div>
                    <div>
                        <label>City</label>
                        <input type="text"/>
                    </div>
                    <div>
                        <label>State</label>
                        <select>
                            {state_options}
                        </select>
                    </div>
                </div>
                <div>
                    <div>
                        <label>Zip</label>
                        <input type="text"/>
                    </div>
                </div>
           </form>
       )
   } 
}
export default Demographics;