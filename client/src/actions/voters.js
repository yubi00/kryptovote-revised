export const setVoters = (voters) => ({
  type: 'SET_VOTERS',
  voters
})

export const loadVoters = (instance) => {
  return async (dispatch) => {
    try {
      const votersLength = await instance.methods.getVotersLength().call()
      const voters = []
      for (let i = 0; i < votersLength; i++) {
        const voter = await instance.methods.getVoter(i).call()
        voters.push(voter)
      }
      dispatch(setVoters(voters))
    } catch (error) {
      return
    }
  }
}

export const addVoter = (voter) => ({
  type: 'ADD_VOTER',
  voter
})

export const resetVoters = () => {
  return async (dispatch) => {
    dispatch({ type: 'RESET_VOTERS' })
  }
}
