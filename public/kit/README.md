# Modern GTM build kit

The site is one self-contained page. `build.py` (stored here as `build.py.txt`) builds it from the files beside it: `style.css`, `body.html`, `app.js`, `sources_map.json`, `credits.json` and `report.md` (the curated copy of the GTM report).

To rebuild in a fresh workspace:

1. Put every file in this folder into one empty folder and rename `build.py.txt` to `build.py` and `house_rules.py.txt` to `house_rules.py`.
2. Run `python3 build.py` there. It needs python-markdown, beautifulsoup4, Playwright for Python and Chrome at /usr/bin/google-chrome, because the charts and the register are drawn once at build time so the page reads without scripts.
3. Publish `dist/index.html`, `dist/evidence.json`, `dist/llms.txt`, `dist/robots.txt` and the `dist/kit` files (as `kit/...`) to the artifact in patch mode.

To add a finding: add its row to Appendix A of `report.md` and its source to `sources_map.json` (key: the organization, a bar, then the first 40 characters of the finding). To credit whoever spotted it, add the same key, or the organization, under `spotted` in `credits.json`. A finding with no entry is credited to Claude. If that person asked to be shown with a title, an organization and a website, put the three under `people`, keyed by the same name; the row then shows them and links the organization. Put the key and the date under `added`, and when a row is corrected put its key and the date under `corrected`. If a row's first 40 characters change, change its key in both files; the build stops on a key that no longer matches a row.

Every build ends with a house-rules check of the site's own style rules: serial commas, number words, dash asides, exclamation marks, retired terms, slogans and title-case headings. Fix what it reports. If a report is a false alarm, add it to the ALLOW list in `house_rules.py` with the reason. The check cannot judge the rules that need reading: a vendor flagged at first mention, no named individuals at source companies, no company leading on its own claims and verbs that match the evidence. Read new copy against those by hand.

The local fonts are only for the preview pages. Without them the published page is the same, because it loads its fonts from Google Fonts.

## The plugin area (since November 22, 2026)

The published page is made in two steps: `build.py`, then `merge.py`, which puts the plugin area into the page and opens Home on a finding. `MERGE.md` has the steps and what the merge changes. A page published without the second step has no plugin area, and its Plugins links leave the site. At moderngtm.ai a third step follows: `domain.py` makes the page served there and the files that travel with it. `MERGE.md` has it under "The domain version".

The plugin area's own sources are in `plugins/`, with a README of their own.

## The use-case index (since November 23, 2026)

Home carries a table of the site's 13 GTM jobs: the register's records for each job by grade, a play or tool, and the skills in the labs' plugins. `merge.py --use-cases use_cases.json` puts it there. Run without the option, the merge leaves the index out.

**A new record needs a job before the page can be built.** Add one line for it to `job_tags_by_key.json`, with the same key as in `sources_map.json`, then run `jobs_tags.py` and `use_cases.py` (stored here with `.txt` added). `jobs_tags.py` stops and names every record that has no line. `MERGE.md` has the steps under "When the register changes", and the owner accepts or changes each proposed job on the sheet Job tags of the proposal queue.
