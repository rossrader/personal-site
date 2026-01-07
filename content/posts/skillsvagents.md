---
title: "Claude Code Skills vs. Spawned Subagents"
date: "January 6, 2026"
tags: ["Claude Code", "Agents", "AI", "Learning"]
excerpt: "Claude Code skills and spawned subagents solve the same problem—selective context loading, but for different architectures. One works inside a session, the other across processes."
readingTime: "3 min read"
---

I've been building an autonomous system using Claude Code. When I read about Claude Code skills - reusable prompt libraries with progressive loading - I wondered if they could help.

Spoiler alert - they can't. But the exploration taught me something useful about what I was already doing.

## How Skills Work

Skills are SKILL.md files that live in `.claude/skills/`. They're designed for interactive Claude Code sessions. At startup, Claude loads just the name and description from each skill's YAML frontmatter—around 30-100 tokens per skill. The actual instructions in SKILL.md only get read into context when Claude decides the skill is relevant. Reference files bundled with the skill load later still, only when Claude needs them for a specific task.

The value proposition is progressive disclosure. You can have dozens of skills installed and only pay tokens for the ones you actually invoke.

## Why They Don't Work for My System

My system spawns agents as separate CLI processes:

```python
cmd = [
    "claude", "--print",
    "-p", prompt,
    "--model", model,
    "--allowedTools", "Read", "Write", ...
]
subprocess.Popen(cmd, ...)
```

Each agent is a fresh `claude --print` invocation. Stateless. No session memory. All context arrives via the prompt string. The `--print` flag runs in non-interactive mode, so there's no progressive loading benefit.

Skills require an interactive Claude Code environment that maintains session state. I don't have one. My orchestrator is Python. Each spawn is isolated. Skills can't help here.

## The Realization

Despite the technical incompatibility, skills and my system solve the same problem:

**Reusable instructions.** Skills use SKILL.md files. I use AGENT.md files.

**Selective loading.** Skills auto-invoke when Claude matches your request to their descriptions. I use a `TASK_CONTEXT_REQUIREMENTS` dictionary.

**Domain knowledge.** Skills use a `reference/` folder. I use `hub/config/` and `hub/strategy/`.

I've essentially built a custom skills system for spawned agents. It just operates at the process level instead of the session level.

Here's what that looks like in practice:

```python
TASK_CONTEXT_REQUIREMENTS = {
    "write_content": ["strategy/pillars.md", "config/site.json"],
    "analyze_performance": ["config/site.json", "strategy/goals.md"],
    "deploy_content": ["config/site.json"],
    # 30+ more mappings
}
```

Instead of loading everything, each task type gets only the context files it needs.

## When to Use Which

**Use Claude Code skills when:**

You're working interactively. You want instructions to persist across conversations. You have domain-specific workflows—code review, PR creation, documentation. You want Claude to automatically invoke relevant capabilities based on your request.

**Use spawned subagents when:**

You need autonomous multi-agent orchestration. Agents need different tool permissions. You want programmatic control over dispatch. You're building pipelines where task A feeds task B feeds task C.

There's also a hybrid approach. If you're running an orchestrator from within Claude Code, you could use skills for the orchestrator itself while spawning subagents for the workers. The orchestrator benefits from skills; the workers don't.

There are probably other approaches too. I haven't learned them yet ;-)

## What I Learned

Skills and spawned subagents serve different architectures. Skills are single-session knowledge injection. Subagents are multi-process autonomous execution.

If you're building an autonomous agent system, you're already doing what skills do. Just at the process level instead of the session level. The concept of "load only what you need" applies to both. The implementation differs.

The lesson isn't that one approach is better. It's that both approaches exist because the underlying problem is real: context is expensive, and selective loading matters.

*For Anthropic's full comparison of Skills, subagents, Projects, MCP, and prompts, see their [Skills Explained](https://claude.com/blog/skills-explained) guide.*