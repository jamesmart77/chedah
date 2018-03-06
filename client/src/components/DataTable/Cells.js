import React, { Component } from 'react';
import Moment from 'react-moment';
const $ = require('jquery');


class RowColumn extends Component {

    constructor(props) {
        super(props);
        console.log(`      -> Column: `, props);
        this.state = {
            row: props.row,
            column: props.column,
            role: props.role,
            editable: props.editable || false,
            isEditing: false,
            align: props.align || 'left',
            autocomplete: ['Starbucks', 'Autozone', 'Payroll']
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    };

    ///  EVENT HANDLERS  ///

    // focus handler
    handleFocus(e) {
        e.target.select();
    };

    // click handler
    handleClick(e) {
        if (this.state.editable) {
            console.log(`cell: `, e.target.row, e.target.column);
            this.setState({isEditing: !this.state.isEditing});
        } else {
            return;
        }
    };

    // return an editor for the component (not currently used)
    get editor() {
        return <input defaultValue={this.props.value}/>
    }

    componentDidUpdate() {
        if (this.state.editable) {
            if (this.refs.textInput) {
                this.refs.textInput.select();
            }
        }
    }

    onBlur(role, e) {
        this.setState({
            isEditing: false
        })
        // call back to table here
        console.log(e.target.value);
        console.log(e.target.row);
        this.props.columnEdited({value: e.target.value, role: this.state.role})

    }

      onKeyPress(role, e) {
        if(e.key === 'Enter') {
            // console.log(`enter pressed`);
            this.onBlur(role, e);
        }
    }

    render() {
        let alignment = (this.state.role === 'amount') ? 'right-align' : (this.state.role === 'gig') ? 'center-align' : 'left-align';
        const isEditing = this.state.isEditing;
        let currentVal = this.props.value;
        // format the date
        if (this.state.role === 'date') {
            currentVal =  <Moment format='lll'>{this.props.value}</Moment>
        };

        // format the gig column
        if (this.state.role === 'gig' && !this.state.isEditing)  {
            currentVal = <div className='chip'>{currentVal}</div>;
        };


        // editable input
        if (this.state.isEditing) {
            return(
                <td
                    row={this.props.row}
                    column={this.props.column}
                    role={this.role}
                    data-value={this.state.value}
                    >
                    <input
                        row={this.props.row}
                        column={this.props.column}
                        role={this.role}
                        className='editable-cell autocomplete'
                        hidden={false}
                        type={this.role}
                        ref='textInput'
                        defaultValue={currentVal}
                        onBlur={this.onBlur.bind(this, this.state.role)}
                        onKeyPress={this.onKeyPress.bind(this, this.state.role)}
                        onFocus={this.handleFocus}
                        onClick={this.handleClick}
                    />
                </td>
            );
        };

        // plain column
        return(
            <td
                row={this.props.row}
                column={this.props.column}
                className={alignment}
                role={this.role}
                onClick={this.handleClick}>
                {currentVal}
            </td>
        );
    };
};


export default RowColumn;
