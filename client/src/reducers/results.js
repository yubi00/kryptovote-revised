const initialState = {
  winnerName: '',
  candidates: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WINNER':
      return { ...state, winnerName: action.winnerName }
    case 'SET_RESULTS':
      return { ...state, candidates: action.candidates }
    case 'RESET_RESULTS':
      return initialState
    default:
      return state
  }
}
