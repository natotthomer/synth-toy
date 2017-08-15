import { connect } from 'react-redux'

import Synth from './synth'
import { updatePortamento } from './../../actions/keyboard-actions'

const mapStateToProps = ({ keyboard }) => {
  return {
    keyboard
  }
}

const mapDispatchToProps = dispatch => ({
  updatePortamento: (enabled, value) => dispatch(updatePortamento(enabled, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Synth)
