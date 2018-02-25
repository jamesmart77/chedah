import React, { Component } from "react";
import Moment from 'react-moment';

//const dateToFormat = '1976-04-19T12:59-0500';
//<Moment>{dateToFormat}</Moment>

// materialize sidebar alert
class Alert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            value: props.value || '',
            unread: true,
            date: props.date,
            symbol: props.symbol || 'chat',
            color: props.color || 'deep-orange accent-3'
        };
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick() {
        this.setState({unread: false, symbol: 'check_circle', color: 'grey lighten-1'});
        console.log(`alert read: ${!this.state.unread}`);
    }

    render() {
        const iconCls = `large material-icons circle ${this.state.color}`;
        return (
            <a className="collection-item avatar border-none" href="#!" onClick={this.handleClick}>
                <i className={iconCls}>{this.state.symbol}</i>
                <span className="line-height-0 alert-name">{this.state.name}</span>
                <span className="medium-small right blue-grey-text text-lighten-3">{this.state.date}</span>
                <p className="medium-small blue-grey-text text-lighten-3">{this.state.value}</p>
            </a>
        );
    }
}



export default Alert;
