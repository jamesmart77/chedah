import React, { Component } from 'react'
import Goal from './Goal'

// materialize goal list
class GoalList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      collapsed: false
    }
  }

  handleClick () {
    this.setState({collapsed: !this.state.collapsed})
  }

  render () {
    var goals = []
    const gigs = this.props.user.gigs || []
    gigs.forEach(gig => {
      gig.goals.forEach(goal => {
        let goalData = goal
        goalData.gigId = gig._id
        goalData.gigName = gig.name
        goals.push(goalData)
      })
    })

    const arrowName = (this.state.collapsed === false) ? 'arrow_drop_down' : 'arrow_drop_up'
    return (

      <ul className='goal-summary collapsible collection with-header' datacollapsible='expandable'>
        <li>
          {/* Header */}
          <div className='collapsible-header listHeader' onClick={this.handleClick.bind(this)}>
            <h6><i className='material-icons iconStyleSmall'>pie_chart</i> Goals</h6>
            <i className='header-expand-state material-icons'>{arrowName}</i>
          </div>

          {/* Body insert_chart */}
          {goals.map(goal => (
            <Goal
              key={goal._id}
              {...goal}
            />
          ))}
        </li>
      </ul>
    )
  };
}

export default GoalList
