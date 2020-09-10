export default (state = [], action) => {
  switch (action.type) {
    case 'SET_VOTERS':
      return action.voters
    case 'ADD_VOTER':
      return [...state, action.voter]
    default:
      return state
  }
}
