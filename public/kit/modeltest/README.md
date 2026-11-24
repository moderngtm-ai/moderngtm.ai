# The model pilot: files, key, replies and marks

Six skills of Anthropic's Sales plugin 2.1.0 were each run once on four Claude models on November 21, 2026,
from the invented files in `fixtures/`. This folder holds everything needed to mark the replies again or to
rerun the test. It is a pilot: one run for each skill and model. The page's Method view says what it can and
cannot show.

Every company, person and product in `fixtures/` is invented.

## What is here

| Path | What it is |
|---|---|
| `fixtures/` | The test files: a pipeline export of 24 deals, three call transcripts, an inbox of 10 messages, 12 leads and the company's facts. |
| `prompts/` | The instruction each run was given, one for each skill. The folder paths in them are those of the test machine. |
| `key/key.json` | The answer key. The pipeline figures were computed from `fixtures/pipeline.csv` by `make_fixtures.py`. |
| `key/checklist_text.json` | The checklist the markers worked through, item by item. |
| `key/mapping.json` | Which code name stood for which model in each skill. The markers were not pointed to it. |
| `key/adjudication.json` | The one mark set on a second reading, with the reason, and one correction to the answer key made on November 22, 2026. |
| `grade/<skill>.sheet.md` | The marking sheet. Both markers got the same sheet. |
| `grade/<skill>.A.json`, `.B.json` | The two markers' marks, with a short quotation as evidence for each. |
| `runs/<skill>/<model>/` | Each reply as written, with any file the run produced. |
| `pilot.json` | The combined result that the page's tables are built from. |
| `usage.jsonl.txt` | Time, tokens and tool calls for each run, as the test harness reported them. Most of the tokens are the harness's own overhead. |
| `NOTES.md` | What was checked by hand, what was not, and how the runs were started. |
| `make_fixtures.py.txt`, `make_grading.py.txt`, `score.py.txt` | The scripts. |

## To mark the replies again

Read a sheet in `grade/`, read the four replies for that skill in `runs/`, and compare your marks with
`grade/<skill>.A.json` and `.B.json`. `score.py` shows how two markers' marks are combined.

## To rerun the test

Give a fresh session one file from `prompts/`, with the paths changed to where you keep `fixtures/` and the
skill's own `SKILL.md` from the plugin. Run it on each model you want to compare, then mark the replies with
the sheet. Run each more than once if you can: one run cannot separate a model's ability from chance.
