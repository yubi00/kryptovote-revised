import React from 'react'
import moment from 'moment'

function Election({ election }) {
  const { electionName, description, votingDeadline } = election
  return (
    <div>
      {electionName && <p>{electionName}</p>}
      {description && <p>{description}</p>}
      {votingDeadline && (
        <p>{moment.unix(votingDeadline).format('h:mm:ss a')}</p>
      )}
    </div>
  )
}

export default Election
