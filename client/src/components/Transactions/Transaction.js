import ReactDataGrid from 'react-data-grid';
import React from "react";

const Transaction = props => {

  const createRows = () => this._rows = props.data;
  const rowGetter = i => this._rows[i];
  createRows();

  return  (
      <ReactDataGrid
        enableCellSelect={true}
        columns={props.columns}
        rowGetter={rowGetter}
        rowsCount={this._rows.length}
        minHeight={500} 
        onGridRowsUpdated={props.handleGridRowsUpdated}
        />);
  }


export default Transaction;





