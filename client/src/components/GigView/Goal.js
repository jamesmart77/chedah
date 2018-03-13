import React from "react";
import "./GigView.css";
import {formatCurrencyValueJSX} from '../../utils/currency';
import {Modal, Button, Row, Input} from 'react-materialize';
import { ModalAddGoal, ModalEditGoal2 } from '../../components/Modals'
import { Multiselect } from '../Multiselect'
import API from '../../utils/API'

class Goal extends React.Component { 

    state = {
        userCategories: [],
        categories: [],
        name:'',
        budget:''
      }

    getCategories = categories => {
        this.setState({ categories: categories })
    }

    componentWillMount () {
        API.getUserCategories()
          .then(({data}) => {
            this.setState({userCategories: data})
          }).catch(err => {
          console.log('Error Categories')
          console.log(err)
        })
    }

render() {
return (
<div className="card">
<div className="card-content cardHeader">
<div className="row">
    <div className="col s11">
        <span className="card-title"><span className="primaryHeaderText">Goal:</span> <span className="secondaryHeaderText">{this.props.name}</span></span>
    </div>
    <div className="col s1">
    <Modal
        header={this.props.name}
        trigger={<i className="material-icons iconStyleMed">settings</i>}
        actions={
            <section>
              <Button waves='light' flat className="modal-action modal-close deep-orange darken-3 white-text">Cancel</Button> &nbsp;
              <Button waves='light' className="modal-action modal-close teal" onClick={()=>this.props.editGoal(this.props.id)} >Apply</Button>
            </section>
          }>
          <br/>
          <div className='col input-field s12'>
            <input onChange={this.handleChange} type='text' name='name' id='input_1' value={ this.props.name } />
            <label className='active' htmlFor='input_1'> Goal Name </label>
          </div>
          <div className='col input-field s12'>
            <input onChange={this.handleChange} type='text' name='budget' id='input_2' value={ this.props.budget } />
            <label className='active' htmlFor='input_2'> Budget </label>
          </div>
          <div className='row'>
            <span>Select Expense Categories To Track:</span>
          </div>
          <Multiselect categories= { this.state.userCategories } getCategories={ this.getCategories.bind(this) } goalCategories = { this.props.categories } />
        <br/>
        <br/>
        <br/>
        <br/>
    </Modal>
    <ModalAddGoal id={this.props.name.toLowerCase().split(" ").join("")} user={ this.props.user } refresh={ this.props.refresh } />
    </div>
</div>
<div className="card-content cardBody">
<div className="row">
    <div className="col m4">
        <div className="row">
            <div className="col">
                <span className="gig-dash-subtitle">Budget</span>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <span className="gig-dash-total">{formatCurrencyValueJSX(this.props.budget)}</span>
            </div>
        </div>
    </div>

  
    <div className="col m4">
        <div className="row">
            <div className="col">
                <span className="gig-dash-subtitle">Expenses</span>
            </div>
        </div>
        <div className="row">
            <span className="gig-dash-total">{formatCurrencyValueJSX(this.props.spent)}</span>
        </div>
    </div>

    {/* Net */}
    <div className="col m4">
        <div className="row">
            <div className="col">
                <span className="gig-dash-subtitle">Net</span>
            </div>
        </div>
        <div className="row">
            <span className="gig-dash-total">{formatCurrencyValueJSX(this.props.net)}</span>
        </div>
    </div>
</div>
</div>
</div>
</div>
)}


}
export default Goal;