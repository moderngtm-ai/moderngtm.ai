# The plugin area: how it gets into the site

Since November 22, 2026 the site's page is made in two steps. `build.py` makes the site's own page, as before. `merge.py` then puts the plugin area into it, opens Home on a finding from the register and, since November 23, 2026, puts the use-case index on Home. Nathan Fierley approved each after judging it as a private preview.

**A page published without the second step has no plugin area, and its three Plugins links leave the site.**

## To rebuild

1. Build the site as the README says. `dist/` then holds the site's own page.
2. Put `merge.py` beside `build.py` (it is `merge.py.txt` here), and beside it a folder `plugins/` with three files from `kit/plugins/`: `index.html.txt`, `entry.css` and `app.js`.
3. Put `use_cases.json` beside them (it is in this kit). If the register gained or lost a record, make it again first: see "When the register changes" below.
4. Run `python3 merge.py --use-cases use_cases.json`. It keeps the page from step 1 as `dist/index.before-merge.html`, writes the merged `dist/index.html` and adds the plugin pages to `dist/llms.txt`. A second run starts from the kept copy. Without `--use-cases` the page keeps the list "Start with the part you need" where the index should be.
5. Publish `dist/index.html`, `dist/evidence.json`, `dist/llms.txt`, `dist/robots.txt` and the kit files in patch mode, as before. Leave `index.before-merge.html` out. `skills.json`, `kit/plugins/`, `kit/modeltest/` and `kit/chatgpt/` need no new copy unless the plugin area itself changed.

The script stops when the site's page no longer has something it relies on, and names it. It relies on these: the three links to the plugin page, the home opener and its picture, the Salesloft finding in the list under the opener, the heading of "Our read", two lines of the page's router and the report's contents marker.

## What the merge changes on the site's own pages

- **Navigation and footer.** Plugins opens a section of the page.
- **Home.** The opener leads with one record from the register: a headline, a two-row figure, and the record's grade, basis, population and dates. The picture of agents and people sits lower, under "Our read", with the old headline. The list under the opener carries the other three findings. The headline and the caption are written in `merge.py` (`HEADLINE` and the figure in `new_home`), so change them there when the record changes.
- **Home, since November 23, 2026.** The use-case index stands where the list "Start with the part you need" stood. The section below describes it.
- **Playbooks.** Two headings gain an address, `#worked-handoff` and `#scorecard`, because the index links to them.
- **Nothing else.** The seven other views match the page from `build.py` pixel for pixel, at 1280 and 390 wide and in dark mode.

## The plugin area

- Its sources are in `kit/plugins/`, with a README of their own. It was built as a page of its own, "Plugins for GTM teams on Modern GTM", and that page's 11 views go into the site inside one wrapper.
- Its styles are tied to the wrapper with `:where()`, which adds no weight. Nine class names that mean something else on the site are renamed inside the wrapper, and four site rules stop at its edge. One router answers every address for all 19 views.
- Its method page is at `#plugins-method`, because the site already uses `#method`.
- The 60-second film is left out of Configure, at the owner's request.
- The page links to `kit/modeltest/README.md` and `kit/chatgpt/inventory-prompt.md`, so those two folders sit directly under `kit/`.
- **When a plugin entry changes:** rebuild the plugin page from `kit/plugins/`, put its new `index.html`, `entry.css` and `app.js` into `plugins/`, and run `merge.py` again.

## Checks on the version of November 23, 2026, with 94 records

Run on the page that holds the eight records added that day, the note on Microsoft under "What is not listed" and the corrections made that evening after a third check by another lab's model.

- The site's seven other views against the page from `build.py`: 21 comparisons, no difference.
- `check_site.cjs.txt`, run with `PREVIEW=0 USE_CASES=1`: 224 of 224. It covers every address, the opener, the use-case index, the register search, the report's contents marker, the picture's controls, six widths, a phone, reading without scripts, and axe-core on four views in both themes. It names the record count and the count of support records, so change both when the register grows.
- The plugin page's own checks, re-pointed at the merged page by `mk_check.py.txt` with `PREVIEW=0`: 483 of 483, which include axe-core on all 11 plugin views in both themes at 1440 and 390 wide.
- The 11 plugin views against the plugin page, element by element: they match, apart from the Configure opener without its film, link boxes reported 2 pixels taller with no difference on screen and the margin above the job rows.
- The site's house rules on the merged page: 8 candidates, each read by hand.
- Impeccable 4.10.0: no findings in 18 rendered scans of Home, the index at its own address, the plugin front door, the Claude Sales overview and the ChatGPT for Sales entry at three widths, the entry also with every card open.

## The use-case index

On the site since November 23, 2026, when Nathan Fierley said the staging copy goes to the site. It had been in the staging copy since November 22. Run with `--use-cases use_cases.json`, `merge.py` puts one table on Home at `#use-cases`, in place of the list "Start with the part you need". It has a row for each of the site's 13 GTM jobs: the register's records by grade, a play or tool whose own worked example is that job, and the number of skills in each lab's plugins.

- `use_cases.py.txt` writes `use_cases.json` from three things: `job_tags.json`, which holds the job of each record as the owner accepted it or, where its status says Proposed, as Claude proposed it; the placements of skills in `kit/plugins/data.py.txt` and `kit/plugins/chatgpt_data.py.txt`; and a short list, in the script itself, of the plays and tools whose worked example is one job.
- `jobs_tags.py.txt` writes `job_tags.json` from `job_tags_by_key.json`, which holds one line for each record, keyed as `sources_map.json` keys a record: the organization, a bar, then the first 40 characters of the finding. So a record keeps its job when the register grows or changes its order.
- The merge stops if the page no longer says what an example leans on, or if a link of the index opens nothing.
- A count in the Evidence column links to the register as a whole. A filter by job needs the tag as a field on each record, which is the register's build.
- A lab's count links to that job in the lab's own entry: `#cjob-<job>` in the Claude Sales overview, `#gjob-<job>` in the ChatGPT for Sales entry. Support links to the Customer support plugin's page.
- Check it with `USE_CASES=1 node check_site.cjs`.
- Both scripts name folders of the workspace they were written in. Change the paths at the top before running them elsewhere.
- Which job a record or a skill belongs to is our read. The owner accepted the tags and the placements on November 22, 2026. On the eight records added on November 23 he answered the same day: Lowe's and Walmart moved from lead qualification to the revenue organization as a whole, and the other six stand as Claude proposed them. A record merged before he has answered is marked Proposed in `job_tags_by_key.json`, and `use_cases.py` prints a note that names it.

## When the register changes

A new record needs a job before the page can be built.

1. Add the record as the README says: its row in Appendix A of `report.md`, its source in `sources_map.json` and its dates in `credits.json`. Build, so that `dist/evidence.json` holds it.
2. Add one line for it to `job_tags_by_key.json`, with the same key as in `sources_map.json` and one of the 13 jobs or the three other values. The owner accepts or changes each proposed job on the sheet Job tags of the proposal queue. Where a record is merged before he has answered, use the proposed job and say so in the change list.
3. Run `jobs_tags.py`. It stops and names every record that has no line, and every line whose record is gone.
4. Run `use_cases.py`, then `merge.py --use-cases use_cases.json`.
5. Change the record count in `check_site.cjs`, and the count it expects on the support row if a support record came or went. Then run it with `USE_CASES=1`.

If a finding's first 40 characters change, change its key in `job_tags_by_key.json` as well as in the register's two files.

**The round of November 23, 2026 was built this way, from this kit alone.** The owner accepted eight rows on the Queue sheet and told the thread that makes the plugin area to merge them. That thread had no build of the register, so it took the kit's files from the site. Unchanged, they rebuilt the site's own page byte for byte. It then added the eight rows at the end of Appendix A, so that records 1 to 86 keep their numbers, and the register holds 94 records. Any session that builds the register next starts from the kit as the site now holds it, not from an older build tree.

**The corrections of that evening were made the same way.** A model from another lab checked the eight new records against their sources. Six rows changed, in wording or in a source link and in no figure. No row's first 40 characters changed, so every key and every job tag stayed where it was. The six carry November 23, 2026 as their correction date in `credits.json`, and Appendix C of the report lists each change.

**The round of November 25, 2026 was built the same way.** The owner accepted five rows on the Queue sheet: one on Monaco from a podcast interview and four from Anthropic's interview study "Working with AI". They are records 95 to 99, at the end of Appendix A. Their jobs are the ones proposed in the queue, which he accepted when he said to publish. "Evidence through" stays November 23, 2026, the date of the newest source. Checks: 230 of 230 site-level checks on the site's page and on the staging copy, 483 of 483 merged-page checks and the same eight house-rules candidates as the page before it.

## A staging copy

"Modern GTM: merged preview" is a private page built by the same script with `--preview`, which adds a lime strip and that title. Changes are tried there before they go to the site. Since November 23, 2026 the two are the same build apart from the strip, except while a change waits there for the editor's word:

```
python3 merge.py --site dist/index.html --plugins plugins --out staging/index.html --preview --use-cases use_cases.json
```

**The Carta correction of November 24, 2026 changed a finding's first 40 characters,** so its key changed in `sources_map.json`, `credits.json` and `job_tags_by_key.json`. `jobs_tags.py` then named no record without a line. `patch_1124_carta.py` in the register thread's workspace made the change.

## The domain version

The page served at https://moderngtm.ai/ takes one more step after the merge. `domain.py` (stored here as `domain.py.txt`) serves the fonts from the site in place of Google Fonts, adds the canonical address and the preview image, opens the proposal route on Contribute, names `sitemap.xml` and the public repository, adds the line that reuse terms are not set, adds the privacy notice in About and moves Home's Latest list to a Changes view, reached from the footer and from the "Evidence through" dates. Since November 25, 2026 it also puts an empty fixed element at the top edge, painted with nothing, whose colour Safari on iPhone uses for the strip behind the status bar. It writes the page with `robots.txt`, `llms.txt`, `sitemap.xml`, `og.png` and `fonts/`:

```
python3 domain.py site/index.html public --llms site/llms.txt --robots robots.txt
```

Each change is anchored on text that must occur once on the merged page, so a page that has drifted stops the script. `check_site.cjs` takes `DOMAIN=1` for this version, which has 20 views. `og.html.txt` is the source of `og.png`, rendered at 1200 by 630 pixels. The fonts are Archivo and Source Serif 4, under the SIL Open Font License 1.1, whose text is in `fonts/`.

## Still the editor's

- The headline says "AI strategy", as Salesloft's release does. The findings list, Figure 1 and the report say "call it production-ready".
- The release gives neither the 200-employee threshold nor the fieldwork dates. Both come from the register's record.
- "Open the guide" on Playbooks leads to the public guide. It could lead to Configure inside the site.
- The plugin area is compiled with Claude. Its editor has changed parts of the Claude Sales entry, and the rest awaits his review. `kit/plugins/README.md` lists what is open, and `kit/CROSSLAB.md` what two other labs' models checked and what he decided.
