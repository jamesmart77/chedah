import React, { Component } from "react";
import { Badge, Chip } from 'react-materialize';
import Gig from './Gig';


class GigList extends Component {

    state = {
        // TODO: move to API
        gigs: [
            {
                id: 1,
                name: 'Uber',
                income: 3100.21,
                inchange: -120,
                expenses: 400,
                expchange: -100,
                net: 4200,
                netchange: 500
            }, {
                id: 2,
                name: 'Programming',
                income: 4700,
                inchange: 1700,
                expenses: 210,
                expchange: -80,
                net: 6300,
                netchange: -220
            }
        ]
    };

    render() {
        return (
            <div id="giglist-root">
                {this.state.gigs.map((gig, i) => (
                    <Gig
                        key={i}
                        id={gig.id}
                        name={gig.name}
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
