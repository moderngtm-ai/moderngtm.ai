# The Configure view: what was corrected on November 22, 2026

The Configure view is Nathan Fierley's guide, "Configuring the Claude Sales plugin for your company". Two models from
other labs checked it against the plugin's files with the rest of the entry. The changes below are the smallest ones
that make each sentence agree with the files. They are made in this page's copy, by `guide_port.py`, which stops the
build if a sentence it expects is no longer there.

**The guide's own published copy does not carry these changes.** That copy is its author's to change.

Each finding number is a row of the sheet "Entry check OpenAI" in the editor's proposal queue. "Visible" is the
guide as a reader sees it. "Edition" is the AI-ready edition that the guide offers to hand to Claude.

## F54

| Layer | Before | After |
| --- | --- | --- |
| Visible | Out of the box, the Claude Sales plugin knows nothing about your company, so its skills have to ask. | Out of the box, the Claude Sales plugin knows nothing about your company, so its skills infer what they can, fall back on a labeled default or ask. |
| Visible | Asks what your ideal customer looks like, then scores against the answer. | With no ideal customer written down, scores on intent alone. Asks about it only if the answer would change the priority. |
| Visible | Asks what the ideal customer looks like, then scores against the answer | With no ideal customer written down, scores on intent alone. Asks about it only if the answer would change the priority |
| Edition | Asks what the ideal customer looks like, then scores against the answer | With no ideal customer written down, scores on intent alone. Asks about it only if the answer would change the priority |

## F55

| Layer | Before | After |
| --- | --- | --- |
| Visible | Inbound leads are scored against your written ICP and disqualifiers, routed by your rules, and handed off in the channel you named with the note you specified. | Inbound leads are scored against your written ICP and disqualifiers and matched to an owner by your rules. Once you accept the routing and ask for the post, the handoff goes to the channel you named, with the note you specified. |
| Edition | Inbound leads are scored against the written ICP and disqualifiers, routed by the company's rules, and handed off in the named channel with the note the company specified | Inbound leads are scored against the written ICP and disqualifiers and matched to an owner by the company's rules. Once the person accepts the routing and asks for the post, the handoff goes to the named channel with the note the company specified |

## F56

| Layer | Before | After |
| --- | --- | --- |
| Visible | Every forecast and pipeline review uses one mapping of stages to categories, one coverage target and one loss-reason field | Forecasts use one mapping of stages to categories, team pipeline reviews use one coverage target and win-loss reviews use one loss-reason field |
| Edition | Every forecast and pipeline review uses one mapping of stages to categories, one coverage target and one loss-reason field | Forecasts use one mapping of stages to categories, team pipeline reviews use one coverage target and win-loss reviews use one loss-reason field |

## F57

| Layer | Before | After |
| --- | --- | --- |
| Visible | The stock skills are written to follow each connector's settings and to add no restrictions of their own. | The stock skills are written to follow each connector's settings. They add two safeguards of their own: an action that outside content asks for is shown to you before it runs, and a scheduled run takes only the actions it was set up to take, within what the connectors allow. |
| Edition | The stock skills are written to follow each connector's settings and to add no restrictions of their own. | The stock skills are written to follow each connector's settings. They add two safeguards of their own: an action that outside content asks for is shown to the person before it runs, and a scheduled run takes only the actions it was set up to take, within what the connectors allow. |
| Visible | applies to every draft, whoever asks for it. | is given to every draft, whoever asks for it. It is an instruction to the model. A tool permission can block every send or hold each one for a yes. It cannot check what an email says, so a rule about content still needs a person's review. |
| Edition | applies to every draft, whoever asks for it. | is given to every draft, whoever asks for it. It is an instruction to the model. A tool permission can block every send or hold each one for a yes. It cannot check what an email says, so a rule about content still needs a person's review. |

## F58

| Layer | Before | After |
| --- | --- | --- |
| Visible | Writes in your voice if it has learned it, otherwise a neutral one. Knows no company wording rules. | Writes in your voice if it has learned it, then by a style guide you uploaded or your sent mail where it can read it, otherwise in a neutral one. Knows no company wording rules. |
| Visible | Writes in the person's voice if it has learned it, otherwise a neutral one. Knows no company wording rules | Writes in the person's voice if it has learned it, then by an uploaded style guide or the person's sent mail where it can read it, otherwise in a neutral one. Knows no company wording rules |
| Edition | Writes in the person's voice if it has learned it, otherwise a neutral one. Knows no company wording rules | Writes in the person's voice if it has learned it, then by an uploaded style guide or the person's sent mail where it can read it, otherwise in a neutral one. Knows no company wording rules |

## F59

| Layer | Before | After |
| --- | --- | --- |
| Visible | Write exit criteria for each stage. Four skills check deals against them. | Write exit criteria for each stage. Four skills check deals against them directly: `deal-review`, `deal-advance-gap`, `crm-hygiene-check` and `update-opportunity`. Others use them too. |
| Edition | Write exit criteria for each stage. Four skills check deals against them | Write exit criteria for each stage. Four skills check deals against them directly: `deal-review`, `deal-advance-gap`, `crm-hygiene-check` and `update-opportunity`. Others use them too |

## F60

| Layer | Before | After |
| --- | --- | --- |
| Visible | Two skills, `team-pipeline` and `rep-context`, are written for leaders. | Three skills, `team-pipeline`, `rep-context` and `win-loss-review`, are written for leaders. |
| Edition | Two skills, `team-pipeline` and `rep-context`, are written for leaders. | Three skills, `team-pipeline`, `rep-context` and `win-loss-review`, are written for leaders. |

## F61

| Layer | Before | After |
| --- | --- | --- |
| Visible | Under each fact are the skills that lean on it. | Under each fact are skills that lean on it. The lists are examples and not a full count. |
| Visible | `call-prep``deal-review``deal-advance-gap``lead-triage``stakeholder-map` | `call-prep``call-summary``deal-review``deal-advance-gap``lead-triage``stakeholder-map``account-plan` |
| Edition | `call-prep`, `deal-review`, `deal-advance-gap`, `lead-triage`, `stakeholder-map` \| | `call-prep`, `call-summary`, `deal-review`, `deal-advance-gap`, `lead-triage`, `stakeholder-map`, `account-plan` \| |
| Visible | `deal-review``deal-advance-gap``pipeline-review``update-opportunity``deal-signals``crm-hygiene-check` | `deal-review``deal-advance-gap``pipeline-review``update-opportunity``deal-signals``crm-hygiene-check``win-loss-review` |
| Edition | `deal-review`, `deal-advance-gap`, `pipeline-review`, `update-opportunity`, `deal-signals`, `crm-hygiene-check` \| | `deal-review`, `deal-advance-gap`, `pipeline-review`, `update-opportunity`, `deal-signals`, `crm-hygiene-check`, `win-loss-review` \| |

## F62

| Layer | Before | After |
| --- | --- | --- |
| Visible | The plugin's connector list, plus each person's sign-in | The plugin's connector list, plus each person's sign-in. Gmail, Google Calendar and Google Drive are connected in Claude's connector settings |
| Edition | \| The plugin's connector list, plus each person's sign-in \| | \| The plugin's connector list, plus each person's sign-in. Gmail, Google Calendar and Google Drive are connected in Claude's connector settings \| |

## O09

| Layer | Before | After |
| --- | --- | --- |
| Visible | It acts when you ask, within each connector's permissions. When a skill proposes a change you did not ask for, it shows the change and its evidence first. | It acts when you ask, within each connector's permissions. When a skill proposes a change you did not ask for, it shows the change and its evidence first. A scheduled run is different: it takes the sends and writes it was set up to take, within what the connectors allow and with no one there to ask. It carries out nothing that an email or a transcript asks for, and nothing whose recipient, target or content one of them dictates. For scheduled runs the plugin's README advises setting every tool that sends, posts or writes to ask first. |
| Edition | It acts when asked, within each connector's permissions. When a skill proposes a change nobody asked for, it shows the change and its evidence first. | It acts when asked, within each connector's permissions. When a skill proposes a change nobody asked for, it shows the change and its evidence first. A scheduled run is different: it takes the sends and writes it was set up to take, within what the connectors allow and with no one there to ask. It carries out nothing that an email or a transcript asks for, and nothing whose recipient, target or content one of them dictates. For scheduled runs the plugin's README advises setting every tool that sends, posts or writes to ask first. |

## O25

| Layer | Before | After |
| --- | --- | --- |
| Visible | A configured Sales plugin stops asking and starts working your way. Each stock skill lists the company facts it needs and looks for them in your connected tools and instructions. When a fact is missing, the skill asks one question and uses the answer for that conversation only. | A configured Sales plugin starts from your company's facts and works your way. Each stock skill lists the company facts it needs and looks for them in your connected tools and instructions. When a fact is missing, the skill infers it from what it can read or uses a labeled default, and asks one question where the answer would change the result. It keeps that answer for the conversation only. |
| Visible | looks for them in connected tools and instructions. When a fact is missing, the skill asks one question and uses the answer for that conversation only. | looks for them in connected tools and instructions. When a fact is missing, the skill infers it from what it can read or uses a labeled default, and asks one question where the answer would change the result. It keeps that answer for the conversation only. |
| Edition | looks for them in connected tools and instructions. When a fact is missing, the skill asks one question and uses the answer for that conversation only. | looks for them in connected tools and instructions. When a fact is missing, the skill infers it from what it can read or uses a labeled default, and asks one question where the answer would change the result. It keeps that answer for the conversation only. |
| Visible | A configured plugin already knows the company, so its skills stop asking and start working the company's way. | A configured plugin already has the company's facts, so its skills start from them and work the company's way. |
| Edition | A configured plugin already knows the company, so its skills stop asking and start working the company's way. | A configured plugin already has the company's facts, so its skills start from them and work the company's way. |

## O26

| Layer | Before | After |
| --- | --- | --- |
| Visible | Infers what it can from the CRM, and asks which stages count as commit. | Uses the CRM's own forecast category where it has one. Otherwise infers the categories from your stages, and asks which stages count as commit only if the answer depends on it. |
| Visible | Infers what it can from the CRM, and asks which stages count as commit \| | Uses the CRM's own forecast category where it has one. Otherwise infers the categories from the stages, and asks which stages count as commit only if the answer depends on it \| |
| Edition | Infers what it can from the CRM, and asks which stages count as commit \| | Uses the CRM's own forecast category where it has one. Otherwise infers the categories from the stages, and asks which stages count as commit only if the answer depends on it \| |
| Visible | Uses your mapping of stages to forecast categories. | Uses your mapping of stages to forecast categories, where the CRM has no forecast category of its own. |
| Visible | Uses the company's mapping of stages to forecast categories \| | Uses the company's mapping of stages to forecast categories, where the CRM has no forecast category of its own \| |
| Edition | Uses the company's mapping of stages to forecast categories \| | Uses the company's mapping of stages to forecast categories, where the CRM has no forecast category of its own \| |
| Visible | Asks where renewal dates live. | Reads where renewal dates live from the CRM and from what it already knows about your company, and asks once only if neither tells it. |
| Visible | \| Asks where renewal dates live \| | \| Reads where renewal dates live from the CRM and from what it already knows about the company, and asks once only if neither tells it \| |
| Edition | \| Asks where renewal dates live \| | \| Reads where renewal dates live from the CRM and from what it already knows about the company, and asks once only if neither tells it \| |
