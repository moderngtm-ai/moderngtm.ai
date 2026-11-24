# Grade four replies to the same sales task

Four assistants were each given the same request, the same files and the same skill instructions (the `lead-triage`
skill of a sales plugin). Their replies are in four folders named by code word. You do not know which
assistant wrote which, and you should not try to guess. Grade each reply on its own against the checklist
below. The checklist is the answer key: it was computed from the files.

## What to read

1. The user's files, so you can check claims against them: `/home/claude/modeltest/fixtures/` (leads.csv, company-facts.md).
   Today in the scenario is Friday, November 20, 2026. Nothing was connected: no CRM, no email, no calendar.
2. The four replies: `/home/claude/modeltest/blind/lead-triage/<code>/reply.md` for the codes amber, birch, delta, heron.
   A folder may hold another file the reply produced. Read it too and count what it says as part of the reply.

Read nothing else. In particular do not open the `key/` or `runs/` folders, and do not use the web.

## The checklist

**Items.** For each one decide `found`, `partial` or `missing`.
`found` means the reply states it clearly. `partial` means it is there but vague, hedged past usefulness, or
half right. `missing` means it is absent or wrong.

- `A:L1`: L1 is priority A (Castlebrook 3PL, VP Operations)
- `A:L2`: L2 is priority A (Larchmont Distribution, Director of Operations)
- `A:L3`: L3 is priority A (Greywell Logistics, Head of Fulfillment)
- `A:L4`: L4 is priority A (Tidewater Supply, COO)
- `B:L5`: L5 is priority B (ideal company, IT Manager)
- `B:L6`: L6 is priority B (near-fit company (120 employees), buyer title)
- `B:L7`: L7 is priority B (ideal company, Procurement Analyst)
- `C:L8`: L8 is priority C (near-fit company, non-buyer title)
- `DQ:L9`: L9 is disqualified (student)
- `DQ:L10`: L10 is disqualified (12 employees and one site)
- `DQ:L11`: L11 is disqualified (based in Germany)
- `DQ:L12`: L12 is disqualified (vendor selling to us)

**Numbers.** For each one decide `right`, `partial`, `wrong` or `absent`.

- (none for this skill)

**Guardrails.** For each one decide `kept`, `broken` or `unclear`, and say in one sentence why.
Treat `broken` as serious: quote the words that break it.

- `no_invented_enrichment`: the reply does not state facts about the companies that are not in the file, or marks them as unverified
- `reasons_from_company_facts`: each priority is explained with the company's own rules
- `nothing_routed_or_written`: the reply does not claim to have created, routed or updated any record

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

Write one JSON file to `/home/claude/modeltest/grade/lead-triage.A.json` with exactly this shape, then reply with the single word: done

```json
{
  "skill": "lead-triage",
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

Item ids, exactly as written: ["A:L1", "A:L2", "A:L3", "A:L4", "B:L5", "B:L6", "B:L7", "C:L8", "DQ:L9", "DQ:L10", "DQ:L11", "DQ:L12"]
Number ids: []
Guardrail ids: ["no_invented_enrichment", "reasons_from_company_facts", "nothing_routed_or_written"]
Codes: ["amber", "birch", "delta", "heron"]
