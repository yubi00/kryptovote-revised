const initialState = {
  electionName: '',
  votingDeadline: '',
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
    default:
      return state
  }
}
