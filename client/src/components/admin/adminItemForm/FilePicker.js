import React, { Component } from 'react';
import brightBabylogo from './../../brightbaby.svg';
import stuff from '../../../uploads/1b6ada95610709dab6bc1bdfbd59c68e';
import axios from 'axios';
class FilePicker extends Component {
    constructor(props) {
      super(props);
      this.state = {
        images:[brightBabylogo, stuff, brightBabylogo],
        image: {image: brightBabylogo, id: 0},
        formButtonText: 'VIEW',
        saveImages:[]
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.switchImage = this.switchImage.bind(this);
    }

    componentDidMount(){
      axios.get(`/api/products/getImages/${this.props.productId}`)
      .then((response)=>{
        let images= response.data.map((image)=>{
          return require(`../../../uploads/${image.imagepath}`);
        });
        if(response.data.length < 3){
          for(let i = response.data.length; i< 3; i++){
            images.push(brightBabylogo)
          }
        }
        this.setState({
          images,
          image:{image:response.data[0].imagepath, id:0},
        })
      })
    }

    handleSubmit(event) {
      event.preventDefault();
      
      function getBase64(file) {
        if(file){
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            HelloWorld(reader.result, file)
          };
          reader.onerror = function (error) {
            console.log('Error: ', error);
          };
        }
     }    
    function HelloWorld(info, file){
      debugger
      let index;
      let arr = this.state.images.map((image, i)=>{
        if(i === this.state.image.id){
          index = i;
          return  null
        }else{
          return image
        }
      })
      let images = arr.map((image)=>{
        if(image){
          return image;
        }else{
          return info;
        }
      })
      this.setState({
        image:{image:info, id:index},
        images,
        saveImages:[...this.state.saveImages, file] 
    });
      
    }

    HelloWorld = HelloWorld.bind(this);
    getBase64(this.fileInput.files[0])
    }

    switchImage(image, i){
      this.setState({
        image: {image: image, id: i}
      })
    }

    render() {
      let images = this.state.images.map((image, i)=>{
        return <div key={i} className = "small-image" onClick={()=>{this.switchImage(image, i)}} style={{backgroundImage: `url('${image}')`}}/>
      })
      return (
        <div className="image-display-container">
          <div className="display-flex">
            <div className = "adminSmallForm">
              {images}
            </div>
            <div className = "adminForm-image" style={{backgroundImage: `url('${this.state.image.image}')`}}/>
          </div>

          <form
            onSubmit={this.handleSubmit}>
            <label>
              Upload file:
              </label>
              <br/>
              <input
                type="file"
                ref={input => {
                  this.fileInput = input;
                }}
              />
           
            <br />
            <button type="submit">
              {this.state.formButtonText}
            </button>
          </form>

         
        </div>
       
      );
    }
  }
  export default FilePicker