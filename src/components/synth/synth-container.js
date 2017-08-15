import { connect } from 'react-redux'

import Synth from './synth'
import { updatePortamento } from './../../actions/synth-actions'

const mapStateToProps = ({ keyboard, synth }) => {
  return {
    keyboard,
    ...synth
  }
}

const mapDispatchToProps = dispatch => ({
  updatePortamento: (enabled, value) => dispatch(updatePortamento(enabled, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Synth)
