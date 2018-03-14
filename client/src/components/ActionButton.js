import React, { Component } from 'react';

// actions for the current page
const actions = {
    dashboard: [
        {
            title: 'Add Gig',
            icon: 'icon-gig-icon',
            id: 'action-add-gig',
            modal: 'add-gig-modal'
        }, {
            title: 'Add Category',
            icon: 'icon-tag',
            id: 'action-add-category',
            color: 'teal darken-4',
            modal: 'add-category-modal'
        }
    ],
    accounts: [
        {
            title: 'Add Gig',
            icon: 'icon-gig-icon',
            id: 'action-add-gig',
            modal: 'add-gig-modal'
        }, {
            title: 'Add Category',
            icon: 'icon-tag',
            id: 'action-add-category',
            modal: 'add-category-modal'
        }
    ],
    accountsDetail: [
        {
            title: 'Edit Account',
            icon: 'icon-university',
            id: 'action-edit-account',
            modal: 'edit-account-modal'
        }, {
            title: 'Add Gig',
            icon: 'icon-gig-icon',
            id: 'action-add-gig',
            color: 'teal darken-3',
            modal: 'add-gig-modal'
        }, {
            title: 'Add Category',
            icon: 'icon-tag',
            id: 'action-add-category',
            modal: 'add-category-modal'
        }
    ],
    gigs: [
        {
            title: 'Add Gig',
            icon: 'icon-gig-icon',
            id: 'action-add-gig',
            modal: 'add-gig-modal'

        }, {
            title: 'Add Category',
            icon: 'icon-tag',
            id: 'action-add-category',
            modal: 'add-category-modal'
        }
    ],
    gigsDetail: [
        {
            title: 'Edit Gig',
            icon: 'icon-gig-icon',
            id: 'action-edit-gig',
            modal: 'edit-gig-modal'
        }, {
            title: 'Add Goal',
            icon: 'icon-flag-checkered',
            id: 'action-add-goal',
            modal: 'add-goal-modal'
        }, {
            title: 'Add Category',
            icon: 'icon-tag',
            id: 'action-add-category',
            modal: 'add-category-modal'
        }
    ]
}

// materialize floating action button
class ActionButton extends React.Component {

    constructor(props) {
        super(props);

        let pathname = this.props.location.pathname || '/';
        let paths = pathname.split('/').filter(item => { return (item !== '')})


        this.state = {
            path: (paths.length) ? paths[0] : 'home',
            commands: actions
        };

        this.handleClick.bind(this)
    };

    // return commands for the current page
    getCommands() {
        let pathname = this.props.location.pathname || '/';
        let paths = pathname.split('/').filter(item => { return (item !== '')})

        let mode = this.state.path || 'dashboard'
        if (paths.length > 1) {
            if (this.state.path == 'accounts') {
                mode = 'accountsDetail'
            }

            if (this.state.path == 'gigs') {
                mode = 'gigsDetail'
            }
        }


        return this.state.commands[mode] || []
    }

    handleClick(cmd) {
        console.log(`-> action clicked: `, cmd.target.id);
    }

    render() {
        const currentCommands = this.getCommands()
        if (!currentCommands.length) {
            return (<div></div>)
        }
        const colors = ['teal lighten-1', 'teal darken-3', 'teal darken-4', 'teal darken-5']

        // create list items
        const listItems = currentCommands.map((command, i) => <li key={i}>
            <a data-target={command.modal} onClick={this.handleClick} id={command.id} className={"btn-floating modal-trigger " + colors[i]}>
                <span className={command.icon}></span>
            </a>
            <a data-target={command.modal} onClick={this.handleClick} id={command.id} className="btn-floating modal-trigger mobile-fab-tip">{command.title}</a>
        </li>)

        return (
            <div className="fixed-action-btn" style={{
                bottom: '24px',
                right: '24px'
            }}>
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
