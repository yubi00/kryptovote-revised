export const setElection = (electionName, votingDeadline, description) => ({
  type: 'SET_ELECTION',
  electionName,
  votingDeadline,
  description
})
