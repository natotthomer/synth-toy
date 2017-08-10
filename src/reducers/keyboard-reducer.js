import {
  CHANGE_OCTAVE, PRESS_KEY, RELEASE_KEY, UPDATE_MIDI_DEVICES, SELECT_MIDI_DEVICE
} from './../constants/keyboard_constants'

const _nullKeyboard = {
  currentDevice: {},
  devices: [],
  keysPressed: {},
  octave: -1
}

const KeyboardReducer = (state = _nullKeyboard, action) => {
  switch (action.type) {
    case CHANGE_OCTAVE: {
      const octave = action.octave
      return Object.assign({}, state, {octave})
    }
    case PRESS_KEY: {
      const key = action.key
      const keysPressed = Object.assign({}, state.keysPressed)
      keysPressed[key.name] = key
      return Object.assign({}, state, {keysPressed})
    }
    case RELEASE_KEY: {
      const key = action.key
      const keysPressed = Object.assign({}, state.keysPressed)
      delete keysPressed[key.name]
      return Object.assign({}, state, {keysPressed})
    }
    case UPDATE_MIDI_DEVICES: {
      const devices = action.devices
      return Object.assign({}, state, {devices})
    }
    case SELECT_MIDI_DEVICE: {
      const currentDevice = action.device
      return Object.assign({}, currentDevice)
    }
    default:
      return state
  }
}

export default KeyboardReducer
