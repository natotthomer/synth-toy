import {
  CHANGE_OCTAVE, UPDATE_MIDI_DEVICES, SELECT_MIDI_DEVICE,
  KEY_DOWN, KEY_UP, PITCH_BEND
} from './../constants/keyboard_constants'
import Store from './../store'

const registerKeyDown = (note, velocity) => ({
  type: KEY_DOWN,
  note,
  velocity
})

// export const changeOctave = octave => Store.dispatch({
//   type: CHANGE_OCTAVE,
//   octave
// })
//
export const updateMIDIDevices = devices => dispatch => dispatch({
  type: UPDATE_MIDI_DEVICES,
  devices
})

export const selectMIDIDevice = device => dispatch => dispatch({
  type: SELECT_MIDI_DEVICE,
  device
})

export const keyDown = (note, velocity) => dispatch => dispatch({
  type: KEY_DOWN,
  note,
  velocity
})

export const keyUp = (note, velocity) => dispatch => dispatch({
  type: KEY_UP,
  note,
  velocity
})

export const pitchBend = value => dispatch => dispatch({
  type: PITCH_BEND,
  value
})
