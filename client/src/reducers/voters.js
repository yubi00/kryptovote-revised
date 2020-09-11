export default (state = [], action) => {
  switch (action.type) {
    case 'SET_VOTERS':
      return action.voters
    case 'ADD_VOTER':
      return [...new Set([...state, action.voter])]
    default:
      return state
  }
}
