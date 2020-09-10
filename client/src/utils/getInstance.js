import getWeb3 from './getWeb3'
import BallotContract from '../contracts/Ballot.json'

export const getInstance = async () => {
  const web3 = await getWeb3()
  const accounts = await web3.eth.getAccounts()
  // Get the contract instance.
  const networkId = await web3.eth.net.getId()
  const deployedNetwork = BallotContract.networks[networkId]
  const instance = new web3.eth.Contract(
    BallotContract.abi,
    deployedNetwork && deployedNetwork.address
  )

  return { web3, accounts, instance }
}
