export const setElection = (instance) => {
  return async (dispatch) => {
    try {
      //const { instance } = await getInstance()
      const electionName = await instance.methods.getElectionName().call()
      const votingDeadline = await instance.methods.getVotingDeadline().call()
      const electionDesc = await instance.methods.getElectionDesc().call()

      dispatch({
        type: 'SET_ELECTION',
        payload: { electionName, electionDesc, votingDeadline }
      })
    } catch (error) {
      return
    }
  }
}

export const addElection = (election) => ({
  type: 'ADD_ELECTION',
  payload: election
})

export const endElection = () => ({
  type: 'END_ELECTION'
})
