import React from 'react'
import PropTypes from 'prop-types'

const $ = require('jquery')
/*
var materialChipsDefaults = {
  data: [],
  placeholder: '',
  secondaryPlaceholder: '',
  autocompleteOptions: {}
};
*/

class ChipInput extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      id: props.id,
      initial: props.initial,
      autocomplete: props.autocomplete
    }

    this._onClick = this._onClick.bind(this)
  }

  componentDidMount () {
    let chipOptions = {}
    if (this.state.autocomplete.length > 0) {
      var acdata = {}
      chipOptions['autocompleteOptions'] = acdata
    }

    $('.' + this.state.id).material_chip()
  }

  _onClick (event) {
    console.log(`clicked: `, event)
  }

  render () {
    var cname = (this.state.initial.length > 0) ? 'chips-initial' : 'chips'
    if (this.state.autocomplete.length > 0) {
      cname = 'chips-autocomplete'
    }

    return (
      <div className={cname} />
    )
  }
}

ChipInput.propTypes = {
  id: PropTypes.string,
  initial: PropTypes.array,
  autocomplete: PropTypes.array
}

ChipInput.defaultProps = {
  id: 'chips-input',
  initial: [],
  autocomplete: []
}

export default ChipInput
