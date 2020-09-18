export const getWinner = (instance) => {
  return async (dispatch) => {
    try {
      const winnerName = await instance.methods.winnerName().call()
      dispatch({
        type: 'SET_WINNER',
        winnerName
      })
    } catch (error) {
      return
    }
  }
}

export const setResults = (instance, candidates) => {
  return async (dispatch) => {
    try {
      for (let i = 0; i < candidates.length; i++) {
        const voteCount = await instance.methods.getCandidateVoteCount(i).call()
        candidates[i] = { ...candidates[i], voteCount: parseInt(voteCount) }
      }
      dispatch({ type: 'SET_RESULTS', candidates })
    } catch (error) {
      return
    }
  }
}

export const resetResults = () => ({
  type: 'RESET_RESULTS'
})
