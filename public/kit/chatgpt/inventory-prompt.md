# ChatGPT for Sales: the inventory prompt

Prepared November 22, 2026. OpenAI's public pages name eight of the Sales plugin's skills and describe none, and no public copy of the plugin's files was found. This prompt asks ChatGPT, inside an account that has the plugin installed, for a read-only inventory of the plugin's own text.

## How it is used

1. Install the plugin named Sales, published by OpenAI, from the Plugins directory in ChatGPT.
2. Start a new chat, mention @Sales and paste the prompt below. Use the strongest model the plan offers.
3. If the reply stops part way, say "continue".
4. Keep every message of the reply, unedited.

## The prompt

```
I am documenting the plugin named Sales, published by OpenAI (part of ChatGPT for Sales), for an independent guide for revenue leaders. I need a read-only inventory of the plugin as it is installed in this account. Accuracy matters more than completeness. Where you cannot see something, say so and leave it blank.

RULES
1. Do not carry out any skill. Do not call a connected app, and do not create, change or send anything. You may open a skill's instructions and bundled files to read them.
2. Report only what you can read right now in the installed plugin: its listing, its skills' names and descriptions, each skill's instructions and bundled files, and the tools it exposes. Do not answer from general knowledge of sales work, or from what ChatGPT can do without the plugin.
3. Mark where each statement comes from: FILE (text of the plugin that you can read now), DOC (a page on openai.com, help.openai.com, learn.chatgpt.com or developers.openai.com, with its URL) or INFERRED (your own inference). Use no other websites.
4. Where the plugin says nothing, write "not stated". Do not fill gaps.
5. If you cannot or may not show part of the plugin, name the part and give the reason. Do not paraphrase from memory in its place.
6. Plain language. No sales pitch.

PART 1. WHAT YOU CAN SEE
a. Today's date; the ChatGPT plan; where this chat runs (Chat, Work or Codex; web, desktop or mobile); the model answering.
b. Whether the Sales plugin is installed, its publisher, its version or last-updated date, and its capabilities as its listing states them.
c. For this plugin, answer yes or no: can you read (1) the skill names, (2) the skill descriptions, (3) each skill's full instructions, (4) bundled reference files or scripts, (5) the list of tools or apps?
d. The apps or partner plugins the listing names under "Works with", exactly as listed, and which of them are connected in this account.

PART 2. THE SKILLS
List every skill bundled in the plugin, in the plugin's own order. Return one JSON array in a code block, with one object per skill and these fields:
- "name": exactly as written
- "invoke": what a user types to call it
- "description": the skill's own description, word for word
- "does": one sentence in your own words
- "use_when": the situations or triggers its instructions name
- "inputs_required" and "inputs_optional": what it asks the user for
- "reads": each app, tool or kind of file it reads, and what it reads there
- "writes": each thing it can create, change or send, and where, with the plugin's own words that say so in quotes; "none" if it only reads
- "approval": what it must show or ask before it writes or sends, with the plugin's own words in quotes
- "output": what it returns (sections, format, files or an interactive view)
- "hands_to" and "follows": other skills it names as a next or an earlier step
- "scope": one account or deal, one seller's book, a team or a whole pipeline; and whether a manager can run it for a named seller
- "schedule": whether its instructions cover scheduled or always-on runs, for example by an agent
- "without_apps": what it does when its apps are not connected, for example work from pasted notes or files
- "company_settings": any company-specific setup it reads, such as ideal customer profile, sales method, stages, territories, templates or tone
- "limits": what its instructions tell it not to do
- "sources": for every field that is not FILE, the field name and DOC with its URL, or INFERRED

If the reply would be cut off, stop at the end of a skill and continue from the next one when I say "continue". Do not shorten, merge or drop skills to fit.

PART 3. THE PLUGIN AS A WHOLE
a. Setup: the steps to install it, connect apps and give it company context. Name any skill meant for first-time setup.
b. Customizing: whether a company can edit, copy or extend these skills, and how.
c. Admin controls: what a workspace admin can allow or block, by skill, app or action.
d. Anything else the plugin's own text says that a sales leader should know before rollout.

Finish with one line: how many skills you listed, and how many of them you could read in full.
```

## How an answer is checked

The prompt leaves out two facts on purpose, so that they can test the answer.

- **The count and eight names.** OpenAI's plugin page names eight skills and says there are 10 more, which makes 18. An answer that lists those eight among 18 is reading the plugin. An answer with another count, or without those names, is treated as unreliable and nothing from it is used.
- **The apps.** The plugin page shows eight apps and says there are 33 more. The announcement groups partners under six headings. The "Works with" answer is compared with both.

Then:

- Claude opens the page behind every statement marked DOC. Statements marked INFERRED are leads and are not published as facts.
- Part 1c decides the depth of the entry. Names and descriptions alone make a skill list. Run cards need the full instructions.
- The entry says who reported the facts and who checked them.
- The site restates each skill in its own words and quotes at most one short phrase from the plugin.
- Our read is written separately. It is not asked of ChatGPT.
