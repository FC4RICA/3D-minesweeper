# 3D Minesweeper

Classic Minesweeper reimagined on the surface of a 3D cube, playable in the browser.

**[Play here](https://threed-minesweeper.onrender.com)**

## Stack

- React + Vite
- Three.js / React Three Fiber / React Three Drei
- React Spring

## Gameplay

The board is a cube — each face is a minesweeper grid. You can rotate and zoom freely.

**Difficulty**

| Level | Grid | Mines |
|---|---|---|
| Beginner | 5×5×5 | 25 |
| Intermediate | 7×7×7 | 60 |
| Expert | 9×9×9 | 111 |

**Controls**

| Input | Action |
|---|---|
| Scroll | Zoom in / out |
| Left drag | Rotate cube |
| Left click | Reveal cell |
| Right click | Place / remove flag |

**Winning & losing**
- Revealed number = count of mines in all surrounding cells, including across edges to adjacent faces
- Hit a mine → game over, all mines revealed
- Reveal all non-mine cells → you win
- Click the center icon to reset

## Setup

**Prerequisites:** Node 20+, Docker (optional)

### Local dev

```bash
npm install
npm run dev
```

### Docker

```bash
# dev
docker compose --profile dev up

# prod
docker compose --profile prod up

# test
docker compose --profile test up
```

### Run tests

```bash
npm run test:run        # single run
npm run test            # watch mode
```

## CI/CD

CI runs tests and a prod build on every push and PR via GitHub Actions.
CD deploys to Render automatically after tests pass on `main`.
