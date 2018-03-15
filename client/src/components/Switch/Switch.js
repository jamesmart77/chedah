import React from 'react';

class Switch extends React.Component {
  constructor(props) {
    super(props)
    
    this.handleClick.bind(this)
  }
  
handleClick(){
    const dateRange = this.state.dateRange === 'month' ? 'year' : 'month'
    this.setState({dateRange: dateRange}, ()=>{
        this.props.refresh(this.state.dateRange)
    })
}

componentDidMount(){
    this.setState({dateRange: this.props.dateRange})
}

  render() {
    return <div className='col s3'>
    <div className="switch">
    <label>
        Monthly
        <input type="checkbox" onClick={this.handleClick.bind(this)} checked={this.props.dateRange==='month' ? false : true} />
        <span className="lever" />
        Yearly
    </label>
    </div>
</div>
  }

}

export default Switch;
