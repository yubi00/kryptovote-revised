export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_WINNER':
      return { ...state, winnerName: action.winnerName }
    default:
      return state
  }
}
