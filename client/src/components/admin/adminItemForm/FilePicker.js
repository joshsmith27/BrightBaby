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
    this.makeDefault = this.makeDefault.bind(this);
  }

  componentDidMount() {
    if(this.props.productId){
      axios.get(`/api/products/getImages/${this.props.productId}`)
      .then((response) => {
        let images = response.data.map((image) => {
            return {productid: image.productid, imageid:image.imageid, imagepath:`/uploads/${image.imagepath}`, isdefault:image.isdefault};
          });
        if (response.data.length < 3) {
          for (let i = response.data.length; i < 3; i++) {
            images.push({productid: 0, imageid:0, imagepath:logo, isdefault:false})
          }
        }
        this.setState({
          images,
          image: {
            image: response.data[0] ? `/uploads/${response.data[0].imagepath}` : "",
            id: 0
          },
        })
      })
    }else{
      this.setState({
        images: [{productid: 0, imageid:0, imagepath:logo, isdefault:false}, {productid: 0, imageid:0, imagepath:logo, isdefault:false}, {productid: 0, imageid:0, imagepath:logo, isdefault:false}],
        image: {
          image: logo,
          id: 0
        },
      })
    }
 
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
        id: i,
        isdefault: image.isdefault
      },
      selctedImage: image,
      selctedId: image.imageid,
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
            image.imagepath = response.data[i]
            delete image.file;
            return image;
          })
          this.props.saveImageNames(rtn)
        });
  }

  makeDefault(){
    const saveImages = this.state.saveImages.map((image, i)=>{
        if(Number(this.state.previousSavedRef.replace(/\D/g,'')) === i){
          image.isdefault = true;
        }else{
          image.isdefault =false;
        }
        return image;
    });
    this.setState(
      {
        saveImages
      }
    )
  }
  render() {
    let images = this.state.images.map((image, i) => {
        return <div
          ref={`image${i}`}
          key={image.imageid > 0 ? image.imageid : i}
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
    let isDefaultButton = this.state.imageHasBeenChanged ? 
    <button className="sudmit-button" onClick={this.makeDefault}>MAKE DEFAULT</button> 
    : 
    <button className="sudmit-button" onClick={this.makeDefault} disabled>MAKE DEFAULT</button>
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
          {isDefaultButton}
          <br/>
          {sudmitButton}
          <br/>
          
        </div>

      </div>

    );
  }
}
export default FilePicker