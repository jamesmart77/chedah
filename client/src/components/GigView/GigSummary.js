import React from "react";
import "./GigView.css";
import { formatCurrencyValueJSX } from '../../utils/currency';

const $ = require('jquery');


class GigSummary extends React.Component {
    state = {
        collapsed: false
    }

    handleClick() {
        this.setState({collapsed: !this.state.collapsed})
    }

    componentDidMount() {
        window.$('.collapsible-header').addClass('active')
        window.$('.collapsible').collapsible({accordian: false})
    }

    componentDidUpdate() {
        window.$('.collapsible').collapsible({accordian: false})
    }

    render() {
        const arrowName = (this.state.collapsed === false) ? 'arrow_drop_down' : 'arrow_drop_up';
        return (
            <ul className="gig-summary collapsible collection with-header" datacollapsible="expandable">
                <li>

                    <div className="collapsible-header listHeader" onClick={this.handleClick.bind(this)}>
                        <h6><i className="material-icons iconStyleSmall">track_changes</i> Gig Summary</h6>
                        <i className="header-expand-state material-icons">{arrowName}</i>
                    </div>

                    <div className='row collapsible-body'>
                        <ul>
                            <li className="collection-item">MONEY IN:<span className="right">{formatCurrencyValueJSX(this.props.gigSummary.moneyIn)}</span></li>
                            <li className="collection-item">EXPENSES:<span className="right">{formatCurrencyValueJSX(this.props.gigSummary.moneyOut)}</span></li>
                            <li className="collection-item">NET:<span className="right">{formatCurrencyValueJSX(this.props.gigSummary.net)}</span></li>
                        </ul>
                    </div>
                </li>
            </ul>
        )
    }
}


export default GigSummary;
