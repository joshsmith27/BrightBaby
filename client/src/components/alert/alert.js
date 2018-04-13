import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Actions from '../../Redux/actions/action'

 class Alert extends Component {
    dismiss(){
        this.props.Alert({show:false, alertText: ''})
    }
    render(){
        debugger
        const displayStyle = {display: this.props.alert.show ? 'block' : 'none'};
        return(
            <div  style={displayStyle} className="alertContainer">
                <div className="alert">
                    <p onClick={this.dismiss.bind(this)}>X</p>
                    {this.props.alert.alertText}
                </div>
            </div>
        )
    }

}
export default connect(state => state, Actions)(Alert)
