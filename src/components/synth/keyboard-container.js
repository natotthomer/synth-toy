import { connect } from 'react-redux'

import Keyboard from './keyboard'
import { changeOctave } from './../../actions/keyboard-actions'

const mapStateToProps = ({ keyboard }) => {
  return {
    keyboard
  }
}

const mapDispatchToProps = dispatch => ({
  changeOctave: octave => dispatch(changeOctave(octave))
})

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard)
