const initialState = {
  electionName: '',
  votingDeadline: 0,
  electionDesc: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ELECTION':
      return {
        ...state,
        ...action.payload
      }
    case 'ADD_ELECTION':
      return {
        ...state,
        ...action.payload
      }
    case 'END_ELECTION':
      return { ...state, votingDeadline: 0 }
    default:
      return state
  }
}
