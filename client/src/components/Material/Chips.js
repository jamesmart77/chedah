import React from 'react';
import PropTypes from 'prop-types';
import './Chips.css';

const $ = require('jquery');


class Chip extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            close: true,
            gig: props.gig || 'null'
        }

        this._onClick = this._onClick.bind(this);
    }

    componentDidMount() {
        // $('.chips').material_chip();
        $(this.closeButton).on('click', this._onClick);
    }

    _onClick(event) {
        console.log(`Chip closed: `, event);
    }

    render() {
        return (
            <div className='chip'>
                {this.state.gig}
                {this.state.close ? <i ref={(ref) => (this.closeButton = ref)} className='close material-icons'>close</i> : null}
            </div>
        )
    }
}


Chip.propTypes = {
  close: PropTypes.bool,
  gig: PropTypes.string
}


Chip.defaultProps = {
  close: true,
  gig: 'null'
}


export default Chip;
