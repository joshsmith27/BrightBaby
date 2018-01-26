import React, { Component } from 'react';

class FilePicker extends Component {
    constructor(props) {
      super(props);
      this.state = {
        image: '',
      }
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
      debugger
      event.preventDefault();
      function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          return(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }    
     var myPromise = new Promise((Resolve, Reject)=>{
      Resolve(getBase64(this.fileInput.files[0]));
     });
     myPromise.then((response)=>{
       this.setState({image:response});
     })
    }
  
    render() {
      return (
        <div>
          <img src={this.state.image} alt="stuff"/>
          <form
            onSubmit={this.handleSubmit}>
            <label>
              Upload file:
              <input
                type="file"
                ref={input => {
                  this.fileInput = input;
                }}
              />
            </label>
            <br />
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
       
      );
    }
  }
  export default FilePicker