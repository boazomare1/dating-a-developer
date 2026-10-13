import { AUDIENCES } from "./data.js"

const IDS = new Set(AUDIENCES.map((audience) => audience.id))

export function whoFromLocation() {
  const who = new URLSearchParams(window.location.search).get("who")
  return IDS.has(who) ? who : null
}

export function setWhoParam(id) {
  const url = new URL(window.location.href)
  if (id) url.searchParams.set("who", id)
  else url.searchParams.delete("who")
  window.history.replaceState(null, "", url)
}

export function audienceUrl(id) {
  const url = new URL(window.location.href)
  url.searchParams.set("who", id)
  url.hash = ""
  return url.toString()
}
