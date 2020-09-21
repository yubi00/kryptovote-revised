import React, { useState, useEffect } from 'react'
import moment from 'moment'

function Election({ election }) {
  const [electionStatus, setStatus] = useState('ELECTION NOT CREATED YET')
  const { electionName, description, votingDeadline } = election

  useEffect(() => {
    const getDifference = () => {
      const currentTime = moment().valueOf()
      const difference =
        parseInt(votingDeadline) - Math.floor(currentTime / 1000)
      return difference
    }

    const difference = getDifference()
    if (difference > 0) {
      setStatus('ELECTION IN PROGRESS')
    } else {
      setStatus('ELECTION ENDED')
    }
  }, [votingDeadline])

  return (
    <div className="text-light">
      {electionStatus && <h5 className="mb-3">{electionStatus}</h5>}
      {electionName && <p>{electionName}</p>}
      {description && <p>{description}</p>}
      {votingDeadline !== 0 && electionName && (
        <p>{moment.unix(votingDeadline).format('MMM Do YY, h:mm:ss a')}</p>
      )}
    </div>
  )
}

export default Election
