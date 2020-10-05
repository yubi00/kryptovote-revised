import React from 'react'
import '../styles/Counter.css'

function CounterCard({ type, title }) {
  return (
    <div className='counter-card'>
      <div className='text-white bg-info mb-1 mr-2  p-3 countercard-type'>
        {type}
      </div>
      <p className='text-secondary p-1  countercard-title'>{title}</p>
    </div>
  )
}

export default CounterCard
