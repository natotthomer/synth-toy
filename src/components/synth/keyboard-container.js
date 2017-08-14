import { connect } from 'react-redux'

import Keyboard from './keyboard'
import {
  changeOctave, updateMIDIDevices, selectMIDIDevice, noteOn, noteOff,
  togglePortamento
} from './../../actions/keyboard-actions'

const mapStateToProps = ({ keyboard }) => {
  return {
    keyboard
  }
}

const mapDispatchToProps = dispatch => ({
  changeOctave: octave => dispatch(changeOctave(octave)),
  updateMIDIDevices: devices => dispatch(updateMIDIDevices(devices)),
  selectMIDIDevice: device => dispatch(selectMIDIDevice(device)),
  noteOn: (note, velocity) => dispatch(noteOn(note, velocity)),
  noteOff: (note, velocity) => dispatch(noteOff(note, velocity)),
  togglePortamento: portamento => dispatch(togglePortamento(portamento))
})

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard)
