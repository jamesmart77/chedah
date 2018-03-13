import React from 'react';
import Select from 'react-select';

class Multiselect extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      multi: true,
      multiValue: [],
      options: [],
      value: undefined
    }
  }

	handleOnChange (value) {
			this.setState({ multiValue: value }, ()=>{
				this.state.getCategories(this.state.multiValue)
			})
  }

  componentWillReceiveProps({categories, goalCategories, getCategories}){
    const options = categories.map(oldCat => {
      const newCat = {}
      newCat.label = oldCat.name
      newCat.value = oldCat._id
      return newCat
    })
    const defaultCategories = goalCategories ? goalCategories : []
    
    this.setState({ options: options, getCategories: getCategories, goalCategories: goalCategories })
    defaultCategories.map(value => this.setState({multiValue: value}))
  }

	render () {
		const { multiValue, options, value } = this.state;
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label} </h3>
				<Select.Creatable
					multi={true}
					options={options}
					onChange={this.handleOnChange.bind(this)}
          value={multiValue}
				/>
			</div>
		);
	}

}
export default Multiselect;