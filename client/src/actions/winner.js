import { getInstance } from '../utils/getInstance'

export const getWinner = () => {
  return async (dispatch) => {
    const { instance } = await getInstance()

    try {
      const winnerName = await instance.methods.winnerName().call()
      dispatch({
        type: 'SET_WINNER',
        winnerName
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}
