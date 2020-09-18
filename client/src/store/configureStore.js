import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers/rootReducer'

import { transformCircular } from '../utils/transform'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['web3', 'candidates', 'elections', 'auth', 'voters', 'results'],
  blacklist: ['error'],
  transforms: [transformCircular]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(thunk))
  )
  let persistor = persistStore(store)

  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
      // This fetch the new state of the above reducers.
      const nextRootReducer = require('../reducers/rootReducer').default
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer))
    })
  }

  return { store, persistor }
}
