import { useState } from 'react'
import { DIFFICULTY_LABELS } from '../../constants'

const ScoreSubmitModal = ({ time, difficulty, onSubmit, onSkip }) => {
  const [name, setName] = useState('')

  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0')
    const sec = String(s % 60).padStart(2, '0')
    return `${m}:${sec}`
  }

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <h2>You win! 🎉</h2>
        <p>{DIFFICULTY_LABELS[difficulty]} — {formatTime(time)}</p>
        <input
          className='modal-input'
          type='text'
          placeholder='Enter your name'
          maxLength={50}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className='modal-actions'>
          <button onClick={onSkip}>Skip</button>
          <button
            disabled={!name.trim()}
            onClick={() => onSubmit(name.trim())}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default ScoreSubmitModal