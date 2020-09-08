import ethUtil from 'ethereumjs-util'
import getWeb3 from './getWeb3'

export const generateEthAddress = async (email) => {
  const web3 = await getWeb3()

  const privateKey = web3.utils.sha3(email)
  const ethAddress = `0x${ethUtil
    .privateToAddress(web3.utils.hexToBytes(privateKey))
    .toString('hex')}`

  return ethAddress
}
