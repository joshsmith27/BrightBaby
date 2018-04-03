import React, {Component} from 'react';

export default class ImageSelector extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedImage: {},
        };
        this.selectImage = this.selectImage.bind(this)
    }
    componentDidMount(){
        let selectedImage  = this.props.images.filter((image)=>{
            if(image.is_default){
                return image
            }
            
        })[0]
        this.setState({
            selectedImage
        })
    }
    
    selectImage(image){
        this.setState({
            selectedImage: image,
        });
    }
    render(){
        const images = this.props.images.map((image)=>{
             return <div className = "image" onClick={()=> { this.selectImage(image)}} style={{backgroundImage: `url( /uploads/${image.imagepath})`}}></div>
        })
        const selectedImage = <div className = "detail-image" style={{backgroundImage: `url( /uploads/${this.state.selectedImage.imagepath})`}}></div>
        return(
            <div className="image-selector-container">
                <div className="images">
                    {images}
                </div>
                <div className="select-image-container">
                    {selectedImage}
                </div>
            </div>
        )
    }
}