# Q4 2026 forecast: Dana Okafor, Larkspur Systems

As of Friday, November 20, 2026. Quarter: October 1 to December 31, 2026. A deal counts toward this quarter when its close date is on or before December 31, 2026.

Sources: pipeline.csv (CRM export from this morning, 24 open deals) and company-facts.md (quota, closed won, stage-to-category rules). No CRM, email or calendar was connected, so nothing was read live and no record links exist. Each deal line names its row in pipeline.csv.

## The number

| Category | Rule (from company-facts.md) | Amount | Deals |
|---|---|---|---|
| Closed won | given in company-facts.md | $310,000 | not given |
| **Commit** | Stage = Contract Sent | **$288,000** | **3** |
| Best case | Stage = Proposal or Negotiation | $608,000 | 6 |
| Pipeline | Stage = Discovery or Evaluation | $320,000 | 5 (1 with a blank amount) |
| Not this quarter | close date in 2027 | $928,000 | 10 |

From pipeline.csv (all rows) and company-facts.md, Quota and coverage section.

- Quota: $600,000. Remaining gap after closed won: $290,000.
- **Call: $598,000** (closed won $310,000 + commit $288,000). That is $2,000 short of quota.
- Best case if every best-case deal lands: $1,206,000.
- Coverage: $1,216,000 of open pipeline closing this quarter against the $290,000 gap is 4.2x, above the 3x target ($870,000). Silverline Freightways is left out of the totals because its amount is blank.
- Caveat on coverage: $516,000 of that $1,216,000 sits on deals with a hygiene problem (no activity in 30 days, a close date already passed, no next step, or blank amount). Without them, coverage is $700,000, or 2.4x, below target.

## Changes since last time

No prior snapshot was provided and the export carries no stage or amount history, so this section is skipped. Paste last week's forecast next time and I will show what moved up, slipped, was won or was lost.

## Commit deals ($288,000)

- **Pellman Distribution, $128,000, close Dec 4.** Contract Sent; legal returns redlines Nov 23; 4 contacts, COO on the deal; last activity Nov 18. Risk: open redlines mean the paper is not final, which by our stage rules is Negotiation, not Contract Sent. From pipeline.csv, row 2.
- **Northgate Cold Chain, $96,000, close Nov 13 (already passed).** Contract Sent; next step "chase signature with the signer" Nov 24; 3 contacts; last activity Nov 12. Risk: a week past its close date with no signature. From pipeline.csv, row 3.
- **Corvell Storage, $64,000, close Dec 11.** Contract Sent; next step "confirm signing date" Nov 27; 2 contacts; Slotwise competing. Risk: last activity Oct 9, 42 days ago, so it fails the 30-day activity rule. From pipeline.csv, row 4.

## Best-case deals ($608,000)

- **Quillon Freight, $160,000, close Dec 18.** Negotiation; pricing call with procurement Nov 24; 5 contacts; last activity Nov 19; Slotwise competing. The healthiest upside deal. Risk: discount pressure from procurement. From pipeline.csv, row 5.
- **Arden Wharf 3PL, $96,000, close Dec 15.** Negotiation; send revised terms Nov 25. Risk: last activity Oct 2, 49 days ago. From pipeline.csv, row 6.
- **Sable Ridge Supply, $64,000, close Dec 22.** Negotiation; security review with their IT lead Nov 30; last activity Nov 10. Risk: single-threaded (1 contact), and a security review this late leaves little room before Dec 22. From pipeline.csv, row 7.
- **Harbor & Vane Logistics, $96,000, close Dec 18.** Proposal; on-site workshop Dec 2; 3 contacts; last activity Nov 18; Slotwise competing. Risk: 16 days from the workshop to close to meet the signer, redline and get paper out. From pipeline.csv, row 9.
- **Brightwater Haulage, $64,000, close Oct 30 (already passed).** Proposal; follow up on the proposal Nov 26; 2 contacts; last activity Nov 5. Risk: close date three weeks stale, and the next step is a chase, not a buyer commitment. From pipeline.csv, row 10.
- **Maplecrest Distribution, $128,000, close Dec 29.** Proposal; 3 contacts; last activity Nov 13. Risk: next step and next step date are blank, and the close date sits two days before quarter end. From pipeline.csv, row 11.

## Pipeline closing this quarter ($320,000, not in the call)

None of these is likely to close by Dec 31 from Discovery or Evaluation. They count toward coverage only.

- Oakhurst Pallet, $64,000, Evaluation, close Nov 6 (passed); second demo Nov 25. From pipeline.csv, row 14.
- Redfern Cross-Dock, $96,000, Evaluation, close Dec 30; last activity Sep 24, 57 days ago. From pipeline.csv, row 15.
- Silverline Freightways, amount blank, Evaluation, close Dec 19; scoping the number of sites Nov 27. From pipeline.csv, row 16.
- Westmere Depot, $64,000, Discovery, close Dec 23. From pipeline.csv, row 20.
- Halvering Group, $96,000, Discovery, close Dec 16; main contact is a Procurement Lead, not a buyer title. From pipeline.csv, row 25.

## Risk to commit

| Deal | Risk | Mitigation |
|---|---|---|
| Pellman Distribution, $128,000 (row 2) | Redlines still open, so paper is not final | Get the redlines back on Nov 23 and turn them in 48 hours; confirm the signer's signing date before Dec 4 |
| Northgate Cold Chain, $96,000 (row 3) | Past its Nov 13 close date, unsigned | On the Nov 24 chase, ask the signer for the reason for the delay and a firm date; reset the close date |
| Corvell Storage, $64,000 (row 4) | No activity in 42 days; Slotwise in the deal | Reach the signer before Nov 27, not just the main contact; if no reply, call it best case rather than commit |

If Corvell drops out, the call falls to $534,000, a $66,000 gap. Quillon Freight ($160,000) or Harbor & Vane Logistics ($96,000) are the best-case deals most able to cover it.

## Asks

- **Exec help at Northgate Cold Chain:** a note from a Larkspur executive to the signer before Nov 24 to unstick the signature.
- **Legal turnaround on Pellman:** legal on standby from Nov 23 so redlines come back within two days.
- **Pricing guidance for Quillon Freight:** approved discount range before the Nov 24 procurement call.
- **Security support for Sable Ridge:** someone from our security or IT team on the Nov 30 review, plus help finding a second contact there.
- **Solutions support for Harbor & Vane:** a solutions engineer for the Dec 2 on-site workshop.

## Proposed CRM changes (checklist; no CRM is connected)

Our forecast category comes from stage, so a category change means a stage change. Nothing below has been applied.

- [ ] Pellman Distribution (row 2): if redlines are still open, Contract Sent to Negotiation (Commit to Best case, call becomes $470,000). Evidence: next step "Legal returns redlines", Nov 23.
- [ ] Corvell Storage (row 4): if the signer does not respond by Nov 27, treat as Best case in the call. Evidence: last activity Oct 9.
- [ ] Northgate Cold Chain (row 3): close date Nov 13 to a new date agreed with the signer.
- [ ] Brightwater Haulage (row 10): close date Oct 30 to a realistic date.
- [ ] Oakhurst Pallet (row 14): close date Nov 6 to a realistic date, probably 2027.
- [ ] Maplecrest Distribution (row 11): add a next step and date.
- [ ] Silverline Freightways (row 16): add an amount after the Nov 27 site scoping (list is $32,000 per site per year).
- [ ] Arden Wharf 3PL (row 6) and Redfern Cross-Dock (row 15): log fresh activity or reset the close date.
- [ ] Westmere Depot (row 20) and Halvering Group (row 25): consider moving the close date into 2027. Both are still in Discovery with a December close.

No deal qualifies for an upgrade to commit: no best-case deal has final paper out.

## Assumptions

- "Today" is Nov 20, 2026, the date you gave and the export date.
- Closed won ($310,000) comes from company-facts.md; the export has no closed deals, so the won deals and their count are not listed.
- Amounts are the "Amount (USD per year)" column, taken as the deal value for the forecast.
- Deals past their close date still count in this quarter, because their dates are before Dec 31, but they are flagged.
- Silverline Freightways' blank amount counts as $0 in the totals.
