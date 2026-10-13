function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function nextRotation(previous = 0) {
  const roll = Math.random()
  if (roll < 0.16) return 0
  const magnitude = 5 + Math.random() * 7
  if (previous > 3) return -magnitude
  if (previous < -3) return magnitude
  return (roll < 0.58 ? -1 : 1) * magnitude
}

/**
 * Pick a new top-left for the escaping button inside the arena.
 * Destinations stay clear of the preferred button, the pointer, and the edges.
 */
export function pickEscapePosition({ arenaW, arenaH, btnW, btnH, pref, cursor, current }) {
  const padX = 12
  const padY = 14
  const maxX = Math.max(padX, arenaW - btnW - padX)
  const maxY = Math.max(padY, arenaH - btnH - padY)
  const minTravel = Math.min(104, Math.max(56, Math.min(arenaW, arenaH) * 0.22))
  const cursorClear = Math.min(104, Math.max(64, Math.min(arenaW, arenaH) * 0.28))
  const gap = 18

  const overlaps = (x, y) =>
    !(
      x + btnW + gap <= pref.x ||
      x >= pref.x + pref.w + gap ||
      y + btnH + gap <= pref.y ||
      y >= pref.y + pref.h + gap
    )

  const nearCursor = (x, y) => {
    if (!cursor) return false
    const cx = x + btnW / 2
    const cy = y + btnH / 2
    return Math.hypot(cx - cursor.x, cy - cursor.y) < cursorClear
  }

  const nearCurrent = (x, y) => Math.hypot(x - current.x, y - current.y) < minTravel

  const inside = (x, y) => x >= padX - 0.5 && y >= padY - 0.5 && x <= maxX + 0.5 && y <= maxY + 0.5

  const acceptable = (x, y) => inside(x, y) && !overlaps(x, y) && !nearCursor(x, y) && !nearCurrent(x, y)

  const bias = Math.random()
  const candidates = []

  for (let i = 0; i < 56; i += 1) {
    let x = padX + Math.random() * Math.max(0, maxX - padX)
    let y = padY + Math.random() * Math.max(0, maxY - padY)

    if (bias < 0.34) {
      y = clamp(current.y + (Math.random() * 24 - 12), padY, maxY)
    } else if (bias < 0.66) {
      x = clamp(current.x + (Math.random() * 24 - 12), padX, maxX)
    }

    if (acceptable(x, y)) candidates.push({ x, y })
  }

  if (candidates.length > 0) {
    return candidates[Math.floor(Math.random() * candidates.length)]
  }

  const midX = clamp((padX + maxX) / 2, padX, maxX)
  const midY = clamp((padY + maxY) / 2, padY, maxY)
  const spots = [
    { x: padX, y: padY },
    { x: maxX, y: padY },
    { x: padX, y: maxY },
    { x: maxX, y: maxY },
    { x: midX, y: padY },
    { x: midX, y: maxY },
    { x: padX, y: midY },
    { x: maxX, y: midY },
  ]

  let best = null
  let bestScore = -1

  for (const spot of spots) {
    if (!inside(spot.x, spot.y) || overlaps(spot.x, spot.y)) continue
    const awayCursor = cursor
      ? Math.hypot(spot.x + btnW / 2 - cursor.x, spot.y + btnH / 2 - cursor.y)
      : 140
    const awayCurrent = Math.hypot(spot.x - current.x, spot.y - current.y)
    const score = awayCursor + awayCurrent * 0.7
    if (score > bestScore) {
      bestScore = score
      best = spot
    }
  }

  if (best) return best

  const fallback = [
    { x: padX, y: clamp(pref.y, padY, maxY) },
    { x: maxX, y: clamp(pref.y, padY, maxY) },
    { x: clamp(pref.x, padX, maxX), y: padY },
    { x: clamp(pref.x, padX, maxX), y: maxY },
  ]

  fallback.sort((a, b) => {
    const distanceA = Math.hypot(a.x - current.x, a.y - current.y) + Math.hypot(a.x - pref.x, a.y - pref.y)
    const distanceB = Math.hypot(b.x - current.x, b.y - current.y) + Math.hypot(b.x - pref.x, b.y - pref.y)
    return distanceB - distanceA
  })

  return fallback[0]
}

export function distanceToRect(x, y, rect) {
  const dx = Math.max(rect.left - x, 0, x - rect.right)
  const dy = Math.max(rect.top - y, 0, y - rect.bottom)
  return Math.hypot(dx, dy)
}
