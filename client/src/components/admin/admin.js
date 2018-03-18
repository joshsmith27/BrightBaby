import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetProducts} from '../../Redux/actions/action';
import NewItemForm from './adminItem';
import { Link } from 'react-router-dom';
import Loader from '../loading'
import DefaultImage from '../../Media/addImage2.png';

class Admin extends Component {
  constructor(){
    super()
    this.state = {
      isLoaded: false,
    }
  }
	componentWillMount(){
    this.props.GetProducts()
    .then(()=>{
      this.setState({
        isLoaded: true,
      })
    })
	}

  render() {
    let NewItemForms;
    var propType = typeof this.props.products;
		if(this.props.products.length > 0 && propType !== 'string' ){
			NewItemForms = this.props.products[0].map((e)=>{
				return <NewItemForm
				key={e.productid}
				productImage={e.productImages.length > 0 ? `/uploads/${e.productImages[0].imagepath}` : ""}
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

function mapStateToProps({products}){
	return {products};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({GetProducts}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Admin)