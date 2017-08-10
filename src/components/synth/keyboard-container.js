import { connect } from 'react-redux'

import Keyboard from './keyboard'
import {
  changeOctave, updateMIDIDevices, selectMIDIDevice
} from './../../actions/keyboard-actions'

const mapStateToProps = ({ keyboard }) => {
  return {
    keyboard
  }
}

const mapDispatchToProps = dispatch => ({
  changeOctave: octave => dispatch(changeOctave(octave)),
  updateMIDIDevices: devices => dispatch(updateMIDIDevices(devices)),
  selectMIDIDevice: device => dispatch(selectMIDIDevice(device))
})

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard)
