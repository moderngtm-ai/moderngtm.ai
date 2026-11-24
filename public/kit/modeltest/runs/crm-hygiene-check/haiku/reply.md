Checked 24 open deals: 18 need attention and 6 are clean. Most urgent: 3 deals have close dates already past, Silverline Freightways has no amount, and Pellman Distribution is marked Contract Sent while its next step is still returning redlines.

Checked against: From pipeline.csv (24 rows, exported this morning), and From company-facts.md (stage definitions, buyer titles, pipeline hygiene rule). Today taken as Friday 2026-11-20, as you said. No CRM, email, calendar or docs are connected, so this is a files-only audit. Not queried: stage age and median (no stage-entry dates in the export), close date unchanged since creation, next step unchanged for 14+ days (no history in the export), and stage evidence in documents (no docs connected). Row numbers below are the line numbers in pipeline.csv, with the header on row 1.

**Critical: fix now**

- Close date in the past (3). Suggested dates are my proposals, not taken from any record.
  - Brightwater Haulage (Proposal), close 2026-10-30, row 10. Suggest 2026-12-18.
  - Oakhurst Pallet (Evaluation), close 2026-11-06, row 14. Suggest 2026-12-18, after the 11/25 second demo.
  - Northgate Cold Chain (Contract Sent), close 2026-11-13, row 3. Suggest 2026-12-04, after the 11/24 signature chase.
- Amount blank (1). Silverline Freightways (Evaluation), row 16. Suggest $64,000 as a floor (2 sites at the $32,000 list price). Confirm once the site count is scoped on 11/27.

**Attention**

- Stage looks wrong (1). Pellman Distribution (Contract Sent), row 2. Next step is "Legal returns redlines" on 11/23. Contract Sent means final paper is out for signature, so this looks like Negotiation unless the final paper has gone out.
- No activity in 14+ days (6). Last activity date in brackets.
  - Redfern Cross-Dock, row 15 (2026-09-24, 57 days).
  - Arden Wharf 3PL, row 6 (2026-10-02, 49 days).
  - Corvell Storage, row 4 (2026-10-09, 42 days).
  - Yarrow Supply Chain, row 21 (2026-10-12, 39 days).
  - Oakhurst Pallet, row 14 (2026-11-02, 18 days).
  - Brightwater Haulage, row 10 (2026-11-05, 15 days).
- Next step blank (2).
  - Maplecrest Distribution (Proposal), row 11. Suggest "11/24 - Follow up on the proposal with VP Operations." Proposed from stage only; no email checked.
  - Zennor Cold Storage (Discovery), row 22. Suggest "11/25 - Book next discovery call with Director of Operations." Proposed from stage only; no email checked.
- Single-threaded (5). One contact on the deal.
  - Sable Ridge Supply, row 7.
  - Ironbridge Logistics, row 12.
  - Thistle & Marsh, row 17.
  - Underhill Wholesale, row 18.
  - Kestrel Park Logistics, row 23.

**Stage evidence to confirm (not yet proof of error)**

- Halvering Group (Discovery), row 25. Main contact is a Procurement Lead, which is not a buyer title in company-facts.md. The next step is to confirm the problem with a buyer title.
- Juniper Dockside (Discovery), row 24. Main contact is an Operations Manager, which is not on the buyer-title list. Confirm whether it counts.
- Ironbridge Logistics (Proposal), row 12. Proposal needs the signer named, and the next step is "Present to the signer" on 12/08. Confirm who the signer is.
- Thistle & Marsh (Evaluation), row 17. The next step is the demo with the technical owner on 12/04, but Evaluation needs the demo done. Confirm whether the demo has happened.

**Clean (6)**: Quillon Freight, Tamarind Fulfillment, Harbor & Vane Logistics, Fennick & Lowe, Vantage Row 3PL, Westmere Depot.

**Bulk actions (none written; each needs your pick)**

- 3 deals need close dates pushed (Brightwater, Oakhurst, Northgate).
- 5 deals need contact roles added (Sable Ridge, Ironbridge, Thistle & Marsh, Underhill, Kestrel Park).
- 2 deals need next steps with dates (Maplecrest, Zennor).
- 1 deal needs an amount (Silverline).
- 1 deal may need its stage changed (Pellman).

Nothing has been changed in the CRM. Any of these can be applied with update-opportunity once you choose which to apply.
