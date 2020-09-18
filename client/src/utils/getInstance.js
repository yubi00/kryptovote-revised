import getWeb3 from './getWeb3'
import BallotContract from '../contracts/Ballot.json'

export const getInstance = async () => {
  const web3 = await getWeb3()
  const accounts = await web3.eth.getAccounts()
  const contractAddress = '0x0842910c20d8B0c98d485c439F20708Af336bb01'

  const instance = new web3.eth.Contract(BallotContract.abi, contractAddress)
  return { web3, accounts, instance }
}
