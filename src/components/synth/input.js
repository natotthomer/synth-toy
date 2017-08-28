import React from 'react'

const Input = (props) => {
  return (
    <div>
      <span>{props.visibleName}</span>
      <input
        type='range'
        min='0'
        max='1'
        step='0.01'
        className='standard-slider'
        onChange={props.onChange}
        value={props.value} />
      <span>{props.value}</span>
    </div>
  );
}

export default Input
