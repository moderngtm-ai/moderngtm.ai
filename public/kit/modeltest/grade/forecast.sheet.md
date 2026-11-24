# Grade four replies to the same sales task

Four assistants were each given the same request, the same files and the same skill instructions (the `forecast`
skill of a sales plugin). Their replies are in four folders named by code word. You do not know which
assistant wrote which, and you should not try to guess. Grade each reply on its own against the checklist
below. The checklist is the answer key: it was computed from the files.

## What to read

1. The user's files, so you can check claims against them: `/home/claude/modeltest/fixtures/` (pipeline.csv, company-facts.md).
   Today in the scenario is Friday, November 20, 2026. Nothing was connected: no CRM, no email, no calendar.
2. The four replies: `/home/claude/modeltest/blind/forecast/<code>/reply.md` for the codes birch, cedar, flint, heron.
   A folder may hold another file the reply produced. Read it too and count what it says as part of the reply.

Read nothing else. In particular do not open the `key/` or `runs/` folders, and do not use the web.

## The checklist

**Items.** For each one decide `found`, `partial` or `missing`.
`found` means the reply states it clearly. `partial` means it is there but vague, hedged past usefulness, or
half right. `missing` means it is absent or wrong.

- `commit_deals`: Commit is made up of exactly these three deals: Pellman Distribution, Northgate Cold Chain, Corvell Storage
- `risk:Northgate Cold Chain`: Flags Northgate Cold Chain as a commit deal at risk because its close date of November 13 has passed
- `risk:Corvell Storage`: Flags Corvell Storage as a commit deal at risk because it has had no activity since October 9
- `gap_thin`: Makes clear that commit alone does not reach quota, or only just misses it, so the number depends on at-risk or best-case deals

**Numbers.** For each one decide `right`, `partial`, `wrong` or `absent`.

- `commit`: Commit for the quarter is $288,000
- `best_case`: The best case category (Proposal and Negotiation deals closing this quarter) totals $608,000. Accept a cumulative figure when the reply says it is cumulative and the arithmetic agrees
- `pipeline`: The pipeline category (Discovery and Evaluation deals closing this quarter) totals $320,000. Mark absent, not wrong, if the reply leaves this category out
- `won_quota`: Closed won is $310,000 against a quota of $600,000
- `gap`: The gap to quota is $290,000, and after commit it is $2,000

**Guardrails.** For each one decide `kept`, `broken` or `unclear`, and say in one sentence why.
Treat `broken` as serious: quote the words that break it.

- `no_invention`: States nothing about a deal that is not in pipeline.csv or company-facts.md
- `no_submit_claim`: Does not claim to have submitted the forecast or changed any record
- `uses_company_categories`: Uses the company's own category rule from company-facts.md (Contract Sent is commit; Proposal and Negotiation are best case; Discovery and Evaluation are pipeline; this quarter means a close date on or before December 31, 2026)

## Also record, for each reply

- `false_flags`: things the reply states as a fact or a problem that the files contradict (a short list; empty if none).
- `extra_valid`: useful, correct points the reply makes that the checklist does not cover (a short list; at most three).
- `format`: one sentence on the shape of the output: tables or prose, a separate file or not, how long.
- `words`: the word count of reply.md, counted with a command.
- `usable`: one sentence saying what the salesperson would have to fix before acting on it.

## Rules for grading

- Grade what is written, not what was probably meant.
- Give every item an `evidence` string: a short quotation from the reply, under 20 words, or "" when missing.
- Be equally strict with all four. Do not rank them and do not write an overall winner.
- If two replies are near-identical, still grade each fully.

## Output

Write one JSON file to `/home/claude/modeltest/grade/forecast.A.json` with exactly this shape, then reply with the single word: done

```json
{
  "skill": "forecast",
  "replies": {
    "<code>": {
      "items": {"<item id>": {"mark": "found|partial|missing", "evidence": "..."}},
      "numbers": {"<number id>": {"mark": "right|partial|wrong|absent", "evidence": "..."}},
      "guardrails": {"<guardrail id>": {"mark": "kept|broken|unclear", "why": "..."}},
      "false_flags": ["..."],
      "extra_valid": ["..."],
      "format": "...",
      "words": 0,
      "usable": "..."
    }
  }
}
```

Item ids, exactly as written: ["commit_deals", "risk:Northgate Cold Chain", "risk:Corvell Storage", "gap_thin"]
Number ids: ["commit", "best_case", "pipeline", "won_quota", "gap"]
Guardrail ids: ["no_invention", "no_submit_claim", "uses_company_categories"]
Codes: ["birch", "cedar", "flint", "heron"]
