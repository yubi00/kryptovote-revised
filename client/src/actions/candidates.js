import getWeb3 from '../utils/getWeb3'
import BallotContract from '../contracts/Ballot.json'

export const addCandidate = (candidate) => ({
  type: 'ADD_CANDIDATE',
  candidate
})

export const setCandidates = () => {
  return async (dispatch) => {
    const web3 = await getWeb3()

    // Get the contract instance.
    const networkId = await web3.eth.net.getId()
    const deployedNetwork = BallotContract.networks[networkId]
    const instance = new web3.eth.Contract(
      BallotContract.abi,
      deployedNetwork && deployedNetwork.address
    )

    const candidateLength = await instance.methods.getCandidateLength().call()

    let candidates = []
    for (let i = 0; i < candidateLength; i++) {
      const candidatename = await instance.methods.getCandidate(i).call()
      const partyname = await instance.methods.getCandidatePartyName(i).call()
      const partysymbol = await instance.methods
        .getCandidatePartySymbol(i)
        .call()
      const voteCount = await instance.methods.getCandidateVoteCount(i).call()
      const candidate = { candidatename, partyname, partysymbol, voteCount }
      candidates[i] = candidate
    }

    dispatch({ type: 'SET_CANDIDATES', candidates })
  }
}
