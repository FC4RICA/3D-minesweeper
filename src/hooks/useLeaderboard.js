import { useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export const useLeaderboard = () => {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchScores = useCallback(async (difficulty) => {
    setLoading(true)
    const { data } = await supabase
      .from('leaderboard')
      .select('name, time, difficulty, created_at')
      .eq('difficulty', difficulty)
      .order('time', { ascending: true })
      .limit(10)
    setScores(data ?? [])
    setLoading(false)
  }, [])

  const submitScore = useCallback(async (name, time, difficulty) => {
    await supabase.from('leaderboard').insert({ name, time, difficulty })
  }, [])

  return { scores, loading, fetchScores, submitScore }
}