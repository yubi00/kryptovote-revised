import React from 'react'
import '../styles/Counter.css'

function CounterCard({ type, title }) {
  return (
    <div className="counter-card bg-info">
      <div className="h3 text-white mb-1 p-1">{type}</div>
      <p className="h4 text-light p-1">{title}</p>
    </div>
  )
}

export default CounterCard
