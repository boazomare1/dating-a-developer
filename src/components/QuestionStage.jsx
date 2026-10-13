import { useEffect, useRef, useState } from "react"
import { distanceToRect, nextRotation, pickEscapePosition } from "../escapePosition.js"

const APPROACH_PX = 34
const COOLDOWN_MS = 230

export default function QuestionStage({
  question,
  index,
  total,
  attempts,
  message,
  onAttempt,
  onPreferred,
}) {
  const arenaRef = useRef(null)
  const yesRef = useRef(null)
  const noRef = useRef(null)
  const lockedRef = useRef(false)
  const cooldownRef = useRef(0)
  const escPosRef = useRef(null)
  const prefPosRef = useRef(null)
  const onAttemptRef = useRef(onAttempt)
  const onPreferredRef = useRef(onPreferred)

  const [locked, setLocked] = useState(false)
  const [escPos, setEscPos] = useState(null)
  const [prefPos, setPrefPos] = useState(null)

  onAttemptRef.current = onAttempt
  onPreferredRef.current = onPreferred

  const escapeRef = question.escaping === "Yes" ? yesRef : noRef
  const preferredRef = question.preferred === "Yes" ? yesRef : noRef

  function commitEscape(next, instant) {
    const pos = { ...next, instant }
    escPosRef.current = pos
    setEscPos(pos)
  }

  function commitPreferred(next) {
    prefPosRef.current = next
    setPrefPos(next)
  }

  function readBoxes() {
    const arena = arenaRef.current
    const escapeEl = escapeRef.current
    const preferredEl = preferredRef.current
    if (!arena || !escapeEl || !preferredEl) return null

    const arenaRect = arena.getBoundingClientRect()
    const escapeRect = escapeEl.getBoundingClientRect()
    const preferredRect = preferredEl.getBoundingClientRect()

    return {
      arenaW: arena.clientWidth,
      arenaH: arena.clientHeight,
      escape: {
        x: escapeRect.left - arenaRect.left,
        y: escapeRect.top - arenaRect.top,
        w: escapeRect.width,
        h: escapeRect.height,
      },
      preferred: {
        x: preferredRect.left - arenaRect.left,
        y: preferredRect.top - arenaRect.top,
        w: preferredRect.width,
        h: preferredRect.height,
      },
    }
  }

  function flee(clientX, clientY) {
    const now = performance.now()
    if (now < cooldownRef.current) return
    const boxes = readBoxes()
    if (!boxes) return

    const arenaRect = arenaRef.current.getBoundingClientRect()
    const cursor = {
      x: clientX - arenaRect.left,
      y: clientY - arenaRect.top,
    }
    const current = lockedRef.current && escPosRef.current ? escPosRef.current : boxes.escape
    const preferred = lockedRef.current && prefPosRef.current ? prefPosRef.current : boxes.preferred

    const destination = pickEscapePosition({
      arenaW: boxes.arenaW,
      arenaH: boxes.arenaH,
      btnW: boxes.escape.w,
      btnH: boxes.escape.h,
      pref: preferred,
      cursor,
      current,
    })

    const rotation = nextRotation(escPosRef.current?.rot || 0)
    cooldownRef.current = now + COOLDOWN_MS

    if (!lockedRef.current) {
      lockedRef.current = true
      setLocked(true)
      commitPreferred({
        x: preferred.x,
        y: preferred.y,
        w: preferred.w,
        h: preferred.h,
      })
      commitEscape(
        {
          x: current.x,
          y: current.y,
          w: boxes.escape.w,
          h: boxes.escape.h,
          rot: 0,
        },
        true,
      )
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          commitEscape(
            {
              x: destination.x,
              y: destination.y,
              w: boxes.escape.w,
              h: boxes.escape.h,
              rot: rotation,
            },
            false,
          )
        })
      })
    } else {
      commitEscape(
        {
          x: destination.x,
          y: destination.y,
          w: boxes.escape.w,
          h: boxes.escape.h,
          rot: rotation,
        },
        false,
      )
    }

    onAttemptRef.current()
  }

  useEffect(() => {
    const escapeEl = escapeRef.current
    const preferredEl = preferredRef.current
    if (!escapeEl || !preferredEl) return undefined

    const onPointerDown = (event) => {
      if (event.button !== undefined && event.button !== 0) return
      event.preventDefault()
      event.stopPropagation()
      flee(event.clientX, event.clientY)
    }

    const onClick = (event) => {
      event.preventDefault()
      event.stopPropagation()
    }

    const onKeyDown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    const onContextMenu = (event) => {
      event.preventDefault()
    }

    // Native listeners so preventDefault still works for touch.
    // React's delegated touch listeners are passive.
    escapeEl.addEventListener("pointerdown", onPointerDown, { passive: false })
    escapeEl.addEventListener("click", onClick, true)
    escapeEl.addEventListener("keydown", onKeyDown)
    escapeEl.addEventListener("contextmenu", onContextMenu)

    const onPointerEnter = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return
      flee(event.clientX, event.clientY)
    }
    escapeEl.addEventListener("pointerenter", onPointerEnter)

    const onPointerMove = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return
      const rect = escapeRef.current?.getBoundingClientRect()
      if (!rect) return
      if (distanceToRect(event.clientX, event.clientY, rect) < APPROACH_PX) {
        flee(event.clientX, event.clientY)
      }
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })

    return () => {
      escapeEl.removeEventListener("pointerdown", onPointerDown)
      escapeEl.removeEventListener("click", onClick, true)
      escapeEl.removeEventListener("keydown", onKeyDown)
      escapeEl.removeEventListener("contextmenu", onContextMenu)
      escapeEl.removeEventListener("pointerenter", onPointerEnter)
      window.removeEventListener("pointermove", onPointerMove)
    }
  }, [question.id])

  useEffect(() => {
    const arena = arenaRef.current
    if (!arena) return undefined

    const clampIntoArena = () => {
      if (!lockedRef.current || !escPosRef.current || !prefPosRef.current) return
      const escapeEl = escapeRef.current
      const preferredEl = preferredRef.current
      const yesEl = yesRef.current
      const noEl = noRef.current
      if (!escapeEl || !preferredEl || !yesEl || !noEl) return

      const btnW = escapeEl.offsetWidth
      const btnH = escapeEl.offsetHeight
      const arenaW = arena.clientWidth
      const arenaH = arena.clientHeight
      const pad = 12
      const maxX = Math.max(pad, arenaW - btnW - pad)
      const maxY = Math.max(pad, arenaH - btnH - pad)

      const yesW = yesEl.offsetWidth
      const noW = noEl.offsetWidth
      const prefW = preferredEl.offsetWidth
      const prefH = preferredEl.offsetHeight
      const gap = 18
      const startX = Math.min(Math.max(pad, (arenaW - yesW - noW - gap) / 2), Math.max(pad, arenaW - prefW - pad))
      const homeY = Math.min(Math.max(pad, (arenaH - prefH) / 2), Math.max(pad, arenaH - prefH - pad))
      const homeX = question.preferred === "Yes" ? startX : startX + yesW + gap
      const preferred = {
        x: Math.min(Math.max(pad, homeX), Math.max(pad, arenaW - prefW - pad)),
        y: homeY,
        w: prefW,
        h: prefH,
      }
      commitPreferred(preferred)

      let x = Math.min(Math.max(pad, escPosRef.current.x), maxX)
      let y = Math.min(Math.max(pad, escPosRef.current.y), maxY)
      const overlaps =
        x < preferred.x + preferred.w + gap &&
        x + btnW + gap > preferred.x &&
        y < preferred.y + preferred.h + gap &&
        y + btnH + gap > preferred.y

      if (overlaps) {
        const relocated = pickEscapePosition({
          arenaW,
          arenaH,
          btnW,
          btnH,
          pref: preferred,
          cursor: null,
          current: { x, y },
        })
        x = relocated.x
        y = relocated.y
      }

      commitEscape(
        {
          x,
          y,
          w: btnW,
          h: btnH,
          rot: escPosRef.current.rot || 0,
        },
        true,
      )
    }

    const observer = new ResizeObserver(() => {
      clampIntoArena()
    })
    observer.observe(arena)
    window.addEventListener("resize", clampIntoArena)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", clampIntoArena)
    }
  }, [question.id])

  function handlePreferredClick() {
    onPreferredRef.current()
  }

  function placedStyle(label) {
    if (!locked) return undefined
    const isEscape = label === question.escaping
    const box = isEscape ? escPos : prefPos
    if (!box) return undefined
    return {
      transform: `translate3d(${box.x}px, ${box.y}px, 0) rotate(${box.rot || 0}deg)`,
    }
  }

  function buttonClass(label) {
    const isEscape = label === question.escaping
    const box = isEscape ? escPos : prefPos
    return [
      "btn",
      isEscape ? "btn-primary is-escape" : "btn-ghost",
      locked ? "is-placed" : "",
      locked && isEscape && box?.instant ? "is-instant" : "",
    ]
      .filter(Boolean)
      .join(" ")
  }

  const attemptLabel =
    attempts === 1 ? "1 failed attempt" : attempts > 1 ? `${attempts} failed attempts` : ""

  return (
    <section className="stage" aria-labelledby="question-title">
      <p className="badge">
        QUESTION {index + 1} OF {total}
      </p>
      <div className="copy" aria-live="polite">
        <h1 id="question-title" data-testid="question">
          {question.question}
        </h1>
        <p className="subtitle">{question.subtitle}</p>
      </div>
      <div className="arena" ref={arenaRef} data-testid="arena">
        <div className="dock">
          <AnswerButton
            label="Yes"
            buttonRef={yesRef}
            className={buttonClass("Yes")}
            style={placedStyle("Yes")}
            escaping={question.escaping === "Yes"}
            onPreferredClick={handlePreferredClick}
          />
          <AnswerButton
            label="No"
            buttonRef={noRef}
            className={buttonClass("No")}
            style={placedStyle("No")}
            escaping={question.escaping === "No"}
            onPreferredClick={handlePreferredClick}
          />
        </div>
      </div>
      <p className="reaction" aria-live="polite" data-testid="reaction">
        {message}
      </p>
      <p className="count" data-testid="attempts" aria-hidden={attempts === 0}>
        {attemptLabel}
      </p>
    </section>
  )
}

function AnswerButton({ label, buttonRef, className, style, escaping, onPreferredClick }) {
  if (escaping) {
    return (
      <button
        ref={buttonRef}
        type="button"
        className={className}
        style={style}
        tabIndex={-1}
        aria-hidden="true"
        draggable="false"
        data-testid="escape-button"
      >
        {label}
      </button>
    )
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={className}
      style={style}
      data-testid="preferred-button"
      onClick={onPreferredClick}
    >
      {label}
    </button>
  )
}
