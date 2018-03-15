import React, { Component } from 'react'
// import Moment from 'react-moment';        // not currently using

// const dateToFormat = '1976-04-19T12:59-0500';
// <Moment>{dateToFormat}</Moment>

// materialize sidebar alert
class Alert extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.id,
      name: props.name,
      value: props.value || '',
      unread: true,
      date: props.date,
      symbol: props.symbol || 'chat',
      color: props.color || 'deep-orange accent-3',
      clickCount: 0
    }
    this.handleClick = this.handleClick.bind(this)
  };

  handleClick () {
    this.setState({unread: false, clickCount: this.state.clickCount + 1, symbol: 'check_circle', color: 'grey lighten-1'})
  }

  componentDidUpdate () {
    if (this.state.clickCount > 0) {
      console.log(`alert read: ${this.state.unread} (${this.state.id})`)
    }
  }

  render () {
    const iconCls = `large material-icons circle ${this.state.color}`
    return (
      <a className='collection-item avatar border-none' href='#!' onClick={this.handleClick}>
        <i className={iconCls}>{this.state.symbol}</i>
        <span className='line-height-0 alert-name'>{this.state.name}</span>
        <span className='medium-small right blue-grey-text text-lighten-3'>{this.state.date}</span>
        <p className='medium-small blue-grey-text text-lighten-3'>{this.state.value}</p>
      </a>
    )
  }
}

export default Alert
