export default (state = [], action) => {
  switch (action.type) {
    case 'SET_VOTERS':
      return action.voters
    case 'ADD_VOTER':
      return [...new Set([...state, action.voter])]
    case 'RESET_VOTERS':
      return []
    default:
      return state
  }
}
