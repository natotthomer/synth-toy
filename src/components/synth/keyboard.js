import React from 'react'

export default class Keyboard extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    document.onkeypress = function(e) {
      let charCode = (typeof e.which == "number") ? e.which : e.keyCode;

      let my_key = (charCode)
      if (charCode) {
        alert("Character typed: " + String.fromCharCode(charCode));
      }
    };
  }

  render () {
    return (
      <div>
        keyboard
      </div>
    )
  }
}
