import { connect } from 'react-redux'

import Keyboard from './keyboard'
import {
  changeOctave, updateMIDIDevices, selectMIDIDevice, keyDown, keyUp
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
  keyDown: (note, velocity) => dispatch(keyDown(note, velocity)),
  keyUp: (note, velocity) => dispatch(keyUp(note, velocity))
})

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard)
