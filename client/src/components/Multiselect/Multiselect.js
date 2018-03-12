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
    console.log('this handleOnChange')
    console.log(this)
    console.log('this.state')
    console.log(this.state)
		const { multi } = this.state.multi;
		if (multi) {
      console.log('this.state.multi')
      console.log(this.state.multi)
			this.setState({ multiValue: value });
		} else {
      console.log('this.state.value')
      console.log(this.state.value)
			this.setState({ value });
    }
    this.state.getCategories(this.state.multiValue)
  }

  componentWillReceiveProps({categories, getCategories}){
    console.log('this componentWillReceiveProps')
    console.log(this)
    // console.log(getCategories)
    // getCategories('da fuck')
    const options = categories.map(oldCat => {
      const newCat = {}
      newCat.label = oldCat.name
      newCat.value = oldCat._id
      return newCat
    })
    this.setState({options: options, getCategories: getCategories})
  }

	render () {
		const { multi, multiValue, options, value } = this.state;
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label} </h3>
				<Select.Creatable
					multi={this.state.multi}
					options={options}
					onChange={this.handleOnChange.bind(this)}
					value={multiValue}
				/>
				<div className="hint">{this.props.hint}</div>
				<div className="checkbox-list">
					<label className="checkbox">
						<input
							type="radio"
							className="checkbox-control"
							checked={multi}
							onChange={() => this.setState({ multi: true })}
						/>
						<span className="checkbox-label">Multiselect</span>
					</label>
					<label className="checkbox">
						<input
							type="radio"
							className="checkbox-control"
							checked={!multi}
							onChange={() => this.setState({ multi: false })}
						/>
						<span className="checkbox-label">Single Value</span>
					</label>
				</div>
			</div>
		);
	}
};

export default Multiselect;