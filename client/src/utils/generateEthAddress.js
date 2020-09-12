import { toBuffer, privateToAddress } from 'ethereumjs-util'

export const generateEthAddress = (web3, id) => {
  const privateKey = web3.utils.sha3(id)
  const voterAddress = `0x${privateToAddress(toBuffer(privateKey)).toString(
    'hex'
  )}`
  return voterAddress
}
