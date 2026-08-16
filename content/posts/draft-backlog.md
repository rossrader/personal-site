---
title: 'Backlog, Not Spec'
date: 'August 15, 2026'
draft: true
---

# [Working title: Backlog, Not Spec]

[SCENE PLACEHOLDER: a specific recent moment. A demo, design review, or walkthrough where someone asked the question. Name the project if you can, or genericize it. Two or three sentences of texture: what you were showing, who asked, what they asked.]
Last [week/month] I was walking [someone] through [the new thing] and they asked the question I've heard a thousand times in one form or another: "What about [x]? What happens when this needs to handle [ten times the volume / the enterprise tier / the edge case that doesn't exist yet]?"
It's a good question. It's always a good question. That's the problem.
For most of my career, my instinct when I heard "what about x?" was to go back to my desk and absorb it. Redesign a little. Add the abstraction layer. Leave room for the future so it wouldn't surprise us. It felt like diligence. It felt like insurance.
This time I wrote it on the backlog and shipped what we had.

## The scar

[SCAR PLACEHOLDER: one real example from your history where you built for a future that never arrived. The shape you want: "Years ago we built [system/feature] to handle [anticipated scale or complexity]. [The future] never showed up the way we imagined it. But [the flexibility we added] did show up, in every estimate, every onboarding, every change we tried to make afterward." Two to four sentences. Specific enough to be believable, vague enough to be publishable.]
That's the pattern I eventually learned to see. Every contingency you absorb into a design becomes a constraint you carry. The future you insured against rarely arrives on schedule, or in the shape you guessed. But the cost of the insurance arrives immediately, and it compounds. Absorb enough contingencies early and the initiative doesn't fail dramatically. It just grinds. Every change touches three layers instead of one. Every new person needs a week longer to understand why things are the way they are.

## The trap is worse now, not better

Here's the part that surprised me. Build costs have collapsed and velocity is way up. You'd think that would make overbuilding harmless. Cheap to build, right?
It's the opposite. When building is cheap and fast, the temptation is to build the whole future now, because for the first time you actually can. That's the trap. Cheap to build is not cheap to carry. The abstraction you added in an afternoon is a tax on every afternoon that follows. [OPTIONAL: one sentence tying this to AI-assisted development specifically, if you want the post anchored in the current moment.]

## Small bets

So the question I try to ask instead is: what's the modest, high-probability bet I need to make today that pays off toward that long-term future?
Framed that way, "what about x?" almost never justifies a mitigation strategy. Most contingencies are side bets, and side bets you absorb into the design are side bets you're forced to keep funding whether the future shows up or not.
The sizing rule I use: pick the complexity that fits the horizon you can actually see. Early phase, that might be a few months of growth. Mid-size business, a year or two. [OPTIONAL: a concrete example of what this looked like on a current project, one sentence.]
Two exceptions, and they're not really exceptions because they're not bets at all. Security and reliability are table stakes. You don't size those to the horizon, you get them right from the start, because losing either one ends the game regardless of what else you got right.
Everything else: embrace the contingency questions, genuinely. They're a gift. But they go on the backlog, not in the spec. Build for now. Ship. Learn. Refactor when the horizon moves, because it will, and it won't move where you pointed.
Overbuilding used to be insurance. Now it's a bet against delivery.
