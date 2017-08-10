import {
  CHANGE_OCTAVE, PRESS_KEY, RELEASE_KEY
} from './../constants/keyboard_constants'
import { store } from './../store'

// const receiveChangedOctave = octave => ()

export const changeOctave = octave => store.dispatch({
  type: CHANGE_OCTAVE,
  octave
})
