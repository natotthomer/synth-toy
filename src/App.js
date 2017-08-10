import React, { Component } from 'react'
import './App.css'

import SynthContainer from './components/synth/synth-container'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <SynthContainer />
      </div>
    )
  }
}

export default App
