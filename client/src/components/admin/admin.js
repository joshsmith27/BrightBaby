import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../Redux/actions/action';
import NewItemForm from './adminItem';
import { Link } from 'react-router-dom';
import Loader from '../loading'
import DefaultImage from '../../Media/addImage2.png';
import axios from 'axios';
class Admin extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoaded: false,
    }
    this.logOut = this.logOut.bind(this);
  }
	componentWillMount(){
    this.props.GetProducts()
    .then(()=>{
      this.setState({
        isLoaded: true,
      })
    })
	}
logOut(){
  axios.get(`/api/userAdmin/logout`)
  .then(()=>{
    debugger
    this.props.ChangeAdmin(false);
  })
}
  render() {
    let NewItemForms;
    var propType = typeof this.props.products;
		if(this.props.products.length > 0 && propType !== 'string' ){
			NewItemForms = this.props.products[0].map((e)=>{
        let image  = e.productImages.filter((image)=>{
          if(image.is_default){
              return image
          }
        })[0]
				return <NewItemForm
				key={e.productid}
				productImage={e.productImages.length > 0 ? `/uploads/${image.imagepath}` : ""}
				productName={e.name}
				productQuanity={e.productQuanity}
				productId = {e.productid}
			></NewItemForm>
		});
		NewItemForms.push(
      <NewItemForm
      key={0}
        productName="Add A New Item"
        productImage= {DefaultImage}
        productQuanity= "0"
        productId = "0"
        />
    )
		}
    if(this.state.isLoaded){
      return (
        <div className="admin-main-container">
          <p className="Yellow-Text admin-header">Admin</p>
          <p className="Grey-Text admin-subTitle" onClick={this.logOut}>logout</p>
          <p className="Grey-Text admin-subTitle">Choose an item to edit or add a new item.</p>
          <div className="display-flex adminItemContainer">
          {NewItemForms}
          </div>
        </div>
      );
    }else{
     return  <Loader/>
    }
  }
}

  
export default connect(state => state, Actions)(Admin)