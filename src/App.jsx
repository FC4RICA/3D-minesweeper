import React, { useEffect, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import './App.css'
import GameBoard from './components/GameBoard'
import { useLeaderboard } from './hooks/useLeaderboard'
import LeaderboardButton from './components/leaderboard/LeaderboardButton'
import LeaderboardModal from './components/leaderboard/LeaderboardModal'
import ScoreSubmitModal from './components/leaderboard/ScoreSubmitModal'
import { DIFFICULTIES, DIFFICULTY_KEY, DIFFICULTY_LABELS } from './constants'

const App = () => {
  const [difficulty, setDifficulty] = useState(() => {
    const saved = window.localStorage.getItem(DIFFICULTY_KEY)
    return saved != null ? JSON.parse(saved) : 0
  })

  // Key forces GameBoard to fully remount (re-init) when difficulty or reset changes
  const [gameKey, setGameKey] = useState(0)

  // UI state lives here — no more direct DOM manipulation
  const [flagCount, setFlagCount] = useState(DIFFICULTIES[difficulty][1])
  const [elapsedTime, setElapsedTime] = useState(0)
  const [iconText, setIconText] = useState('sentiment_satisfied')

  useEffect(() => {
    window.localStorage.setItem(DIFFICULTY_KEY, JSON.stringify(difficulty))
  }, [difficulty])

  const handleDifficultyChange = useCallback((index) => {
    setDifficulty(index)
    setGameKey(k => k + 1)
    setFlagCount(DIFFICULTIES[index][1])
    setElapsedTime(0)
    setIconText('sentiment_satisfied')
  }, [])

  const handleReset = useCallback(() => {
    setGameKey(k => k + 1)
    setFlagCount(DIFFICULTIES[difficulty][1])
    setElapsedTime(0)
    setIconText('sentiment_satisfied')
  }, [difficulty])

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0')
    const s = String(secs % 60).padStart(2, '0')
    return `${m}:${s}`
  }

  const formatFlags = (n) => String(n).padStart(3, '0')

  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  const { scores, loading, fetchScores, submitScore } = useLeaderboard()

  const handleGameOver = useCallback((result) => {
    if (result === 'win') {
      setIconText('sentiment_very_satisfied')
      setShowSubmit(true)
    } else {
      setIconText('sentiment_very_dissatisfied')
    }
  }, [])

  const handleSubmit = useCallback(async (name) => {
    await submitScore(name, elapsedTime, difficulty)
    setShowSubmit(false)
  }, [elapsedTime, difficulty, submitScore])

  return (
    <>
      <div className='difficultyBar'>
        {DIFFICULTY_LABELS.map((label, i) => (
          <button
            key={i}
            className='difficultyButton'
            onClick={() => handleDifficultyChange(i)}
            style={difficulty === i ? { color: 'white', textDecoration: 'underline' } : {}}
          >
            {label}
          </button>
        ))}
      </div>
      <div className='gameBar'>
        <div className='gameBarComponent flagNumber'>
          <span className='material-symbols-rounded'>flag</span>
          <div>{formatFlags(flagCount)}</div>
        </div>
        <button className='gameBarComponent resetButton' onClick={handleReset}>
          <span className='material-symbols-rounded'>{iconText}</span>
        </button>
        <div className='gameBarComponent timer'>
          <span className='material-symbols-rounded'>timer</span>
          <div>{formatTime(elapsedTime)}</div>
        </div>
        <LeaderboardButton onClick={() => setShowLeaderboard(true)} />
      </div>
      <div className='appbox'>
        <Canvas>
          <GameBoard
            key={gameKey}
            size={DIFFICULTIES[difficulty][0]}
            mineNum={DIFFICULTIES[difficulty][1]}
            setFlagCount={setFlagCount}
            setElapsedTime={setElapsedTime}
            onGameOver={handleGameOver}
          />
        </Canvas>
      </div>

      {showSubmit && (
        <ScoreSubmitModal
          time={elapsedTime}
          difficulty={difficulty}
          onSubmit={handleSubmit}
          onSkip={() => setShowSubmit(false)}
        />
      )}
      {showLeaderboard && (
        <LeaderboardModal
          scores={scores}
          loading={loading}
          fetchScores={fetchScores}
          onClose={() => setShowLeaderboard(false)}
        />
      )}
    </>
  )
}

export default App