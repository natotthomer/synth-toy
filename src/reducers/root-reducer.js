import { combineReducers } from 'redux'

import KeyboardReducer from './keyboard-reducer'

export default combineReducers({
  keyboard: KeyboardReducer
})
