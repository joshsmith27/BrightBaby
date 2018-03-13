import React, {Component} from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../Media/LoadingTree.json'
export default class Loader extends Component {
    
    render(){
        const buttonStyle = {
            display: 'block',
            margin: '10px auto'
          };
        const defaultOptions = {
            loop: false,
            autoplay: true, 
            animationData: animationData,
          };
        return (
            <div id="loader">
            <Lottie options={defaultOptions}
              height={175}
              width={175}/>
            </div>
        );
    }
}
