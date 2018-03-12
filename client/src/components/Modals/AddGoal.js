import React from 'react'
import API from '../../utils/API'

// add goal modal
class ModalAddGoal extends React.Component {

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
        console.log('LOOK HERE categories!')
        console.log(data)
      }).catch(err => {
      console.log('Error Categories')
      console.log(err)
    })

    API.getGigData(this.props.gigId).then(gigData => {
      this.setState(gigData)
    // console.log(`-> ModalAddGoal: `, gigData)
    }).catch(console.log)
  }

  addGoalToGig () {
    const data = {}

    data.gigId = this.props.gigId
    data.goal = {}

    API.addGoalToGig(data).then(res => {
      this.loadGig()
    }).catch(err => {
      alert('what happened?')
    })
  }

  handleChange = event=> {
    console.log('event.target.name')
      console.log(event.target.name)
      console.log(event.target.value)
    //   {name: value} = e.target
      this.setState({[event.target.name]: event.target.value});
    }

  handleClick (val) {
    console.log(`selected: `, val)
  }

  render () {
    return (
      <div
        id='add-goal-modal'
        className='modal'
        data-modal='data-modal'
        style={{height: '70%'}}>
        <div className='modal-content'>
          <div className='modal-title'>
            <h4>Add a Goal</h4>
          </div>
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
          <div className='row'>
            <div className='col s6'>
              <select className="browser-default" onChange={this.handleChange} name='categories' multiple='multiple'>
                {this.state.userCategories.map(category => <option value={category._id} key={category._id}>
                                                         {category.name}
                                                       </option>)}
              </select>
            </div>
            <div className='col s6'></div>
          </div>
          <div className='modal-footer'>
            <section>
              <button className='btn waves-effect waves-light btn-flat modal-action modal-close deep-orange darken-3 white-text'>
                Cancel
              </button>
              &nbsp;
              <button onClick={() => this.addGoalToGig(this.props.gigId)} className='btn waves-effect waves-light modal-action modal-close teal'>
                Apply
              </button>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalAddGoal
