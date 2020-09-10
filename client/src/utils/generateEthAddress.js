import { toBuffer, privateToAddress } from 'ethereumjs-util'

export const generateEthAddress = (web3, email) => {
  const privateKey = web3.utils.sha3(email)
  const voterAddress = `0x${privateToAddress(toBuffer(privateKey)).toString(
    'hex'
  )}`
  return voterAddress
}
