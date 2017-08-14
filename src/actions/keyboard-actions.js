import {
  CHANGE_OCTAVE, UPDATE_MIDI_DEVICES, SELECT_MIDI_DEVICE,
  NOTE_ON, NOTE_OFF, TOGGLE_PORTAMENTO
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

export const noteOn = (note, velocity) => store.dispatch({
  type: NOTE_ON,
  note,
  velocity
})

export const noteOff = () => store.dispatch({
  type: NOTE_OFF
})

export const togglePortamento = portamento => store.dispatch({
  type: TOGGLE_PORTAMENTO,
  portamento
})
