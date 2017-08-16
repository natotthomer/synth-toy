import React from 'react'

// import { frequencyFromNoteNumber } from './../../utils/keyboard_utils'

export default class Keyboard extends React.Component {
  constructor (props) {
    super(props)

    this.handleOctaveUp = this.handleOctaveUp.bind(this)
    this.handleOctaveDown = this.handleOctaveDown.bind(this)
    this.registerMIDIAccess = this.registerMIDIAccess.bind(this)
    this.onMIDIAccessSuccess = this.onMIDIAccessSuccess.bind(this)
    this.renderDevices = this.renderDevices.bind(this)
    this.onMIDIMessage = this.onMIDIMessage.bind(this)
  }

  componentDidMount () {
    document.onkeypress = function (e) {
      let charCode = (typeof e.which === 'number') ? e.which : e.keyCode

      if (charCode) {
        alert('Character typed: ' + String.fromCharCode(charCode))
      }
    }
    this.registerMIDIAccess()
  }

  registerMIDIAccess () {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: false
      }).then(this.onMIDIAccessSuccess, this.onMIDIFailure)
    } else {
      alert('No MIDI support in your browser.')
    }
  }

  // midi functions
  onMIDIAccessSuccess (midi) {
    // the argument 'midi' is our raw MIDI data, inputs, outputs, and sysex status

    const devices = []
    const inputs = midi.inputs.values()
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      input.value.onmidimessage = this.onMIDIMessage
      devices.push(input.value)
    }
    this.props.updateMIDIDevices(devices)
  }

  onMIDIAccessFailure (error) {
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error)
  }

  onMIDIMessage (message) {
    let data = message.data // this gives us our [command/channel, note, velocity] data.
    let cmd = data[0] >> 4
    let channel = data[0] & 0xf
    let message_type = data[0] & 0xf0 // channel agnostic message type. Thanks, Phil Burk.
    let note = data[1]
    let velocity = data[2]
    // with pressure and tilt off
    // note off: 128, cmd: 8
    // note on: 144, cmd: 9
    // pressure / tilt on
    // pressure: 176, cmd 11:
    // bend: 224, cmd: 14

    switch (message_type) {
      case 144: // noteOn message
        this.props.keyDown(note, velocity)
        break
      case 128: // noteOff message
        this.props.keyUp(note, velocity)
        break

    }
  }

  handleOctaveDown (e) {
    e.preventDefault()

    this.props.changeOctave(this.props.keyboard.octave - 1)
  }

  handleOctaveUp (e) {
    e.preventDefault()

    this.props.changeOctave(this.props.keyboard.octave + 1)
  }

  renderDevices () {
    if (this.props.keyboard.devices.length > 0) {
      return (
        <div>
          {this.props.keyboard.devices.map((device, idx) => {
            return (
              <div key={idx} onClick={() => this.props.selectMIDIDevice(device)}>
                {device.name}
              </div>
            )
          })}
        </div>
      )
    }
  }

  render () {
    return (
      <div>
        <div id='octave-switch'>
          <div onClick={this.handleOctaveDown}>
            octave down
          </div>
          <div onClick={this.handleOctaveUp}>
            octave up
          </div>
        </div>

        <div id='device-list'>
          {this.renderDevices()}
        </div>
      </div>
    )
  }
}
