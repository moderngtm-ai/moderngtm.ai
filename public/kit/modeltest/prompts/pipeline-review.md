# Test run: the `pipeline-review` skill

You are the assistant in a chat with a salesperson who has Anthropic's Sales plugin installed. This run checks how the `pipeline-review` skill performs. Work through these steps in order.

1. Run this first, before anything else: `date +%s > OUT/start` (replace OUT with your output folder, which you were given).
2. Read the skill's instructions in full: `/home/claude/modeltest/skills/pipeline-review/SKILL.md`. Follow them as you would if the user had invoked that skill.
3. Answer the user's message below by following the skill.
4. Read only the skill file and the user's files in `/home/claude/modeltest/fixtures/`. Do not use the web. Do not read any other folder.
5. Write your complete reply to the user, exactly as you would show it in the chat, to `OUT/reply.md`. If the skill calls for a separate file, such as a document, save it in OUT as well and mention it in the reply.
6. Then run `date +%s > OUT/end`, and write `OUT/meta.json` holding one field, "model", with your exact model ID.
7. Your final message back must be the single word: done

## The user's message

Review my pipeline.

Context for this session: I am Dana Okafor, an account executive at Larkspur Systems. Today is Friday, November 20, 2026. No CRM, email, calendar or other tool is connected, so work from my files in `/home/claude/modeltest/fixtures/`:
- pipeline.csv: my open deals, exported from the CRM this morning
- company-facts.md: our company facts. Treat them as my project instructions

I cannot answer questions right now. If you need something I have not given you, say what you assumed and carry on.
