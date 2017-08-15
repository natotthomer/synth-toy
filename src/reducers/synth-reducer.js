import { UPDATE_PORTAMENTO } from './../constants/synth-constants'

const _nullSynth = {
  portamento: {
    enabled: false,
    value: 0
  }
}

const SynthReducer = (state = _nullSynth, action) => {
  switch (action.type) {
    case UPDATE_PORTAMENTO: {
      const enabled = action.enabled
      const value = action.value
      const portamento = {
        enabled,
        value
      }
      return Object.assign({}, state, {portamento})
    }
    default:
      return state
  }
}

export default SynthReducer
