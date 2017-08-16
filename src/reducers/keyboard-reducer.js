import {
  CHANGE_OCTAVE, UPDATE_MIDI_DEVICES, SELECT_MIDI_DEVICE, KEY_DOWN, KEY_UP
} from './../constants/keyboard_constants'

import { DoublyLinkedList } from './../utils/keyboard_utils'

const _nullKeyboard = {
  currentDevice: {},
  devices: [],
  keysPressed: {},
  octave: -1,
  currentNote: new DoublyLinkedList()
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
      const currentNote = state.currentNote
      currentNote.add({
        note: action.note,
        velocity: action.velocity
      })
      return Object.assign({}, state, {currentNote})
    }
    case KEY_UP: {
      const currentNote = state.currentNote
      const index = currentNote.findIndexByNoteNumber(action.note)
      currentNote.remove(index)
      return Object.assign({}, state, {currentNote})
    }
    default:
      return state
  }
}

export default KeyboardReducer
