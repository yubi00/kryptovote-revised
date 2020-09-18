import { combineReducers } from 'redux'
import authReducer from '../reducers/auth'
import web3Reducer from '../reducers/web3'
import electionReducer from '../reducers/elections'
import candidateReducer from '../reducers/candidates'
import errorReducer from '../reducers/errors'
import voterReducer from '../reducers/voters'
import resultsReducer from '../reducers/results'

const rootReducer = combineReducers({
  web3: web3Reducer,
  elections: electionReducer,
  candidates: candidateReducer,
  auth: authReducer,
  error: errorReducer,
  voters: voterReducer,
  results: resultsReducer
})

export default rootReducer
