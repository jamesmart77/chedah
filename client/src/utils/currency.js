import React from 'react';


export function currencyJSX(val) {
    const absVal = Math.abs(val);
    const valstr = absVal.toFixed(2);
    const valarr = valstr.split('.');
    return (
        <span>{(val < 0) ? '-' : ''}<sup>$</sup>{valarr[0]}.{valarr[1]}</span>
    );
};


export function changeJSX(val, expense=false) {
    const isNegative = (val < 0) ? true : false;
    const isLoss = (expense == true) ? (isNegative == false) ? true : false : (isNegative == true) ? true : false;
    const absVal = Math.abs(val);
    const valstr = absVal.toFixed(2);
    const valarr = valstr.split('.');
    return (
        <span className={'gig-dash-' + (isLoss == true ? 'loss' : 'gain')}>{(val < 0) ? '-' : '+'}${valarr[0]}.{valarr[1]}</span>
    );
};



export function formatCurrency(val) {
    return `$` + `${val}`;
};
