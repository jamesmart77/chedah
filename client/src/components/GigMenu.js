import React from 'react';
import API from '../utils/API';
const $ = require('jquery');

// initialize by passing a `gigs` argument consisting of {name:, _id:}
class GigMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Gig:',
            id: null
        }
    }

    componentDidMount() {
        window.$(`.dropdown-button`).dropdown({hover: true, constrainWidth: false})
    }

    // menu change event
    menuChanged(event) {
        console.log(`gig menu changed: `, event.target);
        API.updateAccount({_id: this.props.account_id, gigId: event.target.getAttribute('datavalue')}).then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
        this.setState({name: event.target.getAttribute('name'), id: event.target.getAttribute('datavalue')})
    }

    // reset component
    reset() {
        this.setState({name: 'Gig:', id: null})
    }

    // render gig menu items
    renderListItems() {
        const gigs = this.props.gigs || []

        let listItems = gigs.map(gig =>
            <li key={gig._id}>
                <a onClick={this.menuChanged.bind(this)} name={gig.name} datavalue={gig._id} href="#!" style={{color: '#ababab69'}}>{gig.name}</a>
            </li>
        )

        listItems.unshift(<li key={0}><a  onClick={this.reset.bind(this)} href="#!">None</a></li>)
        return listItems
    }

    render() {
        var menuTitle = this.state.name
        const gigs = this.props.gigs || []
        gigs.forEach(gig => {
            if (gig._id == this.props.gigId) {
                menuTitle = gig.name
            }
        })

        return (
            <div>
                <a className="dropdown-button"  href='#!' data-activates="account-gig-menu">{menuTitle}<i className="material-icons right">arrow_drop_down</i></a>

                <ul id="account-gig-menu" className="dropdown-content">
                    {this.renderListItems()}
                </ul>
            </div>
        );
    }
}


export default GigMenu;
