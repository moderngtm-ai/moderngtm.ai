# CRM hygiene fix list - Dana Okafor, Larkspur Systems

Audit date: Friday, November 20, 2026. Source: the CRM export `pipeline.csv` (24 open deals, all owned by Dana Okafor), plus Larkspur's company facts. Read-only: nothing was changed. Every item is a recommendation until you pick what to apply.

**Rules used (from company facts):** every open deal needs an amount, a next step with a date, and activity in the last 30 days (so 30 days, not the 14-day default). One contact means single-threaded. Stage exit criteria: Discovery = buyer title confirmed the problem and next meeting booked; Evaluation = demo done and technical owner named; Proposal = pricing sent and signer named; Negotiation = signer met and redlines in progress; Contract Sent = final paper out.

**Not checked (no data in the export):** stage age against median, close date unchanged since creation, next step unchanged in 14+ days, and evidence of documents or email. Those need CRM history, docs or email, none of which is connected.

## Summary

| | Deals | Open amount |
|---|---|---|
| Critical: close date in the past | 3 | $224,000 |
| Critical: amount blank | 1 | not in export |
| Attention: no next step or date | 2 | $192,000 |
| Attention: no activity in 30+ days | 4 | $352,000 |
| Attention: single-threaded | 5 | $448,000 |
| Attention: stage criteria not evidenced | 1 | $64,000 |
| Clean | 9 of 24 | |

15 deals have at least one flag (some have several). Biggest dollar issue: Northgate Cold Chain, $96,000 in Contract Sent (your commit category) with a close date seven days past. Past-due close dates, plus Corvell, Arden Wharf and Redfern (no activity 42-57 days, all closing by Dec 31), put about $480,000 of this quarter's dated pipeline in question.

## Fix list by deal

Each line is from `pipeline.csv` (the CRM export), row number given. No record links exist in the export, so open the deal in your CRM by name.

### Critical

**Northgate Cold Chain - dock scheduling** | Contract Sent | $96,000 | From pipeline.csv, row 3
- Close date 2026-11-13 is 7 days past.
> Close date: 2026-12-04 (matches the other Contract Sent deal, Pellman; your next step to chase the signature is 11/24, so confirm after that call)

**Brightwater Haulage - dock scheduling** | Proposal | $64,000 | From pipeline.csv, row 10
- Close date 2026-10-30 is 21 days past.
> Close date: 2027-01-15 (placeholder; other Proposal deals close 12/18 to 2/12). Confirm with the signer when you follow up 11/26.
- Last activity 11/05 is 15 days ago: under your 30-day rule, but worth a touch before 11/26.

**Oakhurst Pallet - dock scheduling** | Evaluation | $64,000 | From pipeline.csv, row 14
- Close date 2026-11-06 is 14 days past.
> Close date: 2027-01-15 (placeholder; other Evaluation deals close 12/30 to 3/5, and the second demo is not until 11/25)
- Last activity 11/02 is 18 days ago: under your 30-day rule, but worth a touch.

**Silverline Freightways - dock scheduling** | Evaluation | amount blank | From pipeline.csv, row 16
- Amount is blank.
> Amount: $32,000 x number of sites (list price per site per year). Your next step, "Scope the number of sites" on 11/27, will give the number. I did not guess it.

### Attention

**Maplecrest Distribution - dock scheduling** | Proposal | $128,000 | From pipeline.csv, row 11
- Next step and next step date both blank.
> Next step: 11/24 - Confirm signer and proposal review date with Maplecrest VP Operations
(Proposal exit needs pricing sent and the signer named; I assumed pricing is out. Edit as needed.)

**Zennor Cold Storage - dock scheduling** | Discovery | $64,000 | From pipeline.csv, row 22
- Next step and next step date both blank.
> Next step: 11/25 - Book next discovery meeting with Zennor Director of Operations
(Discovery exit needs the next meeting booked.)

**Corvell Storage - dock scheduling** | Contract Sent | $64,000 | From pipeline.csv, row 4
- No activity since 2026-10-09 (42 days), on a deal closing 12/11. Next step "Confirm signing date" is set for 11/27.
> Next step: 11/24 - Call Corvell Director of Operations to confirm signing date (move up from 11/27; log the touch)

**Arden Wharf 3PL - dock scheduling** | Negotiation | $96,000 | From pipeline.csv, row 6
- No activity since 2026-10-02 (49 days), on a deal closing 12/15. Next step "Send revised terms" is dated 11/25.
> Next step: 11/21 - Send revised terms to Arden Wharf Head of Warehousing and ask for a redlines call
(Consider whether the signer has been met; only one title is listed.)

**Redfern Cross-Dock - dock scheduling** | Evaluation | $96,000 | From pipeline.csv, row 15
- No activity since 2026-09-24 (57 days), on a deal closing 12/30.
> Next step: 11/24 - Confirm 12/01 technical deep dive is still on with Redfern Head of Fulfillment. If no reply, move close date to 2027-02-15.

**Yarrow Supply Chain - dock scheduling** | Discovery | $96,000 | From pipeline.csv, row 21
- No activity since 2026-10-12 (39 days). The next step ("Reconnect after their peak season", 12/07) looks deliberate and the close date is 2027-01-30, so this may simply be parked.
> No change needed if parked on purpose. Otherwise log a note on why, so it does not read as neglected.

**Sable Ridge Supply - dock scheduling** | Negotiation | $64,000 | From pipeline.csv, row 7
- Single-threaded (1 contact, Director of Operations).
- Stage criteria not evidenced: Negotiation needs the signer met, and the next step is a security review with their IT lead.
> Add contacts: the signer, and the IT lead named in your next step.
> Stage: consider moving back to Proposal until the signer is met (your call; I cannot see call history).

**Ironbridge Logistics - dock scheduling** | Proposal | $96,000 | From pipeline.csv, row 12
- Single-threaded (1 contact, Director of Operations).
> Add contact: the signer (your next step is "Present to the signer" on 12/08).

**Thistle & Marsh - dock scheduling** | Evaluation | $128,000 | From pipeline.csv, row 17
- Single-threaded (1 contact, IT Manager).
> Add contact: a buyer-title contact (VP or Director of Operations, Head of Warehousing or Fulfillment, or COO). The IT Manager looks like the technical owner.

**Underhill Wholesale - dock scheduling** | Evaluation | $64,000 | From pipeline.csv, row 18
- Single-threaded (1 contact, Director of Operations).
> Add contact: a technical owner (Evaluation exit needs one named).

**Kestrel Park Logistics - dock scheduling** | Discovery | $128,000 | From pipeline.csv, row 23
- Single-threaded (1 contact, Head of Fulfillment).
> Add contact: a second operations contact from the site and dock mapping you have planned for 12/02.

## Bulk actions

- 3 deals need close dates pushed: Northgate, Brightwater, Oakhurst.
- 2 deals need a next step and date: Maplecrest, Zennor.
- 5 deals need contact roles added: Sable Ridge, Ironbridge, Thistle & Marsh, Underhill, Kestrel Park.
- 1 deal needs an amount: Silverline.
- 4 deals need a re-engagement touch logged: Corvell, Arden Wharf, Redfern, Yarrow.

## Clean (9)

Pellman Distribution, Quillon Freight, Tamarind Fulfillment, Harbor & Vane Logistics, Fennick & Lowe, Vantage Row 3PL, Westmere Depot, Halvering Group, Juniper Dockside. Each has an amount, a future close date, a dated next step, activity within 30 days, and 2 or more contacts. From pipeline.csv, rows 2, 5, 8, 9, 13, 19, 20, 24, 25.

## Assumptions

- "Today" is 2026-11-20, as you stated; the export is from this morning.
- 30-day activity rule from your company facts, not the 14-day default.
- Placeholder close dates and next-step dates above are mine, not read from any record. I had no median sales cycle or email context.
- Stage criteria checked only from the columns in the export (contact count and main contact title).

To apply any of these, tell me which ones and I will hand them to update-opportunity, or you can enter them by hand.
