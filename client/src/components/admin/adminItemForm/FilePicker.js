import React, {Component} from 'react';
import brightBabylogo from './../../brightbaby.svg';
import axios from 'axios';
class FilePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        brightBabylogo, brightBabylogo, brightBabylogo
      ],
      image: {
        image: brightBabylogo,
        id: 0
      },
      formButtonText: 'VIEW',
      saveImages: [],
      previousSavedRef: "image0",
      imageHasBeenChanged:false,
    }
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.switchImage = this
      .switchImage
      .bind(this);
    this.saveImages = this
      .saveImages
      .bind(this);
  }

  componentDidMount() {
    this.refs[this.state.previousSavedRef].style.border = "solid 1px rgb(255,187,0)";    
    axios
      .get(`/api/products/getImages/${this.props.productId}`)
      .then((response) => {
        let images = response
          .data
          .map((image) => {
            return image.imagepath
            // return require(`../../../uploads/${image.imagepath}`);
          });
        if (response.data.length < 3) {
          for (let i = response.data.length; i < 3; i++) {
            images.push(brightBabylogo)
          }
        }
        this.setState({
          images,
          image: {
            image: response.data[0].imagepath,
            id: 0
          }
        })
      })
  }

  handleSubmit(event) {
    debugger
    event.preventDefault();

    function getBase64(file) {
      if (file) {
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

    function HelloWorld(info, file) {
      let index;
      let arr = this
        .state
        .images
        .map((image, i) => {
          if (i === this.state.image.id) {
            index = i;
            return null
          } else {
            return image
          }
        })
      let images = arr.map((image) => {
        if (image) {
          return image;
        } else {
          return info;
        }
      })
      this.setState({
        image: {
          image: info,
          id: index
        },
        images,
        imageHasBeenChanged: true,
        saveImages: [
          ...this.state.saveImages,
          file
        ]
      });

    }

    HelloWorld = HelloWorld.bind(this);
    getBase64(this.fileInput.files[0])
  }

  switchImage(image, i) {
    if(this.state.previousSavedRef){
      this.refs[this.state.previousSavedRef].style.border = "solid 1px grey";
    }
    this.refs[`image${i}`].style.border = "solid 1px rgb(255,187,0)";
    this.setState({
      image: {
        image: image,
        id: i
      },
      previousSavedRef:`image${i}`
    })
  }

  saveImages() {
    let formData = new FormData();
    this.state.saveImages.map((image, i)=>{
        formData.append(`photos`, image);
    })
    axios.post('/api/product/add/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response)=>{
      this.props.saveImageNames(response.data)
    });
  }
  render() {
    let images = this
      .state
      .images
      .map((image, i) => {
        return <div
          ref={`image${i}`}
          key={i}
          className="small-image"
          onClick={() => {
          this.switchImage(image, i)
        }}
          style={{
          backgroundImage: `url('${image}')`,
        }}/>
      })

    return (
      <div className="image-display-container">
        <div className="display-flex">
          <div className="adminSmallForm">
            {images}
          </div>
          <div
            className="adminForm-image"
            style={{
            backgroundImage: `url('${this.state.image.image}')`
          }}/>
        </div>

        <form onSubmit={this.handleSubmit}>
          <label>
            Upload file:
          </label>
          <br/>
          <input
            type="file"
            ref={input => {
            this.fileInput = input;
          }}/>

          <br/>
          <button type="submit">
            {this.state.formButtonText}
          </button>
          <button className="sudmit-button" ref="sub" disabled onClick={this.saveImages}>SUBMIT</button>          
        </form>

      </div>

    );
  }
}
export default FilePicker