import React, { Component } from 'react';
import brightBabylogo from './../../brightbaby.svg'
class FilePicker extends Component {
    constructor(props) {
      super(props);
      this.state = {
        images:[brightBabylogo, brightBabylogo,brightBabylogo],
        image: this.props.defaultImage,
        formButtonText: 'VIEW',
      }
      this.handleSubmit = this.handleSubmit.bind(this);
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
      this.props.saveImage(file);
      this.setState({
        image:info,
    });
      
    }

    HelloWorld = HelloWorld.bind(this);
    getBase64(this.fileInput.files[0])
    }


    render() {
      debugger
      let images = this.state.images.map((image)=>{
        return <div className = "small-image" style={{backgroundImage: `url('${image}')`}}/>
      })
      return (
        <div>
          <div className="display-flex">
            <div clasName = "adminSmallForm">
              {images}
            </div>
            <div className = "adminForm-image" style={{backgroundImage: `url('${this.state.image}')`}}/>
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