import React, { useEffect, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import './App.css'
import GameBoard from './components/GameBoard'

const DIFFICULTIES = [[5, 25], [7, 60], [9, 111]]
const DIFFICULTY_KEY = 'GAME_DIFFICULTY'

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

  const labels = ['Beginner', 'Intermediate', 'Expert']

  return (
    <>
      <div className='top'>
        <div className='difficultyBar'>
          {labels.map((label, i) => (
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
            <div className='flag'>{formatFlags(flagCount)}</div>
          </div>
          <button className='gameBarComponent resetButton' onClick={handleReset}>
            <span className='material-symbols-rounded'>{iconText}</span>
          </button>
          <div className='gameBarComponent timer'>
            <div className='time'>{formatTime(elapsedTime)}</div>
          </div>
        </div>
      </div>
      <div className='bottom'>
        <div className='appbox'>
          <Canvas>
            <GameBoard
              key={gameKey}
              size={DIFFICULTIES[difficulty][0]}
              mineNum={DIFFICULTIES[difficulty][1]}
              setFlagCount={setFlagCount}
              setElapsedTime={setElapsedTime}
              setIconText={setIconText}
            />
          </Canvas>
        </div>
      </div>
    </>
  )
}

export default App