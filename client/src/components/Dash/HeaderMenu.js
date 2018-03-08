import React, { Component } from 'react';


class HeaderMenu extends Component {

    state = {
        id: this.props.id || 'dropdown-menu',
        key: this.props.key || '1',
        items: []
    }


    handleClick(item) {
        console.log(`-> item clicked: `, item);
    }

    render() {
        const trigger = (this.state.id + '-' + this.state.key);
        const listItems = this.state.items.map((item, i) =>
            <li><a href="#!" onClick={this.handleClick.bind(this, item)}>{item}</a></li>
        )

        return (
            <div className="col right">
                <a className="dropdown-button gig-frequency" href="#!" data-activates={trigger}><i className="material-icons">arrow_drop_down</i></a>
                    <ul id={trigger} className="dropdown-content">
                        {listItems}
                    </ul>
            </div>
        )
    }
}


export default HeaderMenu;
