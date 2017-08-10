import React from 'react'

export default class Keyboard extends React.Component {
  constructor (props) {
    super(props)

    this.handleOctaveUp = this.handleOctaveUp.bind(this)
    this.handleOctaveDown = this.handleOctaveDown.bind(this)
    this.registerMIDIAccess = this.registerMIDIAccess.bind(this)
    this.onMIDIAccessSuccess = this.onMIDIAccessSuccess.bind(this)
    this.renderDevices = this.renderDevices.bind(this)
  }

  componentDidMount () {
    document.onkeypress = function (e) {
      let charCode = (typeof e.which === 'number') ? e.which : e.keyCode

      let my_key = (charCode)
      if (charCode) {
        alert('Character typed: ' + String.fromCharCode(charCode))
      }
    }
    this.registerMIDIAccess()
  }

  registerMIDIAccess () {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
          sysex: false // this defaults to 'false' and we won't be covering sysex in this article.
      }).then(this.onMIDIAccessSuccess, this.onMIDIFailure);
    } else {
        alert("No MIDI support in your browser.");
    }
  }

  // midi functions
  onMIDIAccessSuccess(midi) {
    // the argument 'midi' is our raw MIDI data, inputs, outputs, and sysex status

    const devices = []
    const inputs = midi.inputs.values()
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      devices.push(input.value)
    }
    this.props.updateMIDIDevices(devices)
  }

  onMIDIAccessFailure(error) {
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
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
    console.log(this.props.keyboard.currentDevice);
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
