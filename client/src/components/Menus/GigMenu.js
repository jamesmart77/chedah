import React from 'react';
import PropTypes from 'prop-types';

const $ = require('jquery');


// initialize by passing a `gigs` argument consisting of {name:, _id:}
class GigMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuId: this.props.menuId,
            currentId: '',
            selectedId: props.id || null,
            gigs: props.gigs || []
        }
        this.handleChange = this.handleChange.bind(this)
    }

    // menu change event
    handleChange(event) {
        console.log(`selected: `, event.target.getAttribute('datavalue'));
        window.$('select').material_select();
        this.setState({selectedId: event.target.getAttribute('datavalue')})
        this.props.menuChanged(event.target.getAttribute('datavalue'))
    }

    // menu click event
    menuClicked(event) {
        console.log(`selected: `, event.target.getAttribute('datavalue'));
        window.$('select').material_select();
        this.setState({selectedId: event.target.getAttribute('datavalue')})
        this.props.menuChanged(event.target.getAttribute('datavalue'))
    }

    componentDidMount() {
        window.$('select').material_select();
        window.$('.dropdown-trigger').dropdown();
    }

    componentDidUpdate() {
        // window.$('select').material_select();
    }

    // render gig menu items
    renderListItems() {
        const gigs = this.state.gigs || []
        console.log(`GigMenu: gigs -> `, gigs);
        let listItems = gigs.map((gig, i) =>
            <li key={i} value={gig._id}><a href='#1' onClick={this.menuClicked.bind(this)}>{gig.name}</a></li>
        )
        listItems.unshift(<li className='disabled' key={gigs.length} value="">None</li>)
        return listItems
    }

    render() {
        // const menuId = `menu-gig-` + this.props._id
        // const menuId = `menu-gig-` + this.props._id
        const isSelected = (this.state.currentId == this.state.selectedId)
        const buttonColor = isSelected ? 'teal' : 'red'
        const icon = isSelected ? 'done' : 'clear'
        return (
                <ul id={this.props.menuId} className='dropdown-content'>
                    {/* <option className="disabled">None</option> */}
                    {this.renderListItems()}
                </ul>

        );
    }
}


GigMenu.propTypes = {
    selectedId: PropTypes.string,
    gigs: PropTypes.array
}


GigMenu.defaultProps = {
    selectedId: '',
    gigs: []
}


export default GigMenu;
