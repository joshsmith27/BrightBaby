import React, {Component} from 'react';

class YesNo extends Component {

    render(){
        const noStyle = !this.props.yesno ? `#178E16` : `Black`
        const yesStyle = this.props.yesno ? `#178E16` : `Black`
        return(
            <div className="yesno-container">
                <button className="no-button" onClick={()=>{this.props.changeYesNo(false)}} style={{background: `${noStyle}`}}>NO</button>
                <button className="yes-button" onClick={()=>{this.props.changeYesNo(true)}} style={{background: `${yesStyle}`}} >YES</button>
            </div>
        );
    }
}

export default YesNo