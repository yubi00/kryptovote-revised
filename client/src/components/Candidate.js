import React from 'react'
import { withRouter } from 'react-router-dom'

function Candidate({ candidate, location, selectedOption, setValue }) {
  const onChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div>
      <h1>{candidate.candidatename}</h1>
      <h3>{candidate.partyname}</h3>
      <img src={candidate.partysymbol} alt="" height="75"></img>
      {location.pathname === '/vote' && (
        <div>
          <input
            type="radio"
            name="candidate"
            value={candidate.candidatename}
            id={candidate.candidatename}
            checked={selectedOption === candidate.candidatename}
            onChange={onChange}
            style={{ height: '50px', width: '50px' }}
          />
        </div>
      )}
      {location.pathname === '/results' && <h2>{candidate.voteCount}</h2>}
    </div>
  )
}

export default withRouter(Candidate)
