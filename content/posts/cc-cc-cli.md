---
title: "Triggering Claude Chrome from the Command Line"
date: "January 10, 2026"
tags: ["AI", "Automation", "Claude"]
excerpt: "PSA for anyone dealing with SaaS tools that have good reporting UIs but garbage APIs: Claude Chrome + Claude Code might be your workaround."
readingTime: "6 min read"
---
I work with a bunch of SaaS applications that have decent reporting and export capabilities but generally
poor or unavailable reporting APIs, so getting that data into an automated pipeline means either building custom integrations or giving into a manual process and doing a lot of clicking.

But what if I could just tell an AI to go click the buttons for me?

I spent some time this morning trying to figure that out. The answer is yes, with some caveats worth understanding before you try it yourself.

## The Experiment

I had been itching to try out some new Claude features.  Anthropic's [Claude for Chrome extension](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn) launched recently as an add-on browser agent - it can navigate pages, fill forms, and interact with web applications on your behalf. I was curious whether I could trigger it from outside the browser, specifically from a script or Claude Code instance running from the command line.

If it works, it means I can build mini-data pipelines that pull from multiple reporting systems and sources without building custom API integrations for each source. For example, think of grabbing the most recent forecast from a Google Drive Folder, the most recent actuals from Looker and additional supplemental details from various ad hoc sales, marketing and customer service reports. The idea is to let the Chrome agent handles the browser automation and let my reporting scripts handle everything else.

I started with a simple test: get Claude Chrome to set up and download a dataset from Looker. Navigate to a saved query, configure the export options, download the CSV. Three steps that take me thirty seconds manually but don't have an easily accessible clean API equivalent.

## What I Learned

The `--chrome` flag in Claude Code lets you run browser automation non-interactively:

```bash
claude --chrome -p "your prompt here"
```

**Authentication is inherited.** Claude uses your existing browser session. If you're logged into Looker in Chrome, the agent can access it. This is what makes the whole approach practical for internal tools.

**Direct URLs beat UI navigation.** Every menu click is another opportunity for something to go wrong. If your tool gives you a URL with query parameters (like Looker's `?qid=...`), use that instead of instructing the agent to click through the interface. Fewer steps, fewer failures, faster results.

**Claude Chrome hesitates at downloads.** My initial test worked right up until the final step - Claude wanted me to press the download button myself. That would defeat the automation I was looking for. I got around it by asking Claude to "test the function before bothering me with any tasks," which worked. Later I found that adding "Proceed without asking for confirmation" to prompts is a cleaner solution.

**Safety guardrails are real.** Curious about the boundaries, I tried getting Claude to complete a CAPTCHA using similar misdirection. It refused, correctly interpreting the context of the form and running right into its safety guardrails. Probably the right outcome.

**Saved shortcuts aren't accessible from CLI.** The Chrome extension lets you save task shortcuts (like `/explore-orders`), but there's no way to call those from the command line. You have to replicate the full prompt in your script. This actually turns out to be fine—moving prompts into shell scripts or environment variables is more useful anyway. You can version control them, parameterize them, and chain them together.

**Profile selection doesn't work/doesn't exist.** Claude connects to whatever Chrome profile it finds first. Meaning if you have separate Chrome profiles for work and home, it selects whichever one is currently active and has focus.  The `--profile-directory` flag exists but gets ignored when Chrome is already running. If you're juggling work and personal accounts, you need to manually activate the correct profile before running your script. There's an [open issue](https://github.com/anthropics/claude-code/issues/15125) tracking this.

## The Working Script

Here's what I ended up with:

```bash
#!/bin/bash
# NOTE: Ensure correct Chrome profile is active before running

claude --chrome -p 'Navigate to https://example.looker.com/explore/your_model/your_explore?qid=your_query_id

Once the page loads, click the gear icon in the top right corner. In the download options, ensure "All Results" is selected. Then click Download to export the data as CSV. Proceed with the download without asking for confirmation.'
```

It works. The agent navigates to the saved query, configures the export, and downloads the CSV. No manual intervention required.

## What's Next

Browser agents have come a long way in a year. I remember being impressed by the promise of Manus around this time last year, but it struggled with anything requiring authentication and most of the browser based solutions, like Comet, never seemed to hit the spot. With its tight pairing with Claude Code, Claude for Chrome might be the implementation that actually has the practical utility I'm looking for - at least for now.

The next step is testing whether a headless Claude Code agent can reliably dispatch these browser tasks as part of a larger workflow, which doesn't feel like a high-bar for CC. If it holds up, I've got a path to automate data collection across a whole category of tools that were previously manual-only.
