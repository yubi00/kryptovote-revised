import { Transaction as Tx } from 'ethereumjs-tx'
import { toBuffer, privateToAddress } from 'ethereumjs-util'
import BallotContract from '../contracts/Ballot.json'
import moment from 'moment'

export const signTransaction = async (web3, uid, message, candidateName) => {
  const account = '0x6daD3E94044A7f6aB9eF95442fB22F7C23524f9c'
  const ACCOUNT_PRIVATE_KEY = process.env.REACT_APP_ACCOUNT_PRIVATE_KEY

  const contractAddress = '0x0842910c20d8B0c98d485c439F20708Af336bb01'

  const instance = new web3.eth.Contract(BallotContract.abi, contractAddress)

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
    let balance = await web3.eth.getBalance(voterAddress)

    if (balance < web3.utils.toWei('0.10', 'ether')) {
      const txParams = {
        gasPrice: '0x200000000',
        gasLimit: '0x50000',
        from: account,
        to: voterAddress,
        value: web3.utils.toHex(web3.utils.toWei('0.10', 'ether'))
      }

      txParams.nonce = await web3.eth.getTransactionCount(account)
      const tx = new Tx(txParams, { chain: 'ropsten' })
      tx.sign(Buffer.from(ACCOUNT_PRIVATE_KEY, 'hex'))

      const serializedTx = tx.serialize()
      const TxHash = await web3.eth.sendSignedTransaction(
        '0x' + serializedTx.toString('hex')
      )
      if (!TxHash) throw new Error('Insufficient funds')
    }

    balance = await web3.eth.getBalance(voterAddress)
    if (balance > 0) {
      const methodSignature = web3.eth.abi.encodeFunctionSignature(message)

      const messageHex = web3.utils.fromAscii(candidateName, 32)
      const encodedParameter = web3.eth.abi.encodeParameter(
        'bytes32',
        messageHex
      )

      const transactionData = methodSignature + encodedParameter.substr(2)

      const txParams = {
        gasPrice: '0x200000000',
        gasLimit: '0x500000',
        from: voterAddress,
        to: contractAddress,
        data: transactionData
      }

      txParams.nonce = await web3.eth.getTransactionCount(voterAddress)

      const tx = new Tx(txParams, { chain: 'ropsten' })
      tx.sign(toBuffer(privateKey))

      const serializedTx = tx.serialize()
      const transactionHash = await web3.eth.sendSignedTransaction(
        '0x' + serializedTx.toString('hex')
      )
      return { transactionHash, voterAddress }
    }
  }
}
