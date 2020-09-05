import React from 'react'

function Candidate({ candidate }) {
  return (
    <div>
      <h1>{candidate.candidatename}</h1>
      <h3>{candidate.partyname}</h3>
      <img src={candidate.partysymbol} alt="" height="75"></img>
    </div>
  )
}

export default Candidate
