import React, { Component } from 'react'

class TableHeader extends Component {
  constructor (props) {
    super(props)

    console.log(`-> Headers: `, props)
  };

  render () {
    return (
      <thead>
        <tr>
          {this.props.headers.map((item, idx) => (
            <th key={idx} className={item.align + '-align'}>{item.name}</th>
          ))}
        </tr>
      </thead>
    )
  };
};

export default TableHeader
