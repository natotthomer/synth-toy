import React from 'react'

import Keyboard from './keyboard'

export default class Synth extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.ac = new (window.AudioContext || window.webkitAudioContext)();
    console.log(this.ac);
    this.osc = this.ac.createOscillator();
    this.gn = this.ac.createGain();
    this.osc.type = 'triangle';
    this.osc.start();
    this.osc.frequency.value = 280;
    this.lpf = this.ac.createBiquadFilter();
    this.lpf.frequency.value = 550
    this.osc.connect(this.lpf);
    this.lpf.connect(this.gn);
    this.gn.connect(this.ac.destination);
  }

  render () {
    return (
      <div>
        <p>hi</p>
        <Keyboard />
      </div>
    );
  }
}
