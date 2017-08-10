import {
  CHANGE_OCTAVE, PRESS_KEY, RELEASE_KEY
} from './../constants/keyboard_constants'

const _nullKeyboard = {
  octave: -1,
  keysPressed: {}
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
    default:
      return state
  }
}

export default KeyboardReducer
