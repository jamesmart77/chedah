import React from "react";
import "./GigView.css";
import {formatCurrencyValueJSX} from '../../utils/currency';
import {Modal, Button } from 'react-materialize';
import { Multiselect } from '../Multiselect'
import API from '../../utils/API'

class Goal extends React.Component { 

    state = {
        userCategories: [],
        categories: this.props.categories,
        name: this.props.name,
        budget: this.props.budget
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

    handleChange = event=> {
        this.setState({[event.target.name]: event.target.value})
      }


    editGoal () {
        const data = {}
    
        data.goalId = this.props.id
        data.name = this.state.name
        data.budget = this.state.budget
        data.categories = this.state.categories
    
        API.updateGoal(data).then(res => {
          this.props.refresh()
        }).catch(err => {
          console.log("We were unable to edit the goal, here's the returned error message from the server")
          console.log(err)
        })
      }

      deleteGoal () {
        const data = {}
    
        data.goalId = this.props.id
       
        API.deleteGoal(data).then(res => {
             console.log("button was pushed")
          this.props.refresh()
        }).catch(err => {
          console.log("unable to delete the goal")
          console.log(err)
        })
      }

render() {
return (
<div className="card">
<div className="card-content cardHeader">
<div className="row">
    <div className="col s10 l11">
        <span className="card-title"><span className="primaryHeaderText">Goal:</span> <span className="secondaryHeaderText">{this.props.name}</span></span>
    </div>
    <div className="col s2 l1">
    <Modal
        header= {<div className="modalTitle">Edit Goal</div>}
        trigger={<a href="!#"><i className="material-icons iconStyleMed">settings</i></a>}
        actions={
                    <section className="modalSpace">
                    <Button waves='light' className="modal-action modal-close teal" onClick={this.editGoal.bind(this)} >Update Goal</Button>&nbsp;
                    <Button waves='light' className="modal-action modal-close deep-orange darken-3 white-text" onClick={this.deleteGoal.bind(this)} >Delete Goal</Button>
                    
                    </section>
                }>
          
          <div className='col input-field s12'>
            <input className='input-field' onChange={this.handleChange} type='text' name='name' id='input_1' defaultValue={ this.props.name } />
            <label className='active' htmlFor='input_1'> Goal Name </label>
          </div>
         
          <div className='col input-field s12'>
            <input className='input-field' onChange={this.handleChange} type='number' name='budget' id='input_2' defaultValue={ this.props.budget } />
            <label className='active' htmlFor='input_2'> Goal Budget </label>
          </div>
          <div className='row'>
            <span>Select Expense Categories To Track:</span>
          </div>
          <Multiselect categories= { this.state.userCategories } getCategories={ this.getCategories.bind(this) } goalCategories = { this.props.categories } />
        <br/>
        <br/>
        <br/>
       
    </Modal>
    </div>
</div>
<div className="card-content cardBody">
<div className="row">
    <div className="col s12 l4">
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

  
    <div className="col s12 l4">
        <div className="row">
            <div className="col">
                <span className="gig-dash-subtitle">Expenses</span>
            </div>
        </div>
        <div className="row">
            <span className="gig-dash-total">{formatCurrencyValueJSX(this.props.spent)}</span>
        </div>
    </div>


    <div className="col s12 l4">
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