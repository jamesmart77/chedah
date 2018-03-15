import React from 'react'
import Select from 'react-select'

class Multiselect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      multi: true,
      multiValue: [],
      options: [],
      value: undefined
    }

    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange (value) {
    alert(value)
    console.log('value: ', value)
    value ? this.setState({ multiValue: value }, () => {
      this.state.getCategories(this.state.multiValue)
    }) : null
  }

  componentWillReceiveProps ({categories, goalCategories, getCategories}) {
    // The options are passed down from 'categories', those are just

    // this.setState({ options: options, getCategories: getCategories, goalCategories: goalCategories })
    // defaultCategories.map(value => this.setState({multiValue: value}))
    // defaultCategories
    // .map(value => this.handleOnChange(value))

    // this.setState({ getCategories: getCategories, goalCategories: goalCategories })
    // defaultCategories.map(value => this.handleOnChange(value))
    // this.setState({getCategories, getCategories})
    // goalCategories ? goalCategories.map(this.handleOnChange) : null
  }

  componentDidMount () {
    // (this.props.categories.length && alert(JSON.stringify(this.props.categories)))
    { this.props.categories.length && console.log('this.props.categories: ', this.props.categories) }
    { this.props.categories.length && this.props.categories.map(value => this.setState({multiValue: value})) }
    // {console.log('this.props.categories: ', this.props.categories)}
  }

  render () {
    const { multiValue, options, value } = this.state
    return (
      <div className='section multiselectStyle'>
        <h3 className='section-heading'>{this.props.label} </h3>
        <Select.Creatable
          multi
          options={this.props.categories || []} // These are the options, the user can select from, these are supplied by us.
          onChange={this.handleOnChange.bind(this)}
          value={multiValue} // This is the value we are trying update
        />
      </div>
    )
  }
}
export default Multiselect
