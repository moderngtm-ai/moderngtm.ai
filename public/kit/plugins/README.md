# Plugins for GTM teams on Modern GTM: build kit

A private preview, and one page. Its front door lists the plugins that Anthropic and OpenAI publish for
go-to-market work. Each plugin opens to its own page, at the depth this site has reached for it:

- **Claude Sales plugin:** a full entry in five sections, joined from two earlier pages ("Exploring the Claude
  Sales plugin" and Nathan Fierley's configuration guide, checked on November 16, 2026).
- **Claude Marketing, Customer support and Small business plugins:** a skill list each.
- **ChatGPT for Sales:** all 18 skills as ChatGPT reported them out of an installed copy, restated and checked
  against OpenAI's pages. Its row on the front door is labelled "Reported by ChatGPT". Nothing in it is rated. `chatgpt/README.md` says how it was made.

Neither earlier page is changed by this build. The public guide keeps its own address. A separate directory
page that existed for a few hours on November 21, 2026 was folded into this one.

## How the navigation works

One row, which follows where the reader is.

| Where | The row shows |
|---|---|
| The front door (`#plugins`) | The page's parts: Anthropic, OpenAI, Skills for leaders |
| Inside the Claude Sales plugin | A way back to all plugins, the plugin's name, and its five sections |
| Inside the ChatGPT for Sales entry | A way back to all plugins, the entry's name, and five jumps down its one page |
| A shorter plugin page, or Method | A way back to all plugins, and the page's name |

The masthead holds the site's name and "Plugins", which also leads to the front door. The site's own five
sections are linked from the footer only, because in this preview they open a different page.

## What is in the page

| View | Address | Holds |
|---|---|---|
| Plugins (the front door) | `#plugins`, `#from-anthropic`, `#from-openai`, `#leader-skills`, `#not-listed` | Five plugins as rows with the depth of each page, 32 leader skills in eight plugins made for other teams, and what is not listed |
| Shorter plugin pages | `#marketing`, `#customer-support`, `#small-business` | A skill list for three Anthropic plugins |
| ChatGPT for Sales | `#chatgpt-sales`, `#gpt-source`, `#gpt-glance`, `#gpt-skills`, `#gpt-<name>`, `#gpt-apps`, `#gpt-setup`, `#gpt-rollout`, `#side-by-side`, `#gpt-by-job` | Where the entry comes from, the 12 template fields, 18 skills in six groups with a card each, the integrations and three counts of them that do not agree, setup, what to settle before a rollout, and the two Sales plugins side by side: 13 facts and the site's 13 GTM jobs. A row of the job table has the address `#job-<job>`, and a job in an entry's own list `#cjob-<job>` (Claude) or `#gjob-<job>` (ChatGPT) |
| Overview | `#overview` | Nine findings, how to read a skill's name and its four markings, all 36 skills in five groups, the 12 template fields, three names that get mixed up |
| Skills | `#skills`, `#skill-<name>` | One row for each skill: a run card (when, what to say, what to give it, what comes back), then facts from the plugin's files (what it reads from, where it delivers, four facts on what it can do, the skills it hands work to and draws on), then our read under a dashed rule |
| Fit | `#fit`, `#fit-role`, `#fit-motion`, `#fit-week` | Seven roles, a grid of value by frequency for six sales motions, and the week: skills by how often they are used, and eight routines |
| Before rollout | `#rollout`, `#rule`, `#overlap`, `#readiness`, `#models`, `#models-test`, `#setups` | The three-group rule, this plugin sorted by it, the readiness check, which model to run a skill on with a small test, eight setups |
| Configure | `#configure`, `#outcome` to `#questions`, `#fact-01` to `#fact-17` | The configuration guide, with its film and its AI-ready edition |
| Method | `#method`, `#model-test-method`, `#sources` | How it was put together, limits, how the model test was run, the rules it follows, credits, sources |

The rows from Overview to Configure are the Claude Sales plugin entry. One choice of role and sales motion runs through Skills, Fit and the facts list. It is kept in the reader's browser.

Each run card has up to three switches: whether Claude can reach the skill's tools, whose book the request covers, and whether it runs on request or on a schedule. The first starts from the reader's readiness settings. The other two appear only where the skill's own file takes a team or a schedule.

## Files

| File | What it is |
|---|---|
| `data.py.txt` | The dataset: 36 skills, seven roles, six motions, eight tool categories, 23 readiness switches, the connector list, the run cards, the routines, the model tiers and the write-up of the model test |
| `plugins_data.py.txt`, `plugins_views.py.txt` | The front door and the shorter plugin pages: every plugin, version and restated skill, checked by script against Anthropic's repository |
| `chatgpt_data.py.txt`, `chatgpt_views.py.txt` | The ChatGPT for Sales entry: 18 restated skills, the plugin-level facts, the markup, and the checks that hold the entry to ChatGPT's reply and keep the plugin's wording out of it |
| `chatgpt/` | That entry's own notes: how it was made and checked, the inventory prompt and the restated skills as data. ChatGPT's reply is not here, because it carries the plugin's own text |
| `mk_kit.py.txt` | Copies the sources into this kit and lists the files to publish |
| `pilot.json` | The model test's combined result, which the tables in the page are built from |
| `modeltest/` | The model test: its files, answer key, all 24 replies and both markers' marks. It has a README of its own |
| `mk_modeltest_kit.py.txt` | Copies the model test into the kit |
| `facts.json` | What the plugin's own skill files say, taken by `extract.py.txt` |
| `core.py.txt` | The checks that hold the dataset to `facts.json`, and the counts the copy quotes |
| `guide.html.txt` | A saved copy of the published configuration guide. Save it as `src/guide.html` |
| `guide_port.py.txt` | Turns the guide into this page's markup. It lists the five edits made for the site's style and the corrections made after the cross-lab checks |
| `CROSSLAB.md` | The two rounds of checks by other labs' models on November 22, 2026: what they found, what changed in the entry, and what the editor decided then and on November 23 |
| `CONFIGURE-EDITS.md` | Every sentence of the configuration guide that this page changed after those checks, before and after. Written by `mk_kit.py.txt` from the list in `guide_port.py.txt` |
| `base.css` | The site's own tokens, type, masthead, openers, buttons, tables and footer, taken by `extract_base.py.txt` |
| `entry.css`, `app.js` | This entry's own styles and script |
| `build.py.txt` | Builds `out/index.html` and `out/skills.json` |
| `mk_test.py.txt`, `check.cjs.txt` | A local copy with local fonts, and the scripted checks |
| `house_rules.py.txt` | The site's style check, set to read this page's views |

Remove `.txt` from the script names before running them.

## Build and check

```
python3 -I extract.py <plugin>/skills facts.json        # when the plugin changes
python3 -I extract_base.py <site kit>/style.css base.css  # when the site's styles change
python3 build.py
python3 mk_kit.py
python3 mk_test.py && (cd test && python3 -m http.server 8766 &)
NODE_PATH=<playwright> node check.cjs
python3 house_rules.py http://localhost:8766/index.html
```

The build stops when the dataset disagrees with the plugin's files, when the guide's structure changes, or when one of the listed edits to the guide no longer matches. It also stops when a run card offers a team or scheduled request that the skill's file does not support, or when a link in a routine is not stated by the file the routine names for it. It stops, too, when a card's four facts disagree with the file's own write line, when a tool is given a direction the file's table does not list, or when a corrected sentence of the guide is no longer where the script expects it.

## Checks run on this version

- Scripted checks: 483 of 483, on the entry as corrected after the third outside check of November 23, 2026. Fifteen were added for those corrections: the row on a skill's own output, the sentence on every card about any other action, the marking for setup, the links that are offers, what a skill takes from the CRM's setup, the 13 skills built around a deal record, voice apart from signature, the sample plan and the account of the third check. They cover the front door, its plugin rows and its note on Microsoft, the one navigation row in each of its four states, the ChatGPT for Sales entry and its 18 cards, every view and address, the filters, previous and next, the run cards and their switches, the four facts, the marking and the tool directions on every card, the conditions on handoffs, the grid for six motions, the week and its routines with the kind of link each file gives, the ratings the editor moved, the occasion in place of a frequency on five skills, the model section, the readiness check for eight sketches, the corrected sentences of the guide and its AI-ready edition, five widths, a phone, no sideways scroll, and the page with scripts off.
- axe-core 4.10.2: no violations in any of the 11 views, light and dark, at 1440 and 390 pixels wide, with every row open. Run again on the corrected entry as part of the scripted checks.
- Impeccable 4.10.0: no findings in 51 rendered scans on November 21, 2026 (all 11 views at three widths, and the six views that hold disclosures again with everything open). On November 22 the three views that changed (the ChatGPT for Sales entry, the front door and Method) were scanned again at three widths, as loaded and with everything open. The scan found lines that ran long in nine opened cards of the new entry. Their text column was narrowed, and the rescans found nothing. The scan of the file alone reports padding guesses that the rendered scans do not confirm. After the corrections of November 22, the six changed views of the Claude Sales entry were scanned 30 times: as loaded at three widths, and four of them again with everything open. Three run cards and one table cell had lines that ran long. Their text columns were narrowed and the 30 rescans found nothing. After the second round of corrections that day, the same six views were scanned 30 times again, and the scan found nothing. On November 23, after the editor's decisions, the six views were scanned 36 times, as loaded and with everything open at three widths, and the scan found nothing. The scan of the file alone gave the same two results before and after those decisions: its padding guesses, and a count of 13 short two-sentence constructions across the page. The same day, after the note on Microsoft went in, the front door and Method were scanned 12 times, as loaded and with everything open at three widths, and the scan found nothing. That evening, after the corrections of the third outside check, the six views of the entry and the plugin front door were scanned 42 times, as loaded and with everything open at three widths, and the scan found nothing.
- House style: 8 candidates on the entry as it now stands, each read by hand. They are clause commas, lists whose items hold "and", and the title of a source.

## Fact and our read

From the plugin's files: what a skill does, what it reads from and delivers to, what it can change, send or post and which skills it hands work to, and on the run card what to say and what to give it. Our count from the files: the markings (four, and one for `setup` alone), who takes a team or a named rep and which skills are named as routines, each with its rule. Our read: role fit, overlap, value, frequency, when in the week a skill fits, the eight routines and their order, which model to start it on and what it leans on. Our read is a first reading by Claude. Its editor has changed parts of it (`CROSSLAB.md` lists them), and his review of the rest is still to come.

The model test is our own measurement. It is a pilot of 24 runs and it stays out of the evidence register.

## Before this goes public

1. Nathan Fierley's review of the ratings, the six sales motions and the wording.
2. A decision on whether the latest changes get a check by another lab's model. Two such models checked the entry twice on November 22, 2026, and on November 23 one of them checked the statements that had changed since. The entry was corrected after each round (`CROSSLAB.md`). The corrections of the third round have not been checked from outside. Each round has disputed a like share of what it read, so a fourth would find more to reword. Those corrections make statements say less, and the page says what was checked and when.
3. The masthead and footer link to the Modern GTM site at its current private address. Change them when the site has its public address.
4. The guide's own published copy still says two skills are written for leaders, and differs from this page's copy on 12 points (`CONFIGURE-EDITS.md`). Its author decided on November 23, 2026 that the corrections belong in this site's copy and not in the published one.
5. The film keeps the look it was made in.
6. The model test: decide whether it stays in the entry, and check the invented names in its files against real companies. One web search each for three of the names found none.
7. Model names and Anthropic's guidance on choosing one were read on November 21, 2026. Check them again before publication.
8. The ChatGPT for Sales entry: the editor's review, and a second run of the inventory prompt in a new chat to see whether ChatGPT's report is stable. The entry rests on one report from one account.
9. The editor moved three overlap ratings on November 22, 2026, and on November 23 accepted 18 further findings that changed role marks, overlap ratings, ratings by sales motion, the model rule and one readiness switch (`CROSSLAB.md`). The wording of each change is Claude's, for him to edit. Every other rating is as first written and still awaits his review.
10. The model test's key was corrected on one item. Claude set the corrected mark, and the two markers did not. Decide whether to have it marked again.
11. The note on Microsoft under "What is not listed" was written by Claude on November 23, 2026 from two of Microsoft's own pages, at the editor's request. It names two sales plugins and gives our count of how the 18 documented skills divide between them. A model from another lab checked it against Microsoft's pages on November 23, 2026 and confirmed the count. It found a newer update date on the documentation, November 3, 2026, which the note now gives with a sentence on licensing. Microsoft's plugins have not been installed here.
