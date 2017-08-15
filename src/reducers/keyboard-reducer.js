import {
  CHANGE_OCTAVE, UPDATE_MIDI_DEVICES, SELECT_MIDI_DEVICE, NOTE_ON, NOTE_OFF
} from './../constants/keyboard_constants'

const _nullKeyboard = {
  currentDevice: {},
  devices: [],
  keysPressed: {},
  octave: -1,
  currentNote: {}
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
    case NOTE_ON: {
      const currentNote = {
        note: action.note,
        velocity: action.velocity
      }
      return Object.assign({}, state, {currentNote})
    }
    case NOTE_OFF: {
      const currentNote = {}
      return Object.assign({}, state, {currentNote})
    }
    default:
      return state
  }
}

export default KeyboardReducer
