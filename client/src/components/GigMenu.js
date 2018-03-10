import React from 'react';
import API from '../utils/API';


// initialize by passing a `gigs` argument consisting of {name:, _id:}
class GigMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Gig:',
            id: null
        }
    }

    // menu change event
    menuChanged(event) {
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
        const menuId = `menu-gig-` + this.props._id

        return (
            <div>
                <a className="dropdown-button" href="#!" data-activates={menuId} style={{maxWidth: '200'}}>{this.state.name}<i className="material-icons right">arrow_drop_down</i></a>
                <ul id={menuId} className="dropdown-content">
                    {this.renderListItems()}
                </ul>
            </div>
        );
    }
}


export default GigMenu;
