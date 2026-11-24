# ChatGPT for Sales entry: how it was made and checked

This entry rests on a report. OpenAI publishes no copy of its Sales plugin's files, so the entry rests on what ChatGPT, an OpenAI model, reported from an installed copy. Claude, an Anthropic model, checked that report and restated it. Nothing in the entry is rated, and no workflow was run.

## The run

- On November 22, 2026 Nathan Fierley installed the plugin named Sales in his own ChatGPT account and gave ChatGPT the prompt in `inventory-prompt.md`.
- ChatGPT reported version 1.1.7, with OpenAI named as author and developer in the plugin's manifest.
- It reported 18 skills: one that routes requests and 17 workflows. It said it could read the full instructions of all 18.
- It marked where each statement came from: the plugin's own text or its own inference. None cited a web page.

## How the report was checked

| Check | Result |
| --- | --- |
| The count the prompt held back: OpenAI's plugin page implies 18 skills | 18 reported |
| The eight skill names on OpenAI's plugin page | All eight are among the 18 |
| Skills that one skill names as a next or an earlier step | Every name is one of the 18 |
| The integrations in the manifest | 47 entries in 10 categories, 46 of them distinct: 33 stored under a readable name and 13 under a code |
| The apps on OpenAI's plugin page | Eight shown and 33 more, which makes 41 |
| The names printed in the plugin's README | 40 |

Claude opened four of OpenAI's pages on November 22, 2026: the plugin page, the help article, the announcement of November 17, 2026 and the plugins guide. Their addresses are in `chatgpt_data.py.txt`.

## What the check could not settle

These are shown in the entry as differences. None is resolved.

- **Three counts of integrations.** The manifest lists 46, the plugin page implies 41 and the README prints 40 names.
- **Two category labels.** The manifest says "Business & Operations" and the plugin page says "Operations".
- **Two groupings of partners.** The manifest uses 10 categories and the announcement uses six headings.
- **The version.** 1.1.7 appears on no public page, so it rests on the report alone.
- **Names behind codes.** 13 integrations are stored as codes. The report ties one of them to a name, and the entry does not guess the rest.

## What ChatGPT inferred

The plan and mode of the session, the model that answered, the order of the skills and what an admin can control were marked as inference. The entry gives none of them as fact. What it says about plans and admin controls comes from OpenAI's help page.

## What is published, and what is not

| File | What it is |
| --- | --- |
| `inventory-prompt.md` | The prompt, how it is used and how an answer is checked |
| `skills.json` | The 18 skills and the plugin-level facts as this site restates them |
| `../chatgpt_data.py.txt` | The same restated data, as the build reads it |
| `../chatgpt_views.py.txt` | The entry's markup, and the checks the build runs on it |

ChatGPT's reply is not published. It carries the plugin's own descriptions word for word, and the plugin's package is labelled proprietary. The site quotes the plugin once: the first prompt its README suggests.

The build compares the entry's wording with the reply. It fails if any skill shares a run of five or more words with the plugin's text, or eight or more with ChatGPT's own summary. On this version the longest shared runs are four and seven words. Without a copy of the reply the build skips that comparison and says so.

## Limits

- One report, from one account, in one run. A second run in a new chat would show whether the report is stable.
- Claude did not read the plugin's files. A field can be wrong where ChatGPT misread or shortened a skill's instructions.
- The example requests are this site's wording. They were not run.
- The entry describes version 1.1.7. A later version may differ.
- Which GTM job a skill serves, who it is for and how the skills are grouped is our read. The entry marks it as such.
