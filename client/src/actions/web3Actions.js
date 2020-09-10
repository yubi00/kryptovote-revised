import { getInstance } from '../utils/getInstance'

export const loadWeb3 = () => {
  return async (dispatch) => {
    const { web3, accounts, instance } = await getInstance()
    dispatch({
      type: 'LOAD_WEB3',
      web3,
      accounts,
      instance
    })
  }
}
