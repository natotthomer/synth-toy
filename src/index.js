import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import Store from './store'

ReactDOM.render(
  <Provider store={Store()}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
