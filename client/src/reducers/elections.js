const initialState = {
  electionName: '',
  votingDeadline: '',
  description: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ELECTION':
      return {
        ...state,
        votingDeadline: action.votingDeadline,
        electionName: action.electionName,
        description: action.description
      }
    default:
      return state
  }
}
