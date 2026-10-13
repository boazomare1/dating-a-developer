export const SPOILER = "Spoiler: only one of these options is actually clickable."

const datingQuestions = [
  {
    id: "dating-1",
    question: "Do you think I care?",
    subtitle: "You can be honest. I'm not keeping score.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "dating-2",
    question: "Do you think I miss you?",
    subtitle: "The Wi-Fi has been stable, so that's something.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "dating-3",
    question: "Would you say I'm emotionally available?",
    subtitle: "My phone is available. That's a different department.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "dating-4",
    question: "Do you think you changed me?",
    subtitle: "I updated a few dependencies. Nothing major.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "dating-5",
    question: "Would you say I'm afraid of losing you?",
    subtitle: "I lose my keys twice a week. I manage.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "dating-6",
    question: "Do you think I get jealous?",
    subtitle: "I'm not a monitoring service.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "dating-7",
    question: "Do you think I overthink our relationship?",
    subtitle: "I have production bugs to worry about.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "dating-8",
    question: "So you really think I don't care?",
    subtitle: "We've been over this. Please refer to question one.",
    preferred: "Yes",
    escaping: "No",
  },
  {
    id: "dating-9",
    question: "Are you finally ready to accept the answer?",
    subtitle: "This interaction has exceeded its estimated completion time.",
    preferred: "Yes",
    escaping: "No",
  },
  {
    id: "dating-10",
    question: "One last thing. Are we done here?",
    subtitle: "I have contributed enough to this conversation.",
    preferred: "Yes",
    escaping: "No",
  },
]

const clientQuestions = [
  {
    id: "client-1",
    question: "Can this go in the current sprint?",
    subtitle: "The sprint is full. Your idea can wait with the others.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "client-2",
    question: "Would you call this a small change?",
    subtitle: "It touches three services and someone's feelings.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "client-3",
    question: "Can you give me a quick estimate?",
    subtitle: "I can give you a number. Accuracy costs extra.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "client-4",
    question: "Will it be ready by Friday?",
    subtitle: "Friday is a day on the calendar. Not a strategy.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "client-5",
    question: "Do you have time for a quick call?",
    subtitle: "The last quick call had a sequel and a follow-up doc.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "client-6",
    question: "Can we make the logo bigger?",
    subtitle: "I considered it. The logo survived the review.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "client-7",
    question: "While you're in there, can you also check this?",
    subtitle: "That is a different ticket wearing a friendly voice.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "client-8",
    question: "So the requirements did change?",
    subtitle: "We've been over this. Please refer to the original brief.",
    preferred: "Yes",
    escaping: "No",
  },
  {
    id: "client-9",
    question: "Are you ready to accept the timeline?",
    subtitle: "This request has exceeded its estimated patience.",
    preferred: "Yes",
    escaping: "No",
  },
  {
    id: "client-10",
    question: "Are we done adding things?",
    subtitle: "I have contributed enough to this scope.",
    preferred: "Yes",
    escaping: "No",
  },
]

const qaQuestions = [
  {
    id: "qa-1",
    question: "Is this a bug?",
    subtitle: "It matches the ticket. The ticket is the surprising part.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "qa-2",
    question: "Should this be critical?",
    subtitle: "Critical is for outages. This is a strong opinion about padding.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "qa-3",
    question: "Did the last commit break it?",
    subtitle: "The last commit renamed a variable. The bug has tenure.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "qa-4",
    question: "Can you reproduce it?",
    subtitle: "I reproduced my confidence. The bug did not attend.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "qa-5",
    question: "Will you fix it before release?",
    subtitle: "The release notes have room for character development.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "qa-6",
    question: "Do you want another screenshot?",
    subtitle: "I want steps. The novel can stay in your drafts.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "qa-7",
    question: "Should this fail the build?",
    subtitle: "The build is fine. The comment thread is the outage.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "qa-8",
    question: "So you're calling it working as intended?",
    subtitle: "We've been over this. Please refer to the original ticket.",
    preferred: "Yes",
    escaping: "No",
  },
  {
    id: "qa-9",
    question: "Are you ready to close it?",
    subtitle: "This bug has exceeded its estimated emotional budget.",
    preferred: "Yes",
    escaping: "No",
  },
  {
    id: "qa-10",
    question: "Are we done here?",
    subtitle: "I have commented enough on this thread.",
    preferred: "Yes",
    escaping: "No",
  },
]

const devQuestions = [
  {
    id: "dev-1",
    question: "Do we need a meeting for this?",
    subtitle: "We have Slack. Unfortunately, it sends notifications.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "dev-2",
    question: "Should we rewrite it?",
    subtitle: "It is ugly and it ships. Those can both be true.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "dev-3",
    question: "Can you review this today?",
    subtitle: "I opened the diff. I chose peace.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "dev-4",
    question: "Is this blocking you?",
    subtitle: "You are blocked on a variable name. That is optional suffering.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "dev-5",
    question: "Should we add another abstraction?",
    subtitle: "We have enough layers. The cake is already dry.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "dev-6",
    question: "Can you pair for a minute?",
    subtitle: "A minute is how afternoons disappear.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "dev-7",
    question: "Did you read the PR description?",
    subtitle: "Be honest. I wrote it for the people who don't.",
    preferred: "No",
    escaping: "Yes",
  },
  {
    id: "dev-8",
    question: "So you agree this can wait?",
    subtitle: "We've been over this. Please refer to the backlog.",
    preferred: "Yes",
    escaping: "No",
  },
  {
    id: "dev-9",
    question: "Are you ready to approve it?",
    subtitle: "This review has exceeded its estimated completion time.",
    preferred: "Yes",
    escaping: "No",
  },
  {
    id: "dev-10",
    question: "Are we done here?",
    subtitle: "I have contributed enough comments.",
    preferred: "Yes",
    escaping: "No",
  },
]

export const AUDIENCES = [
  {
    id: "dating",
    label: "Someone I'm seeing",
    hint: "Feelings, reviewed like a pull request.",
    exe: "dating-a-dev.exe",
    tagline: "Because feelings are just another feature request:",
    questions: datingQuestions,
    messages: [],
    ending: {
      subtitle: "I still don't care, but at least you're happy.",
      log: [
        "Decision recorded.",
        "Emotional consequences: none anticipated.",
        "Follow-up meeting: not required.",
      ],
      closer: [
        "Some questions don't deserve an answer.",
        "Now go do something productive. Or don't. I'm not your manager.",
      ],
    },
  },
  {
    id: "client",
    label: "A client",
    hint: "Scope, Fridays, and the phrase \"quick call.\"",
    exe: "client-call.exe",
    tagline: "Because the sprint is not a suggestion box:",
    questions: clientQuestions,
    messages: [
      { text: "The sprint is not a suggestion box.", tier: "early" },
      { text: "Friday has not become more available.", tier: "early" },
      { text: "Put it in the ticket. Then I can ignore it formally.", tier: "mid" },
      { text: "Quick call is how last Tuesday died.", tier: "mid" },
      { text: "I can do it fast, cheap, or well. You spent well.", tier: "late" },
      { text: "This change request has been received and quietly queued.", tier: "late" },
    ],
    ending: {
      subtitle: "I still need it in a ticket, but at least you're happy.",
      log: [
        "Request recorded.",
        "Scope consequences: a later sprint.",
        "Follow-up call: not required.",
      ],
      closer: [
        "Some ideas don't deserve a Friday.",
        "Now go write the requirements. Or don't. I'm not your project manager.",
      ],
    },
  },
  {
    id: "qa",
    label: "QA",
    hint: "Severity, screenshots, and your confidence.",
    exe: "qa-ticket.exe",
    tagline: "Because \"works on my machine\" is a complete sentence:",
    questions: qaQuestions,
    messages: [
      { text: "Works on my machine. The machine is not taking questions.", tier: "early" },
      { text: "Severity noted. Ranked under lunch.", tier: "early" },
      { text: "I need steps, not a short story.", tier: "mid" },
      { text: "Can't reproduce. Can acknowledge. Different backlog.", tier: "mid" },
      { text: "The build is green. Your feelings are a separate pipeline.", tier: "late" },
      { text: "I've closed tickets with less evidence. This isn't one of them.", tier: "late" },
    ],
    ending: {
      subtitle: "I still think it works as designed, but at least you're happy.",
      log: [
        "Verdict recorded.",
        "Severity: noted, then parked.",
        "Regression meeting: not required.",
      ],
      closer: [
        "Some findings don't deserve a hotfix.",
        "Now go file the steps. Or don't. I'm not your test plan.",
      ],
    },
  },
  {
    id: "dev",
    label: "Another developer",
    hint: "Meetings, rewrites, and the PR description.",
    exe: "pr-review.exe",
    tagline: "Because the backlog is not a group chat:",
    questions: devQuestions,
    messages: [
      { text: "We don't need a meeting. We need fewer opinions.", tier: "early" },
      { text: "The rewrite can stay in the idea column.", tier: "early" },
      { text: "I left one comment. It was a nit, and I regret nothing.", tier: "mid" },
      { text: "Your branch is not a personality.", tier: "mid" },
      { text: "Approve it or don't. The diff will not beg.", tier: "late" },
      { text: "This could have been a comment. It was. You replied anyway.", tier: "late" },
    ],
    ending: {
      subtitle: "I still won't join the rewrite, but at least you're happy.",
      log: [
        "Opinion recorded.",
        "Architectural consequences: none scheduled.",
        "Sync meeting: not required.",
      ],
      closer: [
        "Some refactors don't deserve a calendar invite.",
        "Now go approve the PR. Or don't. I'm not your tech lead.",
      ],
    },
  },
]

const MESSAGES = [
  { text: "Still trying?", tier: "early" },
  { text: "Interesting strategy.", tier: "early" },
  { text: "Take your time. I have no expectations.", tier: "early" },
  { text: "You can keep trying. I have no meetings.", tier: "early" },
  { text: "I'm not stopping you. The button is.", tier: "early" },
  { text: "You seem committed to being wrong.", tier: "mid" },
  { text: "Respect the persistence.", tier: "mid" },
  { text: "That button has boundaries.", tier: "mid" },
  { text: "The answer hasn't changed. Your strategy has.", tier: "mid" },
  { text: "This is taking longer than expected. Not that I'm timing it.", tier: "mid" },
  { text: "Please stop trying to negotiate with the interface.", tier: "mid" },
  { text: "Your request has been received and quietly ignored.", tier: "mid" },
  { text: "This is becoming a personal project.", tier: "late" },
  { text: "Your persistence has been acknowledged. Nothing else has.", tier: "late" },
  { text: "At this point, the button understands the assignment.", tier: "late" },
  { text: "I'm emotionally unavailable, not technically unavailable.", tier: "late" },
  { text: "This interaction could have been an email.", tier: "late" },
  { text: "I've seen fewer retries in production.", tier: "late" },
]

export function nextMessage(attempts, recent, extra = []) {
  const tier = attempts < 3 ? "early" : attempts < 8 ? "mid" : "late"
  const pool = [...MESSAGES, ...extra].filter((item) => item.tier === tier)
  const fresh = pool.filter((item) => !recent.includes(item.text))
  const choices = fresh.length > 0 ? fresh : pool
  const index = Math.floor(Math.random() * choices.length)
  return choices[index].text
}
