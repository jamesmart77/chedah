import React, { Component } from 'react';


// Account detail gig menuv
class GigMenu extends Component {

    state = {
        isActive: false
    }

    handleClick() {
        this.setState({isActive: !this.state.isActive})
    }

    componentDidUpdate() {
        console.log(`click event:`, this.state.isActive);
    }

    // menu widget, inactive
    getWidget() {
        return (
            <input
                defaultValue={this.props.name}
                onClick={this.handleClick.bind(this)}
            />
        )
    }

    // menu editor
    getEditor() {
        return (
            <div>
                <a href="#!" className='gig-menu-trigger' data-activates='gig-menu'>Gig: Uber</a>

                <ul id='gig-menu' className='dropdown-content'>
                    <li className='selected'><a href="#!">Uber</a></li>
                    <li><a href="#!">Programming</a></li>
                </ul>
            </div>
        )
    }

    render() {
        if (this.state.isActive) {
            return this.getEditor()
        }
        return this.getWidget()

    }
}


export default GigMenu;
