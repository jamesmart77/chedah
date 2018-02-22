import React from "react";

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  backgroundColor: '#00000087',
  padding: '10px',
  color: '#fff',
  zIndex: 999999
};


// materialize footer visual cue
const FooterDebug = () =>

    <div style={footerStyle}>
        <span className="hide-on-med-only hide-on-large-only">Mobile (SM)</span>
        <span className="hide-on-small-only hide-on-large-only">Tablet (M)</span>
        <span className="hide-on-small-only hide-on-med-only">Desktop (L)</span>
    </div>


export default FooterDebug;
