import {
  CHANGE_OCTAVE, UPDATE_MIDI_DEVICES, SELECT_MIDI_DEVICE,
  KEY_DOWN, KEY_UP
} from './../constants/keyboard_constants'
import { store } from './../store'

export const changeOctave = octave => store.dispatch({
  type: CHANGE_OCTAVE,
  octave
})

export const updateMIDIDevices = devices => store.dispatch({
  type: UPDATE_MIDI_DEVICES,
  devices
})

export const selectMIDIDevice = device => store.dispatch({
  type: SELECT_MIDI_DEVICE,
  device
})

export const keyDown = (note, velocity) => store.dispatch({
  type: KEY_DOWN,
  note,
  velocity
})

export const keyUp = (note, velocity) => store.dispatch({
  type: KEY_UP,
  note,
  velocity
})
