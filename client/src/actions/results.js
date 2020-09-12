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

export const setResults = (candidates) => {
  return async (dispatch) => {
    const { instance } = await getInstance()
    for (let i = 0; i < candidates.length; i++) {
      const voteCount = await instance.methods.getCandidateVoteCount(i).call()
      candidates[i] = { ...candidates[i], voteCount: parseInt(voteCount) }
    }
    console.log(candidates)
    dispatch({ type: 'SET_RESULTS', candidates })
  }
}

export const resetResults = () => ({
  type: 'RESET_RESULTS'
})
