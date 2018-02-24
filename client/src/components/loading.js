import React, {Component} from 'react';
import loader from '../loading.gif'
export default class Loader extends Component {
    render(){
        return (
            <div>
                <img src={loader} alt=""/>
            </div>
        );
    }
}
