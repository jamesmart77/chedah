import React from 'react'
// import { Link } from "react-router-dom"
import { Row, Container } from '../../components/Grid'
import API from '../../utils/API'
import GigSummary from '../../components/GigView/GigSummary'
import ExpenseSummary from '../../components/GigView/ExpenseSummary'
import GoalSummary from '../../components/GigView/GoalSummary'
import TransactionSummary from '../../components/Transactions/TransactionSummary'
// import ReactDataGrid from 'react-data-grid'
import update from 'immutability-helper'
import { Modal, Button, Input } from 'react-materialize' 
import { ModalAddGoal } from '../../components/Modals'

class GigDetail extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      gigId: this.props.location.pathname.split('/')[2],
      // gigId: this.props.match ? this.props.match.params.id : this.props.location.pathname.split("/")[2],
      time: ['2018-02-01', '2018-02-28'],
      gig: {},
      // update a goal
      goal: {
        // name: 'Spend Less on Speeding Tickets',
        // budget: 500.00,
        // categories: ['travel']
      },
      goalName: 'Spend Less On Tolls',
      goalBudget: 200.00,
      goalCategories: []
    }
  }

  // ////////////////////////////////

  // need budget goal gig
  handleChange = e => {
    const {name, value} = e.target
    const goal = {...this.state.goal}
    goal[name] = value
    this.setState({goal})
  }

  handleCategory = e => {
    const {name, value} = e.target
    const goal = {...this.state.goal}
    console.log('goal')
    console.log(goal)
    console.log('goal[name]')
    console.log(goal[name])
    goal[name] = goal[name] ? value : null
    // goal[name] = value
    // goal[name] = goal[name] ? goal[name] : new Object({[name]: name})
    // goal[name].value = value
    // goal[name].checked = !goal[name].checked
    console.log(e.target)
    console.log(name)
    console.log(goal[name])
    // goal[name].checkbox = {}
    // goal[name].checkbox.value = value
    // goal[name] ? goal[name].checkbox.checked = !this.state[name].checked : null
    this.setState(goal)
  }

  handleSubmit = e => {
  }

  addGoalToGig () {
    const data = {}
    data.gigId = this.state.gigId
    data.goal = this.state.goal
    alert(JSON.stringify(data, null, 2))
    API.addGoalToGig(data)
      .then(res => {
        this.loadGig()
      })
      .catch(err => {
        alert('what happened?')
      })
  }

  editGoal (id) {
    alert(id)
  }

  deleteGoal = id => {
    API.deleteGoal(id)
      .then(res => this.props.refresh())
      .catch(err => console.log(err))
  }

  editTransaction () {
    // edit vendor name, category?, gig
  }

  getCurrentMonth () {
    // show 1 month view on gig detail pg
  }

  // TRANSACTIONS
  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    let rows = this.state.transactions.slice()

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i]
      let updatedRow = update(rowToUpdate, {$merge: updated})
      rows[i] = updatedRow
    }

    // Update the db here if successful
    this.setState({ transactions: rows })
  // else re rerender
  }

  // Initial Load w/ gigID passed along
  // loadGig(gigId){
  //     API.getUser()
  //       .then(user => {
  //         console.log("gig detail user ---------------------")
  //             console.log(user)
  //       })
  //       .catch(console.log)

  // }

  // upon page load, this function pulls in the gig from props into this page's state
  componentWillReceiveProps (newProps) {
    this.setState({
      gig: newProps.user.gigs.find(gig => gig._id === this.state.gigId)
    })
  }

  render () {
    return (
      <Container fluid>
        <div className='row p-0 m-0'>
          <div className='col s6'>
            <h4 className='dash-title'>{this.state.gig.name} Dashboard</h4>
          </div>
          <div className='col s6'>
          </div>
        </div>
        <div className='row'>
          <div className='col s12 m5 l4'>
            <GigSummary gigSummary={this.state.gig} addGoalToGig={this.addGoalToGig.bind(this)} />
            {this.state.gig.spendingByCategory && <ExpenseSummary total={this.state.gig.net} expenses={this.state.gig.spendingByCategory} gigName={this.state.gig.name} />}
            {/* {this.state.gig.spendingByCategory  && <ExpenseSummary total={this.state.gig.net} expenses={this.state.gig.spendingByCategory} gigName={this.state.gig.name}/>} */}
            {/* {this.state.gig.spendingByCategory  ? <ExpenseSummary total={this.state.gig.net} expenses={this.state.gig.spendingByCategory} gigName={this.state.gig.name}/> : <h1>WTF IS GOIN ON</h1>} */}
          </div>
          <div className='col s12 m7 l8'>
            {/* if theres a goal, show the GoalSummary component */}
            {this.state.gig.goals && <GoalSummary user={this.props.user} goals={this.state.gig.goals} editGoal={this.editGoal.bind(this)} editGoal={this.deleteGoal.bind(this)}  refresh={ this.props.refresh } />}
            {/* <TransactionSummary columns={this.state.grid.columns} data={this.state.transactions} handleGridRowsUpdated={this.handleGridRowsUpdated}/> */}
            {/* <ModalAddGoal gigId={'5a91b813513541155c819fa4'}/> */}
          </div>
        </div>
      </Container>
    )
  }

}

export default GigDetail
