import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers/root-reducer'

// export const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// )

const addPromiseSupportToDispatch = store => {
  const rawDispatch = store.dispatch

  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(rawDispatch)
    }
    return rawDispatch(action)
  }
}

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  )

  store.dispatch = addPromiseSupportToDispatch(store)

  return store
}

export default configureStore
