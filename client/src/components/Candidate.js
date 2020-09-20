import React from 'react'
import { withRouter } from 'react-router-dom'
import '../styles/Candidate.css'

function Candidate({ candidate, location, selectedOption, setValue }) {
  const onChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className="candidate">
      <div className="avatar">
        <img src={candidate.partysymbol} alt="" height="75"></img>
      </div>
      <div className="candidate-list">
        <div className="candidate-info">
          <h1>{candidate.candidatename}</h1>
          <h4>{candidate.partyname}</h4>
        </div>

        {location.pathname === '/vote' && (
          <div className="candidate-option">
            <input
              type="radio"
              name="candidate"
              value={candidate.candidatename}
              id={candidate.candidatename}
              checked={selectedOption === candidate.candidatename}
              onChange={onChange}
              style={{ height: '80px', width: '80px' }}
            />
          </div>
        )}
      </div>
      {location.pathname === '/results' && <h2>{candidate.voteCount}</h2>}
    </div>
  )
}

export default withRouter(Candidate)
