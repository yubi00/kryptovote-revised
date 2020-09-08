import getWeb3 from '../utils/getWeb3'
import BallotContract from '../contracts/Ballot.json'

export const setElection = () => {
  return async (dispatch) => {
    try {
      const web3 = await getWeb3()

      // Get the contract instance.
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = BallotContract.networks[networkId]
      const instance = new web3.eth.Contract(
        BallotContract.abi,
        deployedNetwork && deployedNetwork.address
      )
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
