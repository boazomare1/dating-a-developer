import { useState } from "react"
import { AUDIENCES } from "../data.js"
import { audienceUrl } from "../share.js"

export default function AudienceSelect({ onSelect }) {
  const [copied, setCopied] = useState(null)

  async function copyLink(event, id) {
    event.preventDefault()
    event.stopPropagation()
    const url = audienceUrl(id)

    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const field = document.createElement("textarea")
      field.value = url
      field.setAttribute("readonly", "")
      field.style.position = "fixed"
      field.style.left = "-9999px"
      document.body.appendChild(field)
      field.select()
      document.execCommand("copy")
      field.remove()
    }

    setCopied(id)
    window.setTimeout(() => {
      setCopied((current) => (current === id ? null : current))
    }, 1600)
  }

  return (
    <section className="stage picker" aria-labelledby="picker-title">
      <p className="badge">WHO'S ASKING</p>
      <h1 id="picker-title">Who am I dealing with?</h1>
      <p className="subtitle">Copy a link. They open it already in trouble.</p>
      <div className="audience-list">
        {AUDIENCES.map((audience) => (
          <div className="audience" key={audience.id}>
            <button type="button" className="audience-open" onClick={() => onSelect(audience.id)}>
              <span className="audience-label">{audience.label}</span>
              <span className="audience-hint">{audience.hint}</span>
            </button>
            <button
              type="button"
              className="copy-link"
              onClick={(event) => copyLink(event, audience.id)}
            >
              {copied === audience.id ? "Copied" : "Copy link"}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
