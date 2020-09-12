const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CANDIDATE':
      return [...state, action.candidate]
    case 'SET_CANDIDATES':
      return action.candidates
    case 'RESET_CANDIDATES':
      return initialState
    default:
      return state
  }
}
