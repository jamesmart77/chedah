import React, { Component } from 'react';

// actions for the current page
const actions = {
    dashboard: [
        {
            title: 'Add Account',
            icon: 'account_balance',
            id: 'action-add-account',
            color: 'teal darken-3',
            modal: 'add-account-modal'
        },
        {
            title: 'Add Gig',
            icon: 'work',
            id: 'action-add-gig',
            color: 'teal darken-4',
            modal: 'add-gig-modal'
        },
        {
            title: 'Add Goal',
            icon: 'work',
            id: 'action-add-goal',
            color: 'teal darken-4',
            modal: 'add-goal-modal'
        }
    ],
    accounts: [
        {
            title: 'Edit Account',
            icon: 'account_balance',
            id: 'action-edit-account',
            color: 'teal darken-4',
            modal: 'edit-account-modal'
        }, {
            title: 'Add Gig',
            icon: 'work',
            id: 'action-add-gig',
            color: 'teal darken-2',
            modal: 'add-gig-modal'
        }
    ],
    gigs: [
        {
            title: 'Add Goal',
            icon: 'work',
            id: 'action-add-goal',
            color: 'teal darken-4',
            modal: 'add-goal-modal'
        }, {
            title: 'Edit Gig',
            icon: 'work',
            id: 'action-edit-gig',
            color: 'teal darken-2',
            modal: 'edit-gig-modal'
        }
    ]
}


// materialize floating action button
class ActionButton extends Component {

    constructor(props) {
        super(props);

        let pathname = this.props.location.pathname || '/';
        let paths = pathname.split('/').filter(item => { return (item != '')})

        this.state = {
            path: (paths.length) ? paths[0] : 'home',
            commands: actions
        };

        this.handleClick.bind(this)
    };

    // return commands for the current page
    getCommands() {
        return this.state.commands[this.state.path] || []
    }

    handleClick(cmd) {
        console.log(`-> action clicked: `, cmd.target.id);
    }

    render() {
        const currentCommands = this.getCommands()
        if (!currentCommands.length) {
            return (
                <div className="fixed-action-btn" style={{bottom: '24px', right: '24px'}}>
                    <a className="btn-floating btn-large dashboard-action-btn disabled">
                        <i className="large material-icons">add</i>
                    </a>
                </div>
            )
        }

        const listItems = currentCommands.map((command, i) =>
            <li key={i}>
                <a data-target={command.modal} onClick={this.handleClick} id={command.id} className={"btn-floating modal-trigger " + command.color}>
                    <i id={command.id} className="material-icons">{command.icon}</i>
                </a>
                <a data-target={command.modal} onClick={this.handleClick} id={command.id} className="btn-floating modal-trigger mobile-fab-tip">{command.title}</a>
            </li>)

        return (
            <div className="fixed-action-btn" style={{bottom: '24px', right: '24px'}}>
                <a className="btn-floating btn-large dashboard-action-btn">
                    <i className="large material-icons">add</i>
                </a>
                <ul className="main-actions">
                    {listItems}
                </ul>
            </div>
        )
    };
};


export default ActionButton;
