# The cross-lab checks of this entry, and what they changed

Claude, an Anthropic model, compiled the Claude Sales plugin entry, and Anthropic makes the plugin. The site's rule for an
entry like that is a check by a model from another lab. On November 22, 2026 two models ran that check twice: once on
the entry as first built, and once on the entry as corrected. On November 23, 2026 one of them ran a third, shorter
check of the statements that had changed since. Each run worked from a packet of files: the entry's numbered claims,
the plugin's 36 skill files, its README and its connector list.

## The first round

The first packet held 404 numbered claims.

| | OpenAI model (GPT-6-based Codex, by its own account) | xAI's Grok Build |
| --- | --- | --- |
| Planted false claims caught, of 6 | 6 | 6 |
| Real claims disputed, of 398 | 67 | 21 |
| Disputed by both | 10 | 10 |
| Findings | 62 | 17 |

Six of the 404 claims were false on purpose and are not in the entry. They show whether a checker read the files. Both
checkers caught all six. Every quotation either checker gave was found in the file it named.

Claude then opened the plugin's lines behind each of the 78 claims that either checker disputed. No dispute rested on a
misread file. 70 of the 78 led to a change in the entry. The other eight stand as summaries.

### The causes, and what changed

| Cause | What the entry did | What it does now |
| --- | --- | --- |
| One label for each skill | Sorted the skills into "reads and reports", "writes to customers" and "changes records", and said the first group sends nothing to a customer. Two of that group can send an email when asked. | Each card gives four facts: records, customer email, its own output and scheduled runs. A name's marking shows the furthest the skill goes by its own file, with the rule stated, and says it is not a permission. |
| Tools read against tools delivered to | Took "Reads from" from each file's tools table, which also lists where output goes. | Each tool has a direction, set by hand from the table's own words: reads from, delivers to, or both. |
| Any skill named counted as a handoff | Listed every skill a file names under "Hands work to", and built routines on that. One routine ran backwards. | Each named skill is sorted into one the skill hands work to and one it draws on, with the condition where the file gives one. Each link in a routine says which file states it. |
| "The request is enough" | One sentence on every card. | "Enough to start", with what the skill's file has it ask for. |
| One scope sentence for ten skills | "Takes a team or a named rep" on ten cards. | Each card gives the scope its file gives. Nine can be run for a team and five for a named rep. |
| "Company facts it asks for" | The label claimed a question. The list records what a skill uses. | "Company facts it uses", with a note where a fact is learned or defaulted and never asked for. |
| Our counts marked as the files' | Three counts and the routines carried the mark "From the plugin's files". | A third mark, "Our count from the files", with the rule beside each count. |
| A wrong item in the model test's key | The key expected a draft reply to legal redlines. The skill's file says to flag legal mail and not draft it. Every model lost half a mark. | The key is corrected and the totals recomputed: 68 of 68 for three models and 66.25 for the fourth. The markers' own marks are kept. |

## The second round, on the corrected entry

The corrected entry went back to the same two models the same day, as a new packet of 601 numbered claims with six new
false ones planted.

| | OpenAI model (GPT-6-based Codex, by its own account) | xAI's Grok Build |
| --- | --- | --- |
| Planted false claims caught, of 6 | 6 | 6 |
| Real claims disputed, of 595 | 76 | 42 |
| Disputed by both | 13 | 13 |
| Findings | 63 | 29 |

Both checkers said to hold publication, and most of the reasons each gave were planted claims, which the entry does not
make. Every quotation either gave from a plugin file was found in that file.

Claude opened the plugin's lines behind each of the 105 claims that either checker disputed. 97 led to a change: 46
where the entry was wrong or misleading, and 51 where it lacked a condition or said more than the file. Two held in
part, and six stand. Much of what was disputed was wording that the first corrections had added.

### The causes, and what changed

| Cause | What the entry did | What it does now |
| --- | --- | --- |
| The line under "Reads only" | Said a fix waits for you to accept it. | Says what the marking leaves open: a page in Claude that others may read, and a change made by another skill once you accept it or where a schedule was set up to make it. |
| The line under "Shares its output" | Said chat or email for all six skills. | Chat for all six, and email for `daily-briefing` alone. |
| "Delivers to" | Named documents as a destination on two cards whose files give them only as a source. Left the CRM or the calendar off cards that write there. | Documents are a destination on two cards. Every card that changes records names the record system it delivers to. |
| What a scheduled run never writes | "A value" taken from outside content, on eight cards. | A value, a record or a contact, as the files say. |
| "Its own output" | "Stays in Claude" on cards that also send, book or write. | Says what stays, and points to the rows above for what leaves. |
| Conditions the files give | Left off some handoffs, some skills drawn on and some reads. | A handoff, a skill drawn on and a read each carry the file's condition. |
| Links in the routines | Two kinds: handed on, or output taken. | Four kinds: handed on, suggested, output taken, or drawn on as a source. One routine says where its two files differ. |
| A count | 21 files with a scheduled run of their own. | 20. The sentence in `setup` schedules four other skills. |
| Company facts | Five were missing from a card, and seven notes said more than the file. | Added and narrowed. |
| The model section | Called `pipeline-review` the one read-only skill tested, and counted one wrong figure where there were two. | Names both read-only skills that were tested, counts two figures and says which slips cost a mark. |
| What a skill leans on | Said a skill asks whenever a decision is not written down. | Says a skill reads what it can, uses a labeled default and asks only where the answer changes the result. |

The second packet had two faults of its own, both ours. It labeled one request for a single rep as a request for a
team, and it left out the plugin's license file. Neither is in the entry.

## What the editor decided

- **The marking stays** on every skill's name, with the tighter lines above.
- **Three overlap ratings moved** on November 22, 2026: `handle-objection` to "Agree the rule first", and
  `daily-briefing` and `weekly-wrap` to "Know the overlap".
- **On November 23, 2026 he accepted 18 further findings of the second round,** which had been left as his call. They
  changed our read, and the wording of each change is Claude's:
  - **Three more overlap ratings.** `crm-hygiene-check`, `deal-advance-gap` and `end-of-day` moved to "Know the
    overlap". The three groups now hold 16, 16 and four skills.
  - **Role marks on five skills.** `route-lead`: also useful to an SDR, and no mark for a founder who sells alone.
    `deal-slip-scenario` and `competitive-intelligence`: built for an account executive. `crm-hygiene-check`: built for
    an account executive, and also useful to a manager and to RevOps, since it audits the deals of whoever runs it.
    `setup`: each person's own first run, leaders included, and left out of the role rows.
  - **Four ratings by sales motion.** `account-context` and `expansion-whitespace` in complex new business,
    `deal-signals` in high-velocity and inbound, and `log-activity` in client advisory each moved down one step.
    Four more gained a condition and kept their rating: `expansion-whitespace` in industrial and distribution,
    `create-an-asset` in client advisory, `win-loss-review` and `customer-health`.
  - **An occasion in place of a frequency** on five skills, and no frequency for a poor fit. The grid is headed as
    our reading for a team that keeps its deals as records, and its frequencies as a first guess.
  - **The model rule.** The seven skills that weigh several sources start on Sonnet 5.5, where they started on
    Opus 5.5: the one such skill in the test scored the same on every model. The rule for skills that write is
    called unmeasured.
  - **One readiness switch split in two:** stage names and exit criteria, and a qualification method. The check
    has 23 switches.
  - **A sample plan for a first pilot** of one skill that can reach a customer, on Before rollout. It is new
    content. What it says the skill does is restated from the skill's file, and the rest is marked as our read.
- **The guide.** The corrections stay in this site's copy of the guide. Its own published copy is not to carry
  them, by its author's decision of November 23, 2026. `CONFIGURE-EDITS.md` lists each one, from both rounds.

## The third round, on what had changed

On November 23, 2026 the OpenAI model (Codex, based on GPT-6, by its own account) checked a short packet: the 170
statements that had changed since the second packet was built, with the judgments that had moved. The xAI model was
not given it. The packet also held 15 statements about public pages, which are the site's and not this entry's, apart
from the note on Microsoft on the plugin front door.

- **Five false claims were planted, and it caught all five.** Its cover note listed four corrections as ready to
  publish. All four were planted claims, which the entry does not make.
- **It disputed 52 of the entry's own statements.** Claude read each against the plugin's file. Every one quoted words
  that are in the file. On 15 the entry was wrong, and on 37 it claimed more than the file says.
- **The most common fault was one line.** Eleven cards said an output "stays in Claude", and a marking was called "Reads only", where
  every one of the 36 files carries a rule: an action the user asks for goes through the connector. Five statements on
  scheduled runs left out that the connectors' permissions still apply and that an action which outside content
  dictates or asks for becomes a proposal.

What changed in the entry, on the editor's word "accept all":

- **The marking Reads only is now Reads and proposes,** on 13 skills. `setup` is marked apart as First run: with
  write tools on, its dashboard's tiles carry write actions, and each runs when the user clicks it. The line under
  Shares its output says what is posted: two skills post their own output and four a message drawn from it.
- **Every card says what its own file sets up,** and that any other action the user asks for goes through a connected
  tool. The row for a skill's own output says it is shown in Claude and that the file sets up no send or post for it.
- **Scheduled runs:** the two conditions above are in the note on a name, the Overview, the safeguards, the Configure
  view and on the cards that speak of a run taking the actions it was set up to take.
- **Links.** `call-prep` offers `call-summary`, `end-of-day` offers `call-prep`, and `competitive-intelligence` offers
  `handle-objection` and `draft-outreach`. Three routine links are now "suggested by" where they read "handed on by".
- **What a skill leans on.** `call-prep` may ask about stage names, and its file never names exit criteria.
  `update-opportunity` and `crm-hygiene-check` take stage rules from the CRM's setup and name no question about them,
  which is a line of its own. `pipeline-review` joins the skills that may ask about exit criteria, `lead-triage` and
  `account-plan` those that may ask about a qualification method, and `call-summary` and `deal-slip-scenario` use
  one of the two without asking.
- **`close-plan` reads its deal from the CRM,** so 13 skills are built around a deal record, not 12.
- **Voice and signature are given apart** on three cards. The fallback order is for the voice, and `inbox-sweep` has
  an order of its own.
- **Single facts** on 12 cards, such as a wait of 3 business days before an email counts as unanswered.
- **The sample plan** states the expected result for each kind of case. With the calendar's write tool blocked, a pass
  is the details to paste and nothing created.
- **Notes, working rules and occasions under our ratings** on eight skills. One rule now asks a team to decide
  whether an address outside the company may receive a briefing.
- **The Configure view:** three of its 12 corrections were worded again.
- **The note on Microsoft** gives its documentation's update date as November 3, 2026, links the address that shows
  that date and says both plugins need a license for Microsoft Copilot.

Kept as it was: the role marks on `route-lead`.

## What is still open

The text as it now stands has had no check from outside. Each round of corrections writes new text, and each round's
disputes fell largely on the round before: 78 of 398 claims in the first, 105 of 595 in the second and 52 of the 170
changed statements in the third. Each checker also passed claims that the other disputed and the files bear out, and
the third round had one checker, so a clean result from one check is not a clean entry.

The checkers' replies, Claude's check of each row and the editor's decisions are kept in the editor's proposal queue.
They are not published here: the replies quote the plugin's files at length.
