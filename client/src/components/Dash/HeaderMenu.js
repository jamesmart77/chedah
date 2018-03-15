import React from 'react'

// dropdown menu for account overview
class HeaderMenu extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      id: props.id,
      uid: 'dropdown-menu',
      items: props.items || []
    }
  }

  handleClick (item) {
    console.log(`-> item clicked: `, item)
  }

  render () {
    const trigger = (this.state.uid + '-' + this.state.id)
    console.log(`trigger: `, trigger)
    const listItems = this.state.items.map(item =>
      <li key={item.id}><a href='#!' onClick={this.handleClick.bind(this, item.name)}>{item.name}</a></li>
    )

    return (
      <div className='col right'>
        <a className='dropdown-button account-actions' href='' data-activates={trigger}><i className='material-icons'>arrow_drop_down</i></a>
        <ul id={trigger} className='dropdown-content'>
          {listItems}
        </ul>
      </div>
    )
  }
}

export default HeaderMenu
