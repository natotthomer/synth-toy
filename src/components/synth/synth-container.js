import { connect } from 'react-redux'

import Synth from './synth'
import { togglePortamento } from './../../actions/keyboard-actions'

const mapStateToProps = ({ keyboard }) => {
  return {
    keyboard
  }
}

const mapDispatchToProps = dispatch => ({
  togglePortamento: portamento => dispatch(togglePortamento(portamento))
})

export default connect(mapStateToProps, mapDispatchToProps)(Synth)
