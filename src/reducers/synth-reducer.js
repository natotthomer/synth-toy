import { UPDATE_PORTAMENTO, UPDATE_ATTACK, UPDATE_RELEASE } from './../constants/synth-constants'

const _nullSynth = {
  portamento: {
    enabled: true,
    value: 0
  },
  attack: 0.0,
  release: 0.0
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
    case UPDATE_ATTACK: {
      const attack = action.value
      return Object.assign({}, state, {attack})
    }
    case UPDATE_RELEASE: {
      const release = action.value
      return Object.assign({}, state, {release})
    }
    default:
      return state
  }
}

export default SynthReducer
