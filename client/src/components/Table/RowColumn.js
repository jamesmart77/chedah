import React, { Component } from 'react';
import Moment from 'react-moment';


class RowColumn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            role: props.role || 'text',
            editable: props.editable || false,
            isEditing: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.focusTextInput = this.focusTextInput.bind(this);
    };

    handleClick() {
        if (this.state.editable) {
            this.setState({isEditing: !this.state.isEditing});
            console.log(`editing: ${!this.state.isEditing}`);
        }
    };

    handleEdit(event) {
        console.log(event);
    };

    focusTextInput() {
        this.textInput.focus();
    };

    render() {
        const isEditing = this.state.isEditing;
        let currentVal = this.state.value;

        // format the date
        if (this.state.role === 'date') {
            return(
                <td onClick={this.handleClick} data-value={this.state.value}>
                    <Moment format='lll'>
                        {this.state.value}
                    </Moment>
                </td>
            );
        };

        // format the gig column
        if (this.state.role === 'gig') {
            return(
                <td onClick={this.handleClick}>
                    <div className='chip'>{currentVal}</div>
                </td>
            );
        };

        // editable input
        if (this.state.isEditing) {
            return(
                <td
                    data-value={this.state.value}
                    onClick={this.focusTextInput}
                    >
                    <input
                        type={this.role}
                        ref={(input) => { this.textInput = input; }}
                        onChange={this.handleEdit}
                        defaultValue={currentVal}

                    />
                </td>
            );
        };


        return(
            <td onClick={this.handleClick}>
                {currentVal}
            </td>
        );
    };
};


export default RowColumn;
