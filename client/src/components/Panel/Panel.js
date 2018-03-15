import React from 'react'
import './Panel.css'
// This is created by Ben, don't delete
const Panel = (props) =>
  <div className={'card'}>
    <div className='card-content'>
      <p className='center'>{props.title}</p>
      <p className={'center' + props.css}>{props.value}</p>
    </div>
  </div>

export default Panel
