---
title: "Exploring Semantic MCP"
date: "March 4, 2026"
tags: ["mcp", "ai", "ideas"]
excerpt: "I built an MCP server with zero API keys, zero databases, and zero state. A static file and five functions. It works better than it should."
readingTime: "5 min read"
---

# MCP as a semantic layer

Most MCP servers connect AI to things it can't reach on its own. Send a Slack message. Create a GitHub issue. Query a database. The tools add capability.

There's a second kind of MCP server that nobody's really building yet. One where the AI *could* do the work itself, but the tools make it reason correctly instead 
of probably.

## Capability vs. meaning

You could hand an AI a JSON file full of reference data and say "figure it out." It will parse the schema, invent heuristics, cross-reference fields, and produce a 
plausible answer. It might even be right. But it's doing that from scratch every time, with no guarantee it interprets the data the way a domain expert would.

Wrap that same data in a thin set of tools, and something changes. The tools don't add new information. They add judgment. Priority order for evaluating conflicts. 
Ranking logic built on real-world experience. Labels that distinguish "technically claimed but safe to use" from "do not touch."

The AI goes from reasoning probabilistically to reasoning reliably. Not because it gained a new capability, but because the tools reduced its cognitive load the 
same way a good API reduces a developer's.

## The experiment

I built [KeyGap](https://keygap.app) to test this. It's a keyboard shortcut availability tool: pick your platform, pick your apps, see which hotkey combos are still 
free. There's an interactive web UI and an MCP endpoint, both served from the same Cloudflare Worker, both reading from the same shortcut database.

I should be clear about what KeyGap is not. It's not a comprehensive shortcut reference. [keycheck.dev](https://keycheck.dev) already does that far better, covering 
1,400+ shortcuts across 100+ apps with community contributions. KeyGap covers 12 apps. It's a toy by comparison.

The point was never "can I build a better shortcut tool." The point was: what's the narrowest expression of an MCP server that creates semantic value? How little 
data and how few tools can you get away with and still produce something that makes an AI more reliable than its training data alone?

The answer: a single TypeScript file of curated data, three query functions, and good tool descriptions. One Cloudflare Worker, zero databases. The HTML is a big 
self-contained file. The data module is a big static object. Neither is elegant. But the constraint was deliberate. I wanted to find the floor, not the ceiling.

## What the tools add

The shortcut data in KeyGap is roughly 300 lines of TypeScript. An AI could read the raw JSON and cross-reference it. But the tools encode things the data alone 
doesn't express.

`suggest_hotkeys` doesn't just filter available keys. It ranks by ergonomic comfort, because a human figured out that Cmd+Ctrl is a natural 
left-thumb-plus-left-pinky reach while Cmd+Ctrl+Shift requires three fingers and falls apart at speed. That judgment isn't in the data. It's in the function.

`check_key` doesn't just look up a value. It cascades through OS-level claims, then app claims, then risky-but-probably-fine status, in that priority order. The 
ordering reflects how shortcut conflicts actually work. Give an AI the raw data and it might check app claims first, or treat "risky" the same as "taken."

The tools are opinions encoded as functions. The data is facts. The tools are facts plus judgment.

## What a real version looks like

KeyGap is the narrow version: hand-curated data, small scope, single file. A broader take on the same idea would pull from something like keycheck's 
community-maintained database, covering hundreds of apps instead of twelve. The tools would stay thin, but the ranking logic could get smarter: weighting by app 
install base, factoring in user-reported conflicts, scoring ergonomic comfort based on actual hand geometry research rather than my rough notes.

The web UI and the MCP tools would diverge further. The UI could become a full shortcut explorer with search, filtering, and contribution flows. The MCP tools would 
stay focused on the three questions an AI actually needs to answer: what's free, is this specific combo taken, and what do you recommend.

The architecture stays the same. Static data, thin query layer, two interfaces. The investment shifts from code to curation.

## Other approaches

Static data plus tools is the simplest version of a knowledge server. It's not the only one.

**Retrieval-backed.** The tools query a vector store or search index instead of holding everything in memory. You'd need this for something like npm's full 
dependency graph or the CVE database. More infrastructure, but it scales.

**Computed.** Some domains need to calculate answers, not look them up. A color contrast checker doesn't store every possible color pair. It computes WCAG 
compliance on the fly. The judgment is in the algorithm, not the data.

**Hybrid.** Static reference data combined with live lookups. A browser compatibility server might embed curated "safe to use" thresholds but fetch current support 
percentages from caniuse at query time. Static layer for opinions, live layer for facts.

If I were building another one of these, I'd probably start with hybrid. The static data keeps the tools opinionated, and the live lookups keep them current. But 
the pure static version is where I'd tell anyone to start, because it proves the concept with zero infrastructure risk.

## The pattern

Three things make this work:

**Curated data, not just structured data.** A CSV is structured. A curated dataset includes editorial judgment: risk assessments, quality ratings, "this is the one 
you actually want" designations. The curation is the value. The tools are just delivery.

**Domain logic in tools, not left to the AI.** Anywhere you have reasoning that an AI would otherwise hallucinate, put it in a tool. The tool doesn't prevent the AI 
from thinking. It prevents it from guessing where guessing is unnecessary.

**Two interfaces from one source of truth.** Humans get a visual interface optimized for scanning and pattern recognition. Machines get MCP tools optimized for 
structured queries and parameter validation. Neither wraps the other. They're parallel projections of the same data.

## Where it breaks down

This doesn't work when data changes faster than you can redeploy, when the dataset outgrows memory, or when domain experts genuinely disagree on the right answer 
(encoding one opinion in a tool is limiting).

But for small, curated, slowly-changing reference data where cross-referencing is tedious and judgment matters? A static file and five functions might be all you 
need.

The current MCP ecosystem is almost entirely integration servers. I think there's a lot of room for knowledge servers. Not *"connect me to a thing"* but *"help me 
reason correctly about a thing."* The bar is lower than people think. No API keys, no database, no state. Just curated data, a few functions, and well-written tool 
descriptions.
