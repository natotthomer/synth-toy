import React from 'react'

const Input = (props) => {


  return (
    <div className='synth-input'>
      <span>{props.visibleName}</span>
      <input
        type='range'
        min={props.min}
        max={props.max}
        step={props.step}
        className='standard-slider'
        onChange={props.onChange}
        value={props.value} />
      <span>{props.value}</span>
    </div>
  );
}

export default Input
