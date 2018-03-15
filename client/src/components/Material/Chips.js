import React from 'react'
import PropTypes from 'prop-types'
import './Chips.css'

const $ = require('jquery')

class GigChip extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      close: false,
      gig: props.gig || 'null',
      gigId: props.gigId || '',
      isDefault: props.isDefault || false
    }

    this._onClick = this._onClick.bind(this)
  }

  componentDidMount () {
    // $('.chips').material_chip();
    $(this.closeButton).on('click', this._onClick)
  }

  _onClick (event) {
    console.log(`Chip closed: `, event)
  }

  render () {
    const gigHref = this.state.gigId ? `/gigs/${this.state.gigId}` : '#'
    const cname = this.state.isDefault ? `default chip grow` : 'chip grow'
    return (

      <div className={cname + ' z-depth-0'}>
        <a href={gigHref}>
          {this.state.gig}
          {this.state.close ? <i ref={(ref) => (this.closeButton = ref)} className='close material-icons'>close</i> : null}
        </a>
      </div>

    )
  }
}

GigChip.propTypes = {
  close: PropTypes.bool,
  gig: PropTypes.string,
  gigId: PropTypes.string,
  isDefault: PropTypes.bool
}

GigChip.defaultProps = {
  close: false,
  gig: 'null',
  gigId: '',
  isDefault: false
}

export default GigChip
