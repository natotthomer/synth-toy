import { UPDATE_PORTAMENTO, UPDATE_ATTACK, UPDATE_RELEASE } from './../constants/synth-constants'

import { store } from './../store'

export const updatePortamento = (enabled, value) => store.dispatch({
  type: UPDATE_PORTAMENTO,
  enabled,
  value
})

export const updateAttack = value => store.dispatch({
  type: UPDATE_ATTACK,
  value
})

export const updateRelease = value => store.dispatch({
  type: UPDATE_RELEASE,
  value
})
