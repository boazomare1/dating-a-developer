import { useRef, useState } from "react"
import { AUDIENCES, SPOILER, nextMessage } from "./data.js"
import { setWhoParam, whoFromLocation } from "./share.js"
import Header from "./components/Header.jsx"
import AudienceSelect from "./components/AudienceSelect.jsx"
import QuestionStage from "./components/QuestionStage.jsx"
import EndingScreen from "./components/EndingScreen.jsx"
import InvestmentFooter from "./components/InvestmentFooter.jsx"

const FADE_MS = 260
const HOME = {
  exe: "dating-a-dev.exe",
  tagline: "Same attitude. Different audience:",
}
const INITIAL_WHO = whoFromLocation()

export default function App() {
  const [phase, setPhase] = useState(INITIAL_WHO ? "quiz" : "pick")
  const [audienceId, setAudienceId] = useState(INITIAL_WHO)
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState(INITIAL_WHO ? SPOILER : "")
  const attemptsRef = useRef(0)
  const recentRef = useRef([])
  const busyRef = useRef(false)

  const audience = AUDIENCES.find((item) => item.id === audienceId) ?? null
  const question = audience?.questions[index]

  function resetRound(nextMessageText) {
    attemptsRef.current = 0
    recentRef.current = []
    setAttempts(0)
    setMessage(nextMessageText)
  }

  function handleAttempt() {
    const next = attemptsRef.current + 1
    attemptsRef.current = next
    setAttempts(next)
    if (next === 1 || next % 2 === 0) {
      const text = nextMessage(next, recentRef.current, audience?.messages ?? [])
      recentRef.current = [...recentRef.current, text].slice(-6)
      setMessage(text)
    }
  }

  function finishFade(apply) {
    window.setTimeout(() => {
      apply()
      setVisible(true)
      busyRef.current = false
    }, FADE_MS)
  }

  function handleSelect(id) {
    if (busyRef.current) return
    busyRef.current = true
    setVisible(false)
    setWhoParam(id)
    finishFade(() => {
      setAudienceId(id)
      setPhase("quiz")
      setIndex(0)
      resetRound(SPOILER)
    })
  }

  function handlePreferred() {
    if (busyRef.current || !audience) return
    busyRef.current = true
    setVisible(false)

    finishFade(() => {
      if (index >= audience.questions.length - 1) {
        setPhase("done")
        return
      }
      setIndex(index + 1)
      resetRound("")
    })
  }

  function handleRestart() {
    if (busyRef.current) return
    busyRef.current = true
    setVisible(false)
    finishFade(() => {
      setPhase("quiz")
      setIndex(0)
      resetRound(SPOILER)
    })
  }

  function handleSwitch() {
    if (busyRef.current) return
    busyRef.current = true
    setVisible(false)
    setWhoParam(null)
    finishFade(() => {
      setAudienceId(null)
      setPhase("pick")
      setIndex(0)
      resetRound("")
    })
  }

  return (
    <div className="page">
      <Header exe={audience?.exe ?? HOME.exe} tagline={audience?.tagline ?? HOME.tagline} />
      <main>
        <div className="column">
          <div className={`swap ${visible ? "is-in" : "is-out"}`}>
            {phase === "pick" ? (
              <AudienceSelect onSelect={handleSelect} />
            ) : phase === "quiz" && question ? (
              <QuestionStage
                key={question.id}
                question={question}
                index={index}
                total={audience.questions.length}
                attempts={attempts}
                message={message}
                onAttempt={handleAttempt}
                onPreferred={handlePreferred}
              />
            ) : (
              <EndingScreen ending={audience.ending} onRestart={handleRestart} onSwitch={handleSwitch} />
            )}
          </div>
          <InvestmentFooter />
        </div>
      </main>
    </div>
  )
}
