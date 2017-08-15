import React from 'react'

import KeyboardContainer from './keyboard-container'

import { frequencyFromNoteNumber } from './../../utils/keyboard_utils'

export default class Synth extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      gain: 0
    }

    this.toggleMute = this.toggleMute.bind(this)
    this.noteOn = this.noteOn.bind(this)
    this.noteOff = this.noteOff.bind(this)
    this.togglePortamento = this.togglePortamento.bind(this)
    this.handlePortamentoTimeChange = this.handlePortamentoTimeChange.bind(this)
  }

  componentWillMount () {
    this.ac = new (window.AudioContext || window.webkitAudioContext)()
    this.osc = this.ac.createOscillator()
    this.gn = this.ac.createGain()
    this.gn.gain.value = this.state.gain
    this.osc.type = 'sawtooth'
    this.osc.start()
    this.lpf = this.ac.createBiquadFilter()
    this.lpf.frequency.value = 5000
    this.lpf.Q.value = 0
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
    // this.osc.frequency.value = noteFrequency(this.props.keyboard.octave)
    if (this.props.keyboard.currentNote && this.props.keyboard.currentNote.note) {
      this.noteOn()
    } else {
      this.noteOff()
    }
  }

  noteOn () {
    const now = this.ac.currentTime
  	const newPitchFrequency = frequencyFromNoteNumber(this.props.keyboard.currentNote.note)
    this.osc.frequency.cancelScheduledValues(0)

    if (this.props.portamento.enabled) {
      this.osc.frequency.linearRampToValueAtTime(newPitchFrequency, now + parseFloat(this.props.portamento.value))
    } else {
      this.osc.frequency.setValueAtTime(newPitchFrequency, now)
    }

  	this.gn.gain.value = this.props.keyboard.currentNote.velocity / 127
  }

  noteOff () {
    this.gn.gain.value = 0
  }

  togglePortamento (e) {
    const value = this.props.portamento.value
    this.props.updatePortamento(!this.props.portamento.enabled, value)
  }

  handlePortamentoTimeChange (e) {
    const value = e.target.value
    this.props.updatePortamento(this.props.portamento.enabled, value)
  }

  render () {
    const portamento = this.props.portamento.enabled ? 'ON' : 'OFF'
    return (
      <div>
        <p>NH-8080</p>
        <div onClick={this.toggleMute}>Mute</div>
        <div>
          <div onClick={this.togglePortamento}>
            {portamento}
          </div>
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            onChange={this.handlePortamentoTimeChange}
            value={this.props.portamento.value} />
        </div>
        <KeyboardContainer />
      </div>
    )
  }
}
