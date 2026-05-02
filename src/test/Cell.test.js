import { describe, it, expect } from 'vitest'
import Cell from '../models/Cell'

describe('Cell', () => {
  it('initializes with correct defaults', () => {
    const cell = new Cell(false, '')
    expect(cell.isRevealed).toBe(false)
    expect(cell.isFlagged).toBe(false)
  })

  it('stores isMined and adjacentMines', () => {
    const cell = new Cell(true, '3')
    expect(cell.isMined).toBe(true)
    expect(cell.adjacentMines).toBe('3')
  })
})