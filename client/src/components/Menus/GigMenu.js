import React from 'react';
import PropTypes from 'prop-types';

const $ = require('jquery');


// initialize by passing a `gigs` argument consisting of {name:, _id:}
class GigMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
    }

    componentDidMount() {
        window.$('select').material_select();
    }

    componentDidUpdate() {
        // window.$('select').material_select();
    }

    // render gig menu items
    renderListItems() {
        const gigs = this.state.gigs || []
        console.log(`gigs: `, gigs);
        let listItems = gigs.map((gig, i) =>
            <option key={i} value={gig._id}>{gig.name}</option>
        )
        listItems.unshift(<option className='disabled' key={gigs.length} value="">None</option>)
        return listItems
    }

    render() {
        // const menuId = `menu-gig-` + this.props._id
        // const menuId = `menu-gig-` + this.props._id
        const isSelected = (this.state.currentId == this.state.selectedId)
        const buttonColor = isSelected ? 'teal' : 'red'
        const icon = isSelected ? 'done' : 'clear'
        return (
            <div className="row listitems valign-wrapper">
                <div className="col">
                    <select onChange={this.handleChange}>
                        {/* <option className="disabled">None</option> */}
                        {this.renderListItems()}
                    </select>
                </div>

                <div className="col">
                    <a className={`btn-floating waves-effect waves-light ${buttonColor}`}>
                        <i className="material-icons">{icon}</i>
                    </a>
                </div>
            </div>
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
