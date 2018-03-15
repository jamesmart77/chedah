import React from 'react'
import { Container } from '../../components/Grid'
import API from '../../utils/API'
import GigSummary from '../../components/GigView/GigSummary'
import ExpenseSummary from '../../components/GigView/ExpenseSummary'
import GoalSummary from '../../components/GigView/GoalSummary'
import update from 'immutability-helper'

class GigDetail extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      gigId: this.props.location.pathname.split('/')[2],
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
    goal[name] = goal[name] ? value : null
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


  // getCurrentMonth () {
  //   show 1 month view on gig detail pg
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
            {this.state.gig.spendingByCategory && <ExpenseSummary total={this.state.gig.moneyOut} expenses={this.state.gig.spendingByCategory} gigName={this.state.gig.name} />}

          </div>
          <div className='col s12 m7 l8'>
            {/* if theres a goal, show the GoalSummary component */}
            {this.state.gig.goals && this.state.gig.goals.length ? <GoalSummary user={this.props.user} goals={this.state.gig.goals}  refresh={ this.props.refresh } /> : <div className="teal-text"><h6>Please add a goal!</h6></div> }
          </div>
        </div>
      </Container>
    )
  }

}

export default GigDetail
