import React, { Component } from "react";
import { Badge, Chip } from 'react-materialize';
import Gig from './Gig';


class GigList extends Component {

    state = {
        gigs: []
    };

    render() {
        return (
            <div id="giglist-root" class="col s12 m6 l9">
                {this.state.gigs.map(gig => (
                    <Gig
                        name={gig.name}
                        id={gig.id}
                        income={gig.income}
                        inchange={gig.inchange}
                        expenses={gig.expenses}
                        expchange={gig.expchange}
                        net={gig.net}
                        netchange={gig.netchange}
                    />
                ))}
            </div>

        );
    }
}


export default GigList;
