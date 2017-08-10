import {
  CHANGE_OCTAVE, PRESS_KEY, RELEASE_KEY, UPDATE_MIDI_DEVICES, SELECT_MIDI_DEVICE
} from './../constants/keyboard_constants'
import { store } from './../store'

// const receiveChangedOctave = octave => ()

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
