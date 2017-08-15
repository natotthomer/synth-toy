import { UPDATE_PORTAMENTO } from './../constants/synth-constants'

import { store } from './../store'

export const updatePortamento = (enabled, value) => store.dispatch({
  type: UPDATE_PORTAMENTO,
  enabled,
  value
})
