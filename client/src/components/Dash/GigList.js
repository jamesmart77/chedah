import React from "react";
import Gig from './Gig';


// moneyIn, moneyOut, net
class GigList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const gigs = this.props.gigs || []
        return (
            <div id="giglist-root">
                {gigs.map((gig, i) => (
                    <Gig resfresh={ this.props.refresh } key={gig._id} {...gig}/>
                ))}
            </div>

        );
    }
}


export default GigList;
