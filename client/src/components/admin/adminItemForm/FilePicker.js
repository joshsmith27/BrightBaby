import React, { Component } from 'react';

class FilePicker extends Component {
    constructor(props) {
      super(props);
      this.state = {
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
            HelloWorld(reader.result)
          };
          reader.onerror = function (error) {
            console.log('Error: ', error);
          };
        }
     }    
     function HelloWorld(info){
       this.props.saveImage(info);
      this.setState({
        image:info,
      });
      
    }

    HelloWorld = HelloWorld.bind(this);
    getBase64(this.fileInput.files[0])
    }


    render() {
      console.log(this.props.defaultImage[0])
      return (
        <div>
          <div className = "adminForm-image" style={{backgroundImage: `url('${this.state.image[0].imagepath}')`}}>
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