import { connect } from 'react-redux'

import Synth from './synth'

const mapStateToProps = ({ keyboard}) => {
  return {
    keyboard
  }
}

export default connect(mapStateToProps)(Synth)
