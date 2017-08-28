import { connect } from 'react-redux'

import Synth from './synth'
import { updatePortamento, updateAttack, updateRelease } from './../../actions/synth-actions'

const mapStateToProps = ({ keyboard, synth }) => {
  return {
    keyboard,
    ...synth
  }
}

const mapDispatchToProps = dispatch => ({
  updatePortamento: (enabled, value) => dispatch(updatePortamento(enabled, value)),
  updateAttack: value => dispatch(updateAttack(value)),
  updateRelease: value => dispatch(updateRelease(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Synth)
