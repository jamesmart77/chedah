import React from 'react'
import API from '../../utils/API'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Multiselect } from '../Multiselect';
import $ from 'jquery'
import Modal from 'react-materialize'

// add goal modal
class ModalEditGoal2 extends React.Component {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  state = {
    userCategories: [],
    categories: [],
    name:'',
    budget:''
     
  }

  componentWillMount () {
    API.getUserCategories()
      .then(({data}) => {
        this.setState({userCategories: data})
      }).catch(err => {
      console.log('Error Categories')
      console.log(err)
    })

    API.getGigData(this.props.gigId).then(gigData => {
      this.setState(gigData)
    }).catch(console.log)
  }

  addGoalToGig () {
    const data = {}

    data.gigId = this.props.location.pathname.split('/')[2]
    data.name = this.state.name
    data.budget = this.state.budget
    data.categories = this.state.categories

    API.addGoalToGig(data).then(res => {
      this.props.refresh()
    }).catch(err => {
      console.log("We were unable to add a goal to the gig, here's the returned error message from the server")
      console.log(err)
    })
  }



  handleChange = event=> {
      this.setState({[event.target.name]: event.target.value})
    }

  // this is for the multi select
  getCategories = categories => {
      this.setState({ categories: categories })
  }
    
  handleClick (val) {
    console.log(`selected: `, val)
  }

  render () {
    return (
      <div
        id={this.props.id}
        style={{height: '70%'}}>
        <div className='modal-content'>
          <div className='col input-field s12'>
            <input
              onChange={this.handleChange}
              type='text'
              name='name'
              id='input_1'
               />
            <label className='active' htmlFor='input_1'>
              Goal Name
            </label>
          </div>
          <div className='col input-field s12'>
            <input
              onChange={this.handleChange}
              type='text'
              name='budget'
              id='input_2'
               />
            <label className='active' htmlFor='input_2'>
              Budget
            </label>
          </div>
          <div className='row'>
            <span>Select Expense Categories To Track:</span>
          </div>
        <Multiselect categories= { this.state.userCategories } getCategories={ this.getCategories.bind(this) }/>
    </div>
    </div>

    )
  }
}

export default ModalEditGoal2
