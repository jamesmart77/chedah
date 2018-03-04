import React, { Component } from 'react';
import Moment from 'react-moment';




class RowColumn extends Component {

    constructor(props) {
        super(props);
        console.log(`-> Column: `, props);
        this.state = {
            role: props.role || 'text',
            editable: props.editable || false,
            isEditing: false,
            align: props.align || 'left'
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    };

    get editor() {
        return <input defaultValue={this.props.value}/>
    }

    handleFocus(e) {
        console.log(`focusing...`);
        e.target.select();
    };

    handleClick(e) {
        console.log(`click event: `, e);
        if (this.state.editable) {
            this.setState({isEditing: !this.state.isEditing});
        } else {
            return;
        }
    };

    componentDidUpdate() {
        if (this.state.editable) {
            if (this.refs.textInput) {
                this.refs.textInput.select();
            }
        }
    }

    componentUpdated(e) {
        console.log(`component updated...`);
        this.setState({value: e.target.value});
        // this.state.isEditing = false;
    };

    onBlur(role, e) {
        this.setState({
            isEditing: false
        })
        // call back to table here
        console.log(`blur event: ${e.target.value}`);
        // this.props.value = e.target.value;
        // this.props.edit_callback(role, e.target.value);
    }

      onKeyPress(role, e) {
        if(e.key === 'Enter') {
            console.log(`enter pressed`);
            this.onBlur(role, e);
        }
    }

    render() {
        const isEditing = this.state.isEditing;
        let currentVal = this.props.value;

        // format the date
        if (this.state.role === 'date') {
            currentVal =  <Moment format='lll'>{this.props.value}</Moment>
        };

        // format the gig column
        if (this.state.role === 'gig') {
            currentVal = <div className='chip'>{currentVal}</div>;
        };

        // editable input
        if (this.state.isEditing) {
            return(
                <td
                    data-value={this.state.value}
                    >
                    <input
                        hidden={false}
                        type={this.role}
                        ref='textInput'
                        defaultValue={currentVal}
                        onBlur={this.onBlur.bind(this, this.state.name)}
                        onKeyPress={this.onKeyPress.bind(this, this.state.name)}
                        onFocus={this.handleFocus}
                        onClick={this.handleClick}
                    />
                </td>
            );
        };


        return(
            <td role={this.role} onClick={this.handleClick}>
                {currentVal}
            </td>
        );
    };
};


export default RowColumn;
