import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store/configureStore'
import AppRouter from './routers/AppRouter'
import * as serviceWorker from './serviceWorker'
import { loadWeb3 } from './actions/web3Actions'

const { store, persistor } = configureStore()
store
  .dispatch(loadWeb3())
  .then((res) => {
    console.log('web3 loaded success')
  })
  .catch((e) => {
    console.log(e.message)
  })

const jsx = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
