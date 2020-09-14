import { Transaction as Tx } from 'ethereumjs-tx'
import { toBuffer, privateToAddress } from 'ethereumjs-util'
import Web3 from 'web3'
import BallotContract from '../contracts/Ballot.json'
import moment from 'moment'

export const signTransaction = async (uid, message, candidateName) => {
  const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
  const web3 = new Web3(provider)

  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]
  // Get the contract instance.
  const networkId = await web3.eth.net.getId()
  const deployedNetwork = BallotContract.networks[networkId]
  const instance = new web3.eth.Contract(
    BallotContract.abi,
    deployedNetwork && deployedNetwork.address
  )

  const privateKey = web3.utils.sha3(uid)

  const voterAddress = `0x${privateToAddress(toBuffer(privateKey)).toString(
    'hex'
  )}`

  const hasVoted = await instance.methods.getVoted(voterAddress).call()
  const votingDeadline = await instance.methods.getVotingDeadline().call()
  const currentTime = moment().valueOf()
  const difference = parseInt(votingDeadline) - Math.floor(currentTime / 1000)

  if (difference <= 0) throw new Error('Voting period already ended ')
  if (hasVoted) throw new Error('You cannot vote more than once')

  if (!hasVoted && difference > 0) {
    await web3.eth.sendTransaction({
      from: account,
      to: voterAddress,
      value: web3.utils.toWei('1', 'ether')
    })

    const methodSignature = web3.eth.abi.encodeFunctionSignature(message)

    const messageHex = web3.utils.fromAscii(candidateName, 32)
    const encodedParameter = web3.eth.abi.encodeParameter('bytes32', messageHex)

    const transactionData = methodSignature + encodedParameter.substr(2)

    const txParams = {
      gasPrice: '0x20000000000',
      gasLimit: '0x50000',
      from: voterAddress,
      to: deployedNetwork.address,
      data: transactionData
    }

    txParams.nonce = await web3.eth.getTransactionCount(voterAddress)

    const tx = new Tx(txParams)
    tx.sign(toBuffer(privateKey))

    const serializedTx = tx.serialize()
    const transactionHash = await web3.eth.sendSignedTransaction(
      '0x' + serializedTx.toString('hex')
    )
    return { transactionHash, voterAddress }
  }
}
