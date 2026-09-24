---
title: 'Rules, not clicks'
date: 'September 24, 2026'
tags:
  - ai
  - ideas
  - bss
  - governance
  - software
  - design
---

# Rules, not clicks

*Why approving every agent action isn't the control it looks like*

Glenn Stetson wrote a good [post](https://lnkd.in/p/dsc2Prcq) about AI agents in telecom billing. His argument, roughly, is that the agent should find the problem, pull the context together and recommend a fix, then a person approves it and the system does the rest. In his words, "Approval is a control. Execution is a cost."

I agree with most of it. An agent that reads the data but leaves someone to go do the work in three systems isn't saving much. Getting that person to just approve is a real step up.

Where I disagree is the idea that anything touching billing, identity or policy should always need a person to sign off. [In the comments, Glenn said](https://lnkd.in/p/dAhPMzT7) he was mostly thinking about large enterprise accounts, and there I agree with him - a major decision on a big B2B account is a good place for a person. But most billing decisions aren't that, and treating them all the same way is where the cost comes from.

I think a lot of that comes from the systems we run. Most older billing systems can't undo an action cleanly, can't limit how much gets done and can't tell you when something looks wrong. A person in the loop covers for all of that. It works, but it's a workaround for modern design.

It also works less well than we'd like to think. Anthropic says people [approve 97% of permission prompts](https://claude.com/blog/auto-mode-default-in-claude-code) in Claude Code. When they slipped a dangerous command into a study with 1,053 paid testers, people caught it 13.6% of the time, and only about 5% of the time once they'd seen 50 or more prompts. Coding isn't billing, but I doubt a busy support queue gets read more carefully.

And its not like the human interventions are working without rules either. A front-line rep can usually issue a credit up to a set limit, a supervisor can go higher and the billing system just won't let either of them do some things. That's policy enforced by software, and nobody calls it unsupervised. The trouble is that most of the rest lives in training decks and people's heads (which is exactly why we keep a person in the loop). Write it down in [a form the system can enforce](https://www.openpolicyagent.org/docs), and it constrains agents and people the same way. The agent can suggest the credit. The rules decide whether it happens.

That shared rule layer is where I'd put the work. Before I let an agent act alone on top of it, I'd want;

- limits on how much the agent can do per type of action (e.g. no more than $500 a day in credits)
- alerts when it starts doing something unusual
- an off switch we've actually tested
- people reviewing a sample of what it did after the fact
- a record of what it decided not to do, not just what it did (a wrong "no" is the hardest mistake to spot)

The review matters because rules and limits don't catch bad calls inside them. A $40 credit for the wrong reason is still wrong, and nobody notices until Finance does.

The worry I hear most is scale. If someone approves a bad credit, that's one bad credit. If a rule is wrong, the agent can repeat that mistake thousands of times before anyone notices (which is why I'd never skip the limits or the off switch).

Regulation comes up a lot too, and much of it already reads like a rule a system could enforce. In Canada, the CRTC's [Internet Code](https://www.crtc.gc.ca/eng/archive/2021/2021-177.htm) only lets an ISP disconnect for non-payment when the customer owes more than $50 and has been past due for more than two months. Rules like that call for a control and someone accountable for it, not a person approving each item.

I'd get there one action at a time. Start with approval on most everything. Then check what the agent did against what actually happened later - reversals, refunds, customers calling back. Override rates help too, but after a few weeks of reflex approvals they'll look better than they are. When the outcomes hold up long enough, let that action run on its own (and move it back when they don't). The same agent can add account notes by itself and still wait for a yes before disconnecting a business customer (Glenn's enterprise case, and a good one). Even Anthropic, with its automated mode on by default, still [recommends reviewing](https://claude.com/blog/auto-mode-default-in-claude-code) high-stakes production changes yourself.

People don't go away in this. They write the rules, handle the odd cases and check the work. That's also where they review best. In the [same Anthropic data](https://claude.com/blog/auto-mode-default-in-claude-code), people rejected 39% of the plans Claude proposed but only 3% of individual permission requests. We're good at judging the plan and bad at judging the click. So let's stop asking people to approve every credit one by one.
