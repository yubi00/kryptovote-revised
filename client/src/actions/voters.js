import { getInstance } from '../utils/getInstance'

export const setVoters = (voters) => ({
  type: 'SET_VOTERS',
  voters
})

export const loadVoters = () => {
  return async (dispatch) => {
    const { instance } = await getInstance()
    const votersLength = await instance.methods.getVotersLength().call()
    const voters = []
    for (let i = 0; i < votersLength; i++) {
      const voter = await instance.methods.getVoter(i).call()
      voters.push(voter)
    }
    dispatch(setVoters(voters))
  }
}

export const addVoter = (voter) => ({
  type: 'ADD_VOTER',
  voter
})
