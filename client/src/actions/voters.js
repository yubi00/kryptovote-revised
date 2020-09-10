import getWeb3 from '../utils/getWeb3'
import BallotContract from '../contracts/Ballot.json'

export const setVoters = (voters) => ({
  type: 'SET_VOTERS',
  voters
})

export const loadVoters = () => {
  return async (dispatch) => {
    const web3 = await getWeb3()

    // Get the contract instance.
    const networkId = await web3.eth.net.getId()
    const deployedNetwork = BallotContract.networks[networkId]
    const instance = new web3.eth.Contract(
      BallotContract.abi,
      deployedNetwork && deployedNetwork.address
    )
    const votersLength = await instance.methods.getVotersLength().call()
    const voters = []
    for (let i = 0; i < votersLength; i++) {
      const voter = await instance.methods.getVoter(i).call()
      voters.push(voter)
    }
    dispatch(setVoters(voters))
  }
}

export const addVoter = (voter) => ({
  type: 'ADD_VOTER',
  voter
})
