import React from 'react';
import Select from 'react-select';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';



var Multiselect = createClass({
	displayName: 'CreatableDemo',
	propTypes: {
		hint: PropTypes.string,
		label: PropTypes.string
	},
	getInitialState () {
		return {
			multi: true,
			multiValue: [],
			options: [
				{ value: 'R', label: 'Red' },
				{ value: 'G', label: 'Green' },
				{ value: 'B', label: 'Blue' }
			],
			value: undefined
		};
	},
	handleOnChange (value) {
		const { multi } = this.state;
		if (multi) {
			this.setState({ multiValue: value });
		} else {
			this.setState({ value });
		}
	},
	render () {
		const { multi, multiValue, options, value } = this.state;
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label} </h3>
				<Select.Creatable
					multi={multi}
					options={options}
					onChange={this.handleOnChange}
					value={multi ? multiValue : value}
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
});



// class Multiselect extends React.Component {
//     state = {
//       selectedOption: '',
//     }
//     handleChange = (selectedOption) => {
//       this.setState({ selectedOption });
//       console.log(`Selected: ${selectedOption.label}`);
//     }
//     render() {
//       const { selectedOption } = this.state;
//       const value = selectedOption && selectedOption.value;
  
//       return (
//         <Select
//         //   className= "browser-default"
//           name="form-field-name"
//           value={value}
//           onChange={this.handleChange}
//           options={[
//             { value: 'one', label: 'One' },
//             { value: 'two', label: 'Two' },
//           ]}
//         />
//       );
//     }
//   }
  export default Multiselect;