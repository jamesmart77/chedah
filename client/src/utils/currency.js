import React from 'react';


// format a currency value & return a comma-separated string
function numberWithCommas(val) {
    val = (!val) ? 0 : val;
    var parts = val.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

// format a currency string in JSX for UI
export function formatCurrencyValueJSX(val) {
    const absVal = Math.abs(val);
    const valstr = numberWithCommas(absVal);
    const valarr = valstr.split('.');
    return (
        <span>{(val < 0) ? '-' : ''}<sup>$</sup>{valarr[0]}.{valarr[1]}</span>
    );
};

// format a change value (+/-) currency string in JSX for UI
export function formatChangeValueJSX(val, expense=false) {
    const isNegative = (val < 0) ? true : false;
    const isLoss = (expense === true) ? (isNegative === false) ? true : false : (isNegative === true) ? true : false;
    const valstr = numberWithCommas(Math.abs(val));
    const valarr = valstr.split('.');
    return (
        <span className={'gig-dash-' + (isLoss === true ? 'loss' : 'gain')}>{(val < 0) ? '-' : '+'}${valarr[0]}.{valarr[1]}</span>
    );
};

