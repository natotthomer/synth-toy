import {
  CHANGE_OCTAVE, UPDATE_MIDI_DEVICES, SELECT_MIDI_DEVICE, KEY_DOWN, KEY_UP,
  PITCH_BEND
} from './../constants/keyboard_constants'

import { DoublyLinkedList, numberOfNotesToPitchBend } from './../utils/keyboard_utils'

const _nullKeyboard = {
  currentDevice: {},
  devices: [],
  octave: -1,
  currentNotes: new DoublyLinkedList(),
  trigger: false,
  pitchBend: 8191
}

const KeyboardReducer = (state = _nullKeyboard, action) => {
  switch (action.type) {
    case CHANGE_OCTAVE: {
      const octave = action.octave
      return Object.assign({}, state, {octave})
    }
    case UPDATE_MIDI_DEVICES: {
      const devices = action.devices
      return Object.assign({}, state, {devices})
    }
    case SELECT_MIDI_DEVICE: {
      const currentDevice = action.device
      return Object.assign({}, state, {currentDevice})
    }
    case KEY_DOWN: {
      const currentNotes = state.currentNotes
      currentNotes.add({
        nativeNote: action.note,
        velocity: action.velocity,
        modulatedNote: action.note + numberOfNotesToPitchBend(state.pitchBend)
      })
      const trigger = true
      return Object.assign({}, state, {currentNotes}, {trigger})
    }
    case KEY_UP: {
      const currentNotes = state.currentNotes
      const index = currentNotes.findIndexByNoteNumber(action.note)
      currentNotes.remove(index)
      const trigger = currentNotes.length > 0 ? true : false
      return Object.assign({}, state, {currentNotes}, {trigger})
    }
    case PITCH_BEND: {
      const pitchBend = action.value
      const currentNotes = state.currentNotes
      currentNotes.pitchBend(pitchBend)
      return Object.assign({}, state, {currentNotes}, {pitchBend})
    }
    default:
      return state
  }
}

export default KeyboardReducer
