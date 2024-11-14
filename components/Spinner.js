import React from 'react'
import { FadeLoader } from 'react-spinners'

const Spinner = () => {
  return (
    <div>
      <FadeLoader color='#1E3A8A' speedMultiplier={2}/>
    </div>
  )
}

export default Spinner
