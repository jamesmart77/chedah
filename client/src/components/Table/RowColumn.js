import React, { Component } from 'react';
import Moment from 'react-moment';


class RowColumn extends Component {

    constructor(props) {
        super(props);

        console.log(props.edit_callback);
        this.state = {
            name: props.name,
            value: props.value,
            role: props.role || 'text',
            editable: props.editable || false,
            isEditing: false
        };

        this.componentClicked = this.componentClicked.bind(this);
        this.componentUpdated = this.componentUpdated.bind(this);
    };

    componentClicked() {
        if (this.state.editable) {
            this.setState({isEditing: !this.state.isEditing});
        }
    };

    componentUpdated(e) {
        this.setState({value: e.target.value});
        // this.state.isEditing = false;
    };

    onBlur(role, e) {
        this.setState({
            isEditing: false
        })
        // call back to table here
        this.props.edit_callback(role, e.target.value);
    }

      onKeyPress(role, e) {
        if(e.key == 'Enter') {
            this.onBlur(role, e);
        }
    }

    render() {
        const isEditing = this.state.isEditing;
        let currentVal = this.state.value;

        // format the date
        if (this.state.role === 'date') {
            currentVal =  <Moment format='lll'>{this.state.value}</Moment>
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
                        type={this.role}
                        ref={(input) => { this.textInput = input; }}
                        onChange={this.componentUpdated}
                        defaultValue={currentVal}
                        onBlur={this.onBlur.bind(this, this.state.name)}
                        onKeyPress={this.onKeyPress.bind(this, this.state.name)}
                    />
                </td>
            );
        };


        return(
            <td role={this.role} onClick={this.componentClicked}>
                {currentVal}
            </td>
        );
    };
};


export default RowColumn;
