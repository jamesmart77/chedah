import React, { Component } from "react";
// import { Badge, Chip } from 'react-materialize';
import Gig from './Gig';

// moneyIn, moneyOut, net
class GigList extends Component {
    constructor(props) {
        super(props)
        console.log(`gig list: `, props);
    }
    render() {
        const gigs = this.props.gigs || []
        return (
            <div id="giglist-root">
                {gigs.map((gig, i) => (
                    <Gig {...gig}/>
                ))}
            </div>

        );
    }
}


export default GigList;
