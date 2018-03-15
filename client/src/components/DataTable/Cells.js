import React from 'react';
import Moment from 'react-moment';
import {formatCurrencyValueJSX} from '../../utils/currency';
import { GigMenu } from '../../components/Menus'
import './Cell.css';

const $ = require('jquery');



class Cell extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,   // transaction id
            row: props.row,
            column: props.column,
            role: props.role,
            editable: props.editable || false,
            isEditing: false,
            isUpdated: false,
            align: props.align || 'left',
            autocomplete: props.autocomplete || []
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    };

    // get a dictionary of autocomplete values
    getAutocomplete() {
        let autoComplete = {}
        let acdata = this.props.autocomplete || []
        acdata.forEach(item => {
            autoComplete[String(item.name)] = null
        })
        return autoComplete
    }

    ///  EVENT HANDLERS  ///

    // focus handler
    handleFocus(e) {
        e.target.select();
    };

    // click handler
    handleClick(e) {
        if (this.state.editable) {
            const row = e.target.getAttribute('row') || -1;
            const column = e.target.getAttribute('column') || -1;
            this.setState({isEditing: !this.state.isEditing});
        } else {
            return;
        }
    };

    // return the cell html id
    getId() {
        return `${this.props.id}-${this.props.row}-${this.props.column}`
    }

    // return the cell alignment
    getAlignment() {
        return (this.state.role === 'amount') ? 'right-align' : (this.state.role === 'gig') ? 'center-align' : 'left-align';
    }

    // return an editor for the gig cell
    gigEditor() {
        const triggerId = this.getId()
        const autoComplete = (this.state.autocomplete.length > 0) ? 'custom-class editable-cell autocomplete' : 'custom-class editable-cell autocomplete'
        return(
            <td
                id={triggerId}
                row={this.props.row}
                column={this.props.column}
                role={this.role}
                data-value={this.state.value}>

                <GigMenu
                    menuId={triggerId}
                    gigs={this.props.autocomplete}
                    // menuChanged={this.menuChanged.bind(this)}
                />
            </td>
        )
    }

    textEditor(value, databaseId) {
        const alignment = this.getAlignment();
        const triggerId = this.getId()
        const autoComplete = (this.state.autocomplete.length > 0) ? 'custom-class editable-cell autocomplete' : 'custom-class editable-cell autocomplete'

        return (
            <td
                row={this.props.row}
                column={this.props.column}
                className={alignment}
                role={this.role}
                onClick={this.handleClick}>

                <input
                    id={triggerId}
                    row={this.props.row}
                    column={this.props.column}
                    role={this.role}
                    className={autoComplete}
                    hidden={false}
                    data-value={databaseId}
                    type='text'
                    ref='textInput'
                    defaultValue={value}
                    onBlur={this.onBlur.bind(this, this.state.role)}
                    onKeyPress={this.onKeyPress.bind(this, this.state.role)}
                    onFocus={this.handleFocus}
                    onClick={this.handleClick}
                />
            </td>
        )
    }

    componentDidUpdate() {
        if (this.state.editable) {
            if (this.refs.textInput) {
                this.refs.textInput.select();
            }
        }
    }

    // callback to the parent row
    onBlur(role, e) {
        if (this.state.isEditing === true) {
            // compare the values
            let oldValue = this.props.value;
            let newValue = e.target.value
            console.log(`edited: `, newValue);
            // if the old value doesn't match the new one...
            if (oldValue === newValue || !newValue) {
                this.setState({
                    isEditing: false,
                    isUpdated: true
                })
                return
            }

            if (role == 'gig') {
                let gigs = this.props.autocomplete || []
                gigs.forEach(gig => {
                    if (gig.name == newValue) {
                        // TODO: check because category is using `_id`
                        newValue = gig.id
                        console.log(`matched: `, newValue);
                    }
                })

            }

            this.props.columnEdited({
                value: {
                    oldValue: oldValue,
                    newValue: newValue
                },
                role: this.state.role,
                location: {
                    row: e.target.getAttribute('row'),
                    column: e.target.getAttribute('column')
                }
            })

            this.setState({
                isEditing: false
            })
        }
    }

    onKeyPress(role, e) {
        if(e.key === 'Enter') {
            // console.log(`enter pressed`);
            this.onBlur(role, e);
        }
    }

    menuChanged(value) {
        console.log(`menu changed: `, value);
    }


    render() {
        // cell alignment
        let alignment = this.getAlignment()

        // menu trigger id
        let triggerId = `${this.props.id}-${this.props.row}-${this.props.column}`

        // default cell value
        let currentVal = this.props.value;

        if (this.state.isUpdated) {
            currentVal = (<span className='updated'>{currentVal}</span>)
        }

        // format the date column
        if (this.state.role === 'date') {
            currentVal =  <Moment format='lll'>{this.props.value}</Moment>
        };

        // format the amount column
        if (this.state.role === 'amount')  {
            currentVal = currentVal.toFixed(2)
        };

        // are we currently in editing state?
        const isEditing = this.state.isEditing;


        // format the gig column
        if (this.state.role === 'gig' && !isEditing)  {
            let gigName;
            let autocomplete = this.props.autocomplete || []
            autocomplete.forEach(gig => {
                if (gig.id == currentVal) {
                    gigName = gig.name;
                }
            })

            // construct a fake chip because of a fucking materialize chip select bug:
            // https://github.com/Dogfalo/materialize/issues/5618
            currentVal = (<div className='fake-chip'><a className='dropdown-trigger' data-target={triggerId} href='#!'>{gigName}</a></div>);
        };


        // editable input for gigs
        if (isEditing) {
            if (this.state.role === 'gig') {
                // return this.gigEditor()
            }



            let editor = this.textEditor(currentVal);
            let autoComplete = this.getAutocomplete()
            setTimeout(() => window.$(`input.autocomplete`).autocomplete({data: autoComplete}), 100)
            // return a regular editor
            return editor
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


export default Cell;
