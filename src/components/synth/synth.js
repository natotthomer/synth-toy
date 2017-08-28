import React from 'react'

import KeyboardContainer from './keyboard-container'
import Input from './input'
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
    this.handleAttackChange = this.handleAttackChange.bind(this)
    this.handleReleaseChange = this.handleReleaseChange.bind(this)
  }

  componentWillMount () {
    this.ac = new (window.AudioContext || window.webkitAudioContext)()
    this.osc = this.ac.createOscillator()
    this.gn = this.ac.createGain()
    this.gn.gain.value = 0
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

  componentWillUpdate (nextProps, nextState) {
    console.log(nextProps.keyboard.currentNotes.tail === null);
    const { currentNotes } = this.props.keyboard
    const { currentNotes: nextNotes } = nextProps.keyboard
    console.log(currentNotes);
    console.log(nextNotes);
    if (currentNotes.tail) {
      console.log('hello!');
      console.log(nextNotes.tail.data);
      if (!nextNotes.tail.data || nextNotes.tail.data.nativeNote !== currentNotes.tail.data.nativeNote) {
        this.noteOn()
      }
    } else {
      this.noteOff()
    }
  }

  noteOn () {
    console.log('note on');
    const now = this.ac.currentTime
  	const newPitchFrequency = frequencyFromNoteNumber(this.props.keyboard.currentNotes.tail.data.modulatedNote)
    this.osc.frequency.cancelScheduledValues(now)

    if (this.props.portamento.enabled) {
      this.osc.frequency.linearRampToValueAtTime(newPitchFrequency, now + parseFloat(this.props.portamento.value))
    } else {
      this.osc.frequency.setValueAtTime(newPitchFrequency, now)
    }

  	const velocityAdjustedGain = this.props.keyboard.currentNotes.tail.data.velocity / 127
    this.gn.gain.cancelScheduledValues(now)
    // this.gn.gain.setValueAtTime(0, now)
    this.gn.gain.linearRampToValueAtTime(velocityAdjustedGain, now + this.props.attack)
  }

  noteOff () {
    console.log('note off');
    const now = this.ac.currentTime
    this.gn.gain.cancelScheduledValues(now)
    this.gn.gain.setValueAtTime(this.gn.gain.value, now)
    this.gn.gain.linearRampToValueAtTime(0, now + this.props.release)
    // this.gn.gain.setTargetAtTime(0, now, 5)
  }

  togglePortamento (e) {
    const value = this.props.portamento.value
    this.props.updatePortamento(!this.props.portamento.enabled, value)
  }

  handlePortamentoTimeChange (e) {
    const value = e.target.value
    this.props.updatePortamento(this.props.portamento.enabled, value)
  }

  handleAttackChange (e) {
    const value = e.target.value
    this.props.updateAttack(parseFloat(value))
  }

  handleReleaseChange (e) {
    const value = e.target.value
    this.props.updateRelease(parseFloat(value))
  }

  render () {
    return (
      <div>
        <p>NH-8080</p>
        <div onClick={this.toggleMute}>Mute</div>
        <div>
          <Input
          min={0}
          max={1}
          step={0.01}
            visibleName={'Portamento Amount'}
            onChange={this.handlePortamentoTimeChange}
            value={this.props.portamento.value} />
          <Input
            min={0}
            max={20}
            step={0.01}
            visibleName={'Attack Amount'}
            onChange={this.handleAttackChange}
            value={this.props.attack} />
          <Input
            min={0}
            max={20}
            step={0.01}
            visibleName={'Release Amount'}
            onChange={this.handleReleaseChange}
            value={this.props.release} />
        </div>
        <KeyboardContainer />
      </div>
    )
  }
}
