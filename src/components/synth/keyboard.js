import React from 'react'

export default class Keyboard extends React.Component {
  constructor (props) {
    super(props)

    this.handleOctaveUp = this.handleOctaveUp.bind(this);
    this.handleOctaveDown = this.handleOctaveDown.bind(this);
  }

  componentDidMount () {
    document.onkeypress = function(e) {
      let charCode = (typeof e.which === "number") ? e.which : e.keyCode;

      let my_key = (charCode)
      if (charCode) {
        alert("Character typed: " + String.fromCharCode(charCode));
      }
    };
  }

  handleOctaveDown (e) {
    e.preventDefault()

    this.props.changeOctave(this.props.keyboard.octave - 1)
  }

  handleOctaveUp (e) {
    e.preventDefault()

    this.props.changeOctave(this.props.keyboard.octave + 1)
  }

  render () {
    return (
      <div>
        <div onClick={this.handleOctaveDown}>
          octave down
        </div>
        <div onClick={this.handleOctaveUp}>
          octave up
        </div>
      </div>
    )
  }
}
