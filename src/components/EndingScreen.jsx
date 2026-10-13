export default function EndingScreen({ ending, onRestart, onSwitch }) {
  return (
    <section className="ending" aria-labelledby="ending-title">
      <p className="badge">PROCESS EXITED</p>
      <span className="check" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path
            d="M6.2 12.4 10 16.2 17.8 7.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h1 id="ending-title">Fine. You win.</h1>
      <p className="subtitle ending-sub">{ending.subtitle}</p>
      <ul className="log">
        {ending.log.map((line) => (
          <li key={line}>
            <span aria-hidden="true">&gt;</span>
            {line}
          </li>
        ))}
      </ul>
      <button type="button" className="btn btn-ghost restart" onClick={onRestart}>
        Restart this unnecessary process
      </button>
      <button type="button" className="switch" onClick={onSwitch}>
        Try this on someone else
      </button>
      <div className="closer">
        {ending.closer.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  )
}
