import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from '../reducers/auth'
import web3Reducer from '../reducers/web3'
import electionReducer from '../reducers/elections'
import candidateReducer from '../reducers/candidates'
import errorReducer from '../reducers/errors'
import voterReducer from '../reducers/voters'

import { transformCircular } from '../utils/transform'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['web3', 'candidates', 'elections', 'voters', 'auth'],
  blacklist: ['error'],
  transforms: [transformCircular]
}

const rootReducer = combineReducers({
  web3: web3Reducer,
  elections: electionReducer,
  candidates: candidateReducer,
  auth: authReducer,
  error: errorReducer,
  voters: voterReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(thunk))
  )
  let persistor = persistStore(store)

  return { store, persistor }
}
