export const addCandidate = (candidate) => ({
  type: 'ADD_CANDIDATE',
  candidate
})

export const setCandidates = (instance) => {
  return async (dispatch) => {
    try {
      const candidateLength = await instance.methods.getCandidateLength().call()
      let candidates = []
      for (let i = 0; i < candidateLength; i++) {
        const candidatename = await instance.methods.getCandidate(i).call()
        const partyname = await instance.methods.getCandidatePartyName(i).call()
        const partysymbol = await instance.methods
          .getCandidatePartySymbol(i)
          .call()
        const candidate = { candidatename, partyname, partysymbol }
        candidates[i] = candidate
      }

      dispatch({ type: 'SET_CANDIDATES', candidates })
    } catch (error) {
      return
    }
  }
}

export const resetCandidates = () => ({
  type: 'RESET_CANDIDATES'
})
