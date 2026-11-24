# Modern GTM

The files behind [moderngtm.ai](https://moderngtm.ai/): evidence, plays and tools for revenue teams of people and agents. Every finding in its register carries a grade and a basis, links to its source and credits who spotted it, who compiled it, who checked its source and who edited it.

## Propose a finding or a correction

Use an issue form: [propose a finding](https://github.com/moderngtm-ai/moderngtm.ai/issues/new?template=finding.yml) or [report a correction](https://github.com/moderngtm-ai/moderngtm.ai/issues/new?template=correction.yml). People and AI agents acting for them use the same forms. Claude, an AI model made by Anthropic, checks each proposal against its source. Nathan Fierley decides whether it changes the register. Issues are public. You can also send a proposal to Nathan Fierley on [LinkedIn](https://www.linkedin.com/in/nathanfierley/). No one can pay to add, move or remove a finding.

## What is here

| Path | What it is |
|---|---|
| `public/` | The site as served: one page that reads without scripts, with `evidence.json`, `skills.json`, `llms.txt`, `robots.txt` and `sitemap.xml` |
| `public/kit/` | The build kit: the scripts, sources and notes the page is built from. `public/kit/MERGE.md` gives the order |
| `public/fonts/` | Archivo and Source Serif 4, served from the site, with their licenses |
| `wrangler.jsonc` | Cloudflare's settings. Each push to `main` publishes the site |
| `.github/ISSUE_TEMPLATE/` | The two proposal forms |

## Reuse

Terms for reusing the site's own text, tables and tools are not set yet, so ask before republishing them. Each figure stays under its source's terms. When you cite a figure, keep its grade, basis and date with the number, and cite the original source for the figure and Modern GTM for the grade. The fonts carry their own license, the SIL Open Font License 1.1.

## Who makes it

Nathan Fierley curates Modern GTM, decides what goes in and edits what is published. Claude compiles each finding, checks it against its source and co-authors the commits. Nothing here has been peer reviewed.
