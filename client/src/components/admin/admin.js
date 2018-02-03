import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetProducts} from '../../actions/action';
import NewItemForm from './adminItem';

class Admin extends Component {
	componentWillMount(){
		this.props.GetProducts();
	}

  render() {
    let NewItemForms;
		if(this.props.products && typeof this.props.products !== 'string' ){
			NewItemForms = this.props.products.map((e)=>{
				return <NewItemForm
        productName={e.productName}
        productImage={e.productImage}
        productQuanity={e.productQuanity}
        />
		});
		
		}else{
			NewItemForms = <div>{this.props.products}</div>
		}
    return (
      <div className="admin-main-container">
        <p className="Yellow-Text admin-header">Admin</p>
        <p className="Grey-Text admin-subTitle">Choose an item to edit or add a new item.</p>
        <div className="display-flex adminItemContainer">
        {NewItemForms}
        </div>
      </div>
    );
  }
}

function mapStateToProps({products}){
	return {products};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({GetProducts}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Admin)