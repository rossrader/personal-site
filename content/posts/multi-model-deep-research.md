---
title: "Multi Model Deep Research: Not Quite What I Expected"
date: "November 27, 2025"
tags: ["Prompt Design", "Experiments", "Models"]
excerpt: "I tried to see if I could get better results from combining the effort of three AI assistants, but the results weren't all that satisfying. But I learned a few things."
readingTime: "4 min read"
---

# Multi-model Deep Research

I ran a small experiment today that I thought was worth sharing. I needed to run some deep research, accounting for operations data from the business. That gave me an opportunity to test how different models handle a detailed, context rich prompt informed by a fixed dataset and I was especially interested in messing around with Gemini 3 Pro "for real".

My first pass was simple. I handed the same prompt and dataset to three models requested a deep research-style analysis of the data and market. ChatGPT 5.1 stalled after several attempts. Claude delivered a strong outline but missed some basic facts. Gemini produced sharp analysis but lost important operational detail that Claude had caught. Each of them produced helpful parts, but none of them produced a complete or consistent answer.

So the challenge shifted from producing a meaningful analysis to how to extract the best material from each run and merge it into a single view, and to do so carefully without losing context, which gave me the idea to layer in a second stage. I gave a fresh instance two things. First, the full set of inputs used in the original prompts and second, the full set of reports that Claude and Gemini produced in the first go round. I intentionally presented the reports as written by someone else which made for a meaingful difference. Earlier runs had treated the reports as my own work, which muted the critique as the chatbot skewed toward agreeability. Once I made it clear that the reports came from an external source, the review became sharper and more useful.

Here is the core prompt I used with Gemini 3 Pro:

> You are a senior telcom market and competition analyst. I have received competing reports from two other analysts that provide differing perspectives on the market, competition and data. Evaluate the two reports I attached. Use the instructions and data I gave to the analysts, that they used to prepare their reports, as your baseline. Identify where each report is inaccurate, incomplete, inconsistent and also the strongest most compelling points from each. Resolve any conflicts and produce one set of recommendations in a detailed document. Your output should be precise, internally consistent, and supported with clear reasoning.

Long story short, the results were merely "okay". The merged output was clearer, more accurate, and more consistent than the individual runs but overall, the output lacked the depth of the two input documents, even with the benefit of the same context. After six different tries, with slight tweaks to the prompt each time, it still felt like I was reading a copy of a copy. For all of the extra effort, the extra steps don't quite seem to be worth it.
