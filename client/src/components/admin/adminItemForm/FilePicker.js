import React, {Component} from 'react';
import logo from './../../../Media/SpruceBaby.svg';
import axios from 'axios';
class FilePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      image: {},
      saveImages: [],
      previousSavedRef: "image0",
      imageHasBeenChanged:false,
      selctedId: 0,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchImage = this.switchImage.bind(this);
    this.saveImages = this.saveImages.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/products/getImages/${this.props.productId}`)
      .then((response) => {
        let images = response.data.map((image) => {
            return {productid: image.productid, imageid:image.imageid, imagepath:`/uploads/${image.imagepath}`};
          });
        if (response.data.length < 3) {
          for (let i = response.data.length; i < 3; i++) {
            images.push({productid: 0, imageid:0, imagepath:logo})
          }
        }
        this.setState({
          images,
          image: {
            image: `/uploads/${response.data[0].imagepath}`,
            id: 0
          },
        })
      })
  }

  handleSubmit(event) {
    event.preventDefault();

    function getBase64(file) {
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          showPreview(reader.result, file)
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
    }

    function showPreview(info, file) {
      let index;
      let arr = this.state.images.map((image, i) => {
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

          return {imagepath:info};
        }
      })
      const imageToSave = this.state.selctedImage;
      imageToSave.file = file;
      this.setState({
        image: {
          image: info,
          id: index
        },
        
        images,
        imageHasBeenChanged: true,
        saveImages: [
          ...this.state.saveImages,
          imageToSave
        ]
      });

    }
    showPreview = showPreview.bind(this);
    getBase64(this.fileInput.files[0])
  }

  switchImage(image, i) {
    if(this.state.previousSavedRef){
      this.refs[this.state.previousSavedRef].style.border = "solid 1px grey";
    }
    this.refs[`image${i}`].style.border = "solid 1px #178E16";
    this.setState({
      image: {
        image: image.imagepath,
        id: i
      },
      selctedImage: image,
      previousSavedRef:`image${i}`
    })
  }

  saveImages(event) {
    event.preventDefault();
    let formData = new FormData();
    this.state.saveImages.map((image, i)=>{
        formData.append(`photos`, image.file);
    })
    axios.post('/api/product/add/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response)=>{
          const rtn = this.state.saveImages.map((image, i)=>{
            image.imagepath  = response.data[i]
            delete image.file;
            return image;
          })
          this.props.saveImageNames(rtn)
        });
  }
  render() {
    let images = this.state.images.map((image, i) => {
        return <div
          ref={`image${i}`}
          key={image.imageid}
          className="small-image"
          onClick={() => {
          this.switchImage(image, i)
        }}
          style={{
          backgroundImage: `url('${image.imagepath}')`,
        }}/>
      })

    let sudmitButton = this.state.imageHasBeenChanged ? 
    <button type="button" className="sudmit-button" ref="sub"  onClick={this.saveImages}>SUBMIT</button>          
    :
    <button type="button" className="sudmit-button" ref="sub"  disabled onClick={this.saveImages}>SUBMIT</button>          
    
    return (
      <div className="image-display-container">
        <div className="display-flex">
          <div className="adminSmallForm">
            {images}
          </div>
          <div className="adminForm-image" style={{backgroundImage: `url('${this.state.image.image}')`}}/>
        </div>

        <div className="form-container">

        <form onSubmit={this.handleSubmit}>
          <label>
            Upload file:
          </label>
          <br/>
          <input type="file" ref={input => { this.fileInput = input;}}/>
          <br/>
          <button type="submit">
            VIEW
          </button>
        </form>
          {sudmitButton}
        </div>

      </div>

    );
  }
}
export default FilePicker