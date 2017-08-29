import { UPDATE_PORTAMENTO, UPDATE_ATTACK, UPDATE_RELEASE } from './../constants/synth-constants'

import Store from './../store'

export const updatePortamento = (enabled, value) => Store.dispatch({
  type: UPDATE_PORTAMENTO,
  enabled,
  value
})

export const updateAttack = value => Store.dispatch({
  type: UPDATE_ATTACK,
  value
})

export const updateRelease = value => Store.dispatch({
  type: UPDATE_RELEASE,
  value
})
