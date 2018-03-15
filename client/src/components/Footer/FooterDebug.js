import React from 'react'
import ReactDOM from 'react-dom'

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  right: 0,
  backgroundColor: '#00000035',
  padding: '10px',
  color: '#fff',
  zIndex: 999999,
  borderRadius: '1rem',
  paddingTop: 6,
  paddingBottom: 4,
  paddingLeft: 18,
  paddingRight: 18
}

function updateResolution () {
  const element = (
    <span>
      {window.innerWidth} x {window.innerHeight}
    </span>
  )

  ReactDOM.render(
    element,
    document.getElementById('screen-res-root')
  )
}

// setInterval(updateResolution, 100);

// materialize footer visual cue
const FooterDebug = () =>

  <div id='footer-debug' style={footerStyle}>
    <span className='hide-on-med-only hide-on-large-only'>mobile (SM): </span>
    <span className='hide-on-small-only hide-on-large-only'>tablet (M): </span>
    <span className='hide-on-small-only hide-on-med-only'>desktop (L): </span>
    <span id='screen-res-root' />
  </div>

export default FooterDebug
