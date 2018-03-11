import React from 'react';


class HeaderMenu extends React.Component {

    constructor(props) {
        super(props)


        this.state = {
            id: props.id || 'dropdown-menu',
            key: props.key || '1',
            items: props.items || []
        }
    }

    handleClick(item) {
        console.log(`-> item clicked: `, item);
    }

    render() {
        const trigger = (this.state.id + '-' + this.state.key);
        const listItems = this.state.items.map((item, i) =>
            <li key={i}><a href="#!" onClick={this.handleClick.bind(this, item)}>{item}</a></li>
        )

        return (
            <div className="col right">
                <a className="dropdown-button account-actions" href="#!" data-activates={trigger}><i className="material-icons">arrow_drop_down</i></a>
                    <ul id={trigger} className="dropdown-content">
                        {listItems}
                    </ul>
            </div>
        )
    }
}


export default HeaderMenu;
