import { getInstance } from '../utils/getInstance'

export const setElection = () => {
  return async (dispatch) => {
    try {
      const { instance } = await getInstance()
      const electionName = await instance.methods.getElectionName().call()
      const votingDeadline = await instance.methods.getVotingDeadline().call()
      const electionDesc = await instance.methods.getElectionDesc().call()

      dispatch({
        type: 'SET_ELECTION',
        payload: { electionName, electionDesc, votingDeadline }
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

export const addElection = (election) => ({
  type: 'ADD_ELECTION',
  payload: election
})
