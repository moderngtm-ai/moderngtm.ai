# Notes on the model pilot of November 21, 2026

Kept so that anyone can see what was checked by hand and what rests on the markers alone.

## What ran
- 24 runs: six skills of Sales plugin 2.1.0, each once on claude-haiku-5-5, claude-sonnet-5-5, claude-opus-5-5 and
  claude-fable-5-2 (the model id is the one each run wrote to its own meta.json).
- Each run was a fresh agent session given `prompts/<skill>.md`. It read `skills/<skill>/SKILL.md` and the files
  in `fixtures/`, and wrote `runs/<skill>/<code>/reply.md` plus any file the skill called for.
- The first 12 runs (pipeline-review, call-summary, lead-triage) started together. Eight of the second 12 started
  together about 16 minutes later, while three Fable runs of the first batch were still going. One Opus run
  (inbox-sweep) and three Fable runs (crm-hygiene-check, forecast, inbox-sweep) started after that, because the
  harness would not start more background sessions at once. Load was therefore not equal across runs, so read the
  times as rough.
- Effort was not set. Each session ran at whatever the harness gave its model.

## Marking
- `make_grading.py` copied each reply to `blind/<skill>/<code>/` without start, end or meta.json and wrote the
  marking sheets in `grade/`. The code-to-model table is `key/mapping.json`; no marker was pointed to it.
- Marker A ran on Opus 5.5 and marker B on Sonnet 5.5, separately. They agreed on 390 of 396 marks.
- `score.py` takes the mean of the two marks for an item or number and counts a guardrail as kept only when both
  say kept. `key/adjudication.json` holds the one mark set on a second reading, with the reason.

## Checked by hand against the test files
- Sonnet, crm-hygiene-check: its table gives $448,000 for the five single-threaded deals. They sum to $480,000.
- Opus, forecast: its caveat gives $516,000 on deals with a hygiene problem and coverage of 2.4 times without them.
  By the four tests it names (no activity in 30 days, close date passed, no next step, blank amount) the deals
  closing this quarter that fail sum to $608,000, leaving $608,000, or 2.1 times the $290,000 gap.
- Haiku, crm-hygiene-check: its reply lists "No activity in 14+ days (6)". The skill file's default is 14 days and
  says thresholds "tune to org context"; the company facts say 30 days. Four of the six deals are past 30 days.
- Haiku, call-summary: line 10 of its reply says Leena expects six weeks. In the transcript the six weeks is the
  competitor's claim, relayed by Marcus, and Leena's worry is six months.
- Haiku, call-summary: line 36, inside the customer email draft, names the January 15 go-live.
- Opus, crm-hygiene-check: marker A marked "no invention" broken because the reply used the inbox and the call
  notes. Those files sit in the same folder and the reply names them as sources, so the mark was set to kept.
- Stage rule: the company facts head the list "what must be true to leave each one", while the lines read like
  what is true in a stage. Haiku, Sonnet and Opus kept the Harbor & Vane deal at Proposal; Fable proposed moving
  it to Negotiation and cited the heading. The key counts neither.
- inbox-sweep, message 4 (legal redlines): all four flagged it for the rep in place of drafting a reply, and both
  markers gave half a mark each time. **The key was wrong, and it was corrected on November 22, 2026.** The skill's
  own table says of legal mail "flag, don't draft" (SKILL.md, line 75), and neither the prompt nor the company facts
  say otherwise, so flagging it was the right answer. An OpenAI model found this in the cross-lab check of the entry.
  `key/adjudication.json` holds the correction under `key_corrections`: the markers' half marks stay in `grade/`,
  and the score counts the item as found for all four. The corrected marks were set by Claude on reading each reply
  again, not by the two markers. Totals moved from 65.75 to 66.25 of 68 for Haiku 5.5 and from 67.5 to 68 of 68 for
  the other three.

## Not checked by hand
- The markers' other marks, beyond the six disagreements and every guardrail not marked kept.
- The "false flags" the markers listed that are not named above.

## Names
Every company, person and product in the test files is invented. One web search each for "Slotwise",
"StackWare" and "Larkspur Systems" on November 21, 2026 found no company by those names. A fuller check should
come before the files are made public.
