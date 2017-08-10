import React from 'react'

import KeyboardContainer from './keyboard-container'

import { noteFrequency } from './../../utils/keyboard_utils'

export default class Synth extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      gain: 0,
      oscFreq: 110
    }

    this.toggleMute = this.toggleMute.bind(this)
  }

  componentWillMount () {
    this.ac = new (window.AudioContext || window.webkitAudioContext)()
    this.osc = this.ac.createOscillator()
    this.gn = this.ac.createGain()
    this.gn.gain.value = this.state.gain
    this.osc.type = 'square'
    this.osc.start()
    this.osc.frequency.value = this.state.oscFreq * 4
    this.lpf = this.ac.createBiquadFilter()
    this.lpf.frequency.value = 400
    // this.lpf.Q.value = 1000
    this.osc.connect(this.lpf)
    this.lpf.connect(this.gn)
    this.gn.connect(this.ac.destination)
  }

  toggleMute (e) {
    e.preventDefault()

    if (this.gn) {
      this.setState((prevState) => ({ gain: prevState.gain === 1 ? 0 : 1 }))
    }
  }

  componentDidUpdate () {
    this.gn.gain.value = this.state.gain
    this.osc.frequency.value = noteFrequency(this.props.keyboard.octave)
  }

  render () {
    console.log(this.osc.frequency.value);
    return (
      <div>
        <p>NH-8080</p>
        <div onClick={this.toggleMute}>Mute</div>
        <KeyboardContainer />
      </div>
    )
  }
}
