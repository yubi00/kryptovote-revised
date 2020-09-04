import getWeb3 from '../utils/getWeb3'
import BallotContract from '../contracts/Ballot.json'

export const loadWeb3 = () => {
  return async (dispatch) => {
    const web3 = await getWeb3()
    const accounts = await web3.eth.getAccounts()

    // Get the contract instance.
    const networkId = await web3.eth.net.getId()
    const deployedNetwork = BallotContract.networks[networkId]
    const instance = new web3.eth.Contract(
      BallotContract.abi,
      deployedNetwork && deployedNetwork.address
    )

    dispatch({
      type: 'LOAD_WEB3',
      web3,
      accounts,
      instance
    })
  }
}
