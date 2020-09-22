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
        <img src={candidate.partysymbol} alt="" height="60"></img>
      </div>
      <div className="candidate-list">
        <div className="candidate-info">
          <h2 className="text-dark">{candidate.candidatename}</h2>
          <h4 className="text-secondary">{candidate.partyname}</h4>
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
              style={{ height: '60px', width: '60px' }}
            />
          </div>
        )}
      </div>
      {location.pathname === '/results' && <h2>{candidate.voteCount}</h2>}
    </div>
  )
}

export default withRouter(Candidate)
