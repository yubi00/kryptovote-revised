import React, { useState, useEffect } from 'react'
import moment from 'moment'

function Election({ election }) {
  const [electionStatus, setStatus] = useState('')
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
    <div>
      {electionStatus && <h2>{electionStatus}</h2>}
      {electionName && <p>{electionName}</p>}
      {description && <p>{description}</p>}
      {votingDeadline !== 0 && electionName && (
        <p>{moment.unix(votingDeadline).format('MMM Do YY, h:mm:ss a')}</p>
      )}
    </div>
  )
}

export default Election
