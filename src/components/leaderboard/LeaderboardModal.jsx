import { useEffect, useState } from 'react'
import { DIFFICULTY_LABELS } from '../../constants'

const LeaderboardModal = ({ onClose, fetchScores, scores, loading }) => {
  const [difficulty, setDifficulty] = useState(0)

  useEffect(() => {
    fetchScores(difficulty)
  }, [difficulty])

  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0')
    const sec = String(s % 60).padStart(2, '0')
    return `${m}:${sec}`
  }

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <h2>Leaderboard</h2>
        <div className='modal-tabs'>
          {DIFFICULTY_LABELS.map((label, i) => (
            <button
              key={i}
              onClick={() => setDifficulty(i)}
              style={difficulty === i ? { textDecoration: 'underline' } : {}}
            >
              {label}
            </button>
          ))}
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className='modal-table'>
            <thead>
              <tr><th>#</th><th>Name</th><th>Time</th></tr>
            </thead>
            <tbody>
              {scores.map((s, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{s.name}</td>
                  <td>{formatTime(s.time)}</td>
                </tr>
              ))}
              {scores.length === 0 && (
                <tr><td colSpan={3}>No scores yet</td></tr>
              )}
            </tbody>
          </table>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default LeaderboardModal