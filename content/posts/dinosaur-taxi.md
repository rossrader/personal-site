---
title: 'One day, a dinosaur took a taxi to the observatory...'
date: 'August 22, 2026'
tags:
  - telecom
  - ip
  - e2e
  - asteroids
  - dinosaurs
excerpt: >-
  Once you strip away everything already routed around at the edge, a telco's
  balance sheet is government paper and civil works. So why does the industry
  keep funding strategy engagements about capturing value from technologies it
  didn't build? Telcos don't hire consultants to learn where the value went;
  they hire them to be told slowly.
featured: true
---

Telecom and its attendants are having their periodic conversation about how to monetize the network in the face of new technology. The new technology is always something built in the open, on open protocols, with permissionless entry, arriving from outside the industry and owing it nothing. And the telecom posture is always the same too, a defensive crouch dressed up as a strategy, asking how to extract value from a thing it didn't build, can't control, and wouldn't have permitted. This time it's "agents." Before that it was cloud, before that OTT, before that Internet Protocol itself.

The focus rotates. The conversation doesn't. It has the mechanics of a near-Earth asteroid: a known orbit and a return date anyone could calculate, though the people funding the observation campaigns never seem to. Every few years it swings back into view wearing a new designation, as if it were some newly discovered object rather than the same old rock on a known ellipse. The industry press excitedly tracks its approach, analysts publish trajectory estimates, and consultants are retained the way governments retain astronomers: to watch something whose path was settled long ago, reporting, gravely, that it is still coming. Then it makes its close pass, failing, as always, to make an impact. The headlines peak, it recedes, and everyone stands down until the next perihelion, when the object will be rediscovered, renamed, and greeted with the same surprise and concern.

I'm not going to engage with this cycle's planetary threat. What follows isn't an argument. Arguments are for open questions. This is a rundown of the orbital mechanics: mass, velocity, trajectory, all measured decades ago, and understood well enough to say exactly what happens next. The math hasn't changed in twenty-five years, and it isn't going to change now.

## The end-to-end principle already settled this

Internet Protocol makes a simple architectural claim: the network moves packets between addresses, and intelligence lives at the endpoints. Identity, trust, state and application logic belong to the edge. The network's job is to be fast, boring, and dumb. Everything else follows from this.

This design won conclusively because a network that doesn't need to understand the applications running over it can carry applications its designers couldn't conceive. The smart network can only do what its creator planned for. The dumb network can do most anything.

Telcos built smart networks, but for decades smart was the only option available. A telephone was the dumbest terminal ever shipped, a microphone, a speaker, and a bell, so intelligence had to live in the core: switchboards, then switches, then the databases that still know who you are, where you are, what you've subscribed to, and whether your SIM changed last Tuesday. That knowledge lives in the core because for a hundred years there was nowhere else to put it. And it worked.

Then the alternative arrived. Compute reached the edge, packets reached the middle, and the smart network quietly changed from an engineering necessity into a commercial position. The intelligence in the core was the meter, and the meter became the business model. So when the choice came, ATM versus IP, the Intelligent Network versus the stupid one, the telcos didn't pick wrong, they picked revenue. The architecture had become a toll booth.

But the toll booth fell to code. Everything the smart network was designed to deliver got eaten by software. Voice became an app. Messaging became an app. The smart network became transport for apps, and revenue per bit has been falling ever since.

## The assets are artifacts

Here's the part telecom still resists. The capabilities they're packaging as network APIs, identity, location, reachability, fraud signals, are all artifacts of the losing architecture. IP is indifferent to all of it, those features live at the edge. The smart network knows where you are because a smart network has to know where you are. Subscriber location is a product roadmap and a regulatory hazard in the same API. The asset is the liability.

Look at the most commercially promising of these smart network APIs: SIM swap detection and number verification. They're valuable because the world foolishly built authentication on phone numbers, with SMS one-time codes as the duct tape. That only happened because the smart network made the phone number a de facto identity token in the first place. The fraud-signal APIs are the telcos selling a patch for a vulnerability their own architecture created. They're collecting rent on their failure modes. And the actual future of authentication, passkeys and device-bound credentials, routes around the phone number entirely. So the asset comes with a built-in decay curve.

And even the capabilities that sound like physics are just the result of the choice to build a toll booth. There's a defense of the smart network that goes like this: fine, identity can live at the edge, but the network must track devices, because paging is physics. You can't ring a phone or send an SMS without knowing which towers to route it through. Mobility itself requires the network to know where you are.

But then why does iMessage work over WiFi?

The rendezvous problem got solved at the application layer. Your device holds a persistent connection to Apple's push infrastructure, registers itself with a service it chose, and when a message arrives, Apple's servers know which connection to poke. No location register, no paging channel, no subscriber database anywhere in the transport. Identity lives in Apple's keys, and the underlying network, fiber, WiFi or cellular or whatever, is pure dumb pipe. What looked like physics was a power budget. Cellular paging exists so an idle radio can sleep while the network tracks it, which is a real engineering tradeoff, but it's an optimization. The device can pay a small keepalive cost instead, and reachability becomes a service owned by whoever the endpoint trusts.

And in the working example, Apple owns the rendezvous point. The carriers had SMS, the flagship smart-network messaging service, complete with the subscriber database. Apple built messaging on dumb transport with identity at the edge, captured the customer, and turned SMS into a fallback protocol for green bubbles. Every layer the telcos propose to monetize has already been routed around at least once by someone building at the edge.

## Scarcity in the air

But surely, whatever happens up the stack, telcos own the genuinely scarce stuff: spectrum and trenches. Right?

Spectrum scarcity is about maintaining property rights. WiFi runs on unlicensed spectrum, no auctions, no exclusivity, devices self-coordinating through listen-before-talk and power limits, and it carries the majority of the world's data traffic.

The most economically productive spectrum on earth is the spectrum nobody owns.

Exclusive licensing of radio frequencies is a 1927 solution to a 1927 problem: dumb radios couldn't distinguish signals, so the state assigned frequencies like land parcels. Modern radios do beamforming, dynamic frequency selection, and interference cancellation with compute to spare.

And although smart radios shrink the problem, they can't abolish it. Airtime in a crowded band is still finite, and when it saturates, someone has to yield (Shannon doesn't negotiate). But the internet's whole lesson is that this kind of coordination can be a protocol instead of a property right, with yielding enforced by shared rules, not exclusive license.

The only reason spectrum doesn't get that treatment universally is that auction revenue is a fiscal drug for governments and license value is a balance sheet item for carriers. Both sides of the transaction are addicted to artificial scarcity. And the addicts have enablers. Every time the commons threatens to expand, the incumbents arrive waving interference studies: broadcasters and wireless microphone vendors fought TV white spaces for years claiming Broadway and the NFL would go silent, and the auto industry sat on 5.9 GHz for two decades of vehicle-to-vehicle vaporware. Each carve-out gets defended as physics when it's actually rent. A spectrum portfolio carries value like a stack of taxi medallions the week before Uber comes to town.

Trenches are genuinely scarce, but the scarcity is generic. Rights of way, permitting queues, pole attachments, the cost of cutting pavement. That's civil engineering, available to anyone with capital and patience, and it constrains every IP network equally. I work for a fiber ISP. Our moat is that the conduit is in the ground and the second entrant faces the same construction economics with half the addressable market. That's a real and durable position, and it earns utility returns. Nobody I work with pretends the trench entitles us to a share of Netflix's margin.

But look at what's left of the whole portfolio. Identity, location, reachability, fraud signals: all disintermediated at the edge. Spectrum exclusivity: a regulatory artifact, disproven by the unlicensed bands. Trenches: real, generic, utility-priced. What remains on the telco balance sheet is government paper and civil works. Everything that looked like a technology advantage has been eaten, exactly on schedule.

## The installment plan

Which brings us back to that pesky asteroid and why it keeps coming back.

Every carrier executive already knows this history, just like we do. Hence the recurring strategy engagements about monetizing the network in the [current noun] era: telcos don't hire consultants to learn where the value went; they hire them to be told slowly.

Their core business is a utility.

A conclusion that's unbearable at full speed for telecom ears. They've spent nearly forty years trying to escape that truth. The growth narratives are decoration, the headcount is sized for a company that no longer exists. A transformation program, with its phases and workstreams and 2028 horizon, converts an unbearable present-tense sentence into a bearable future-tense project. The McKinsey deck is an installment plan: it amortizes the truth the client already possesses at a rate the org chart, the unions, the dividend, and the executives' remaining tenure can absorb.

That's why the conversation is orbital. Each new noun resets the amortization schedule. AI agents are simply the current installment.

None of this means the network stopped mattering. Packets still need to move, and moving them well is honest, necessary, albeit capital-intensive, work. It means the value of the network is the value of transport, utility-priced, and every attempt to charge platform margins for utility assets ends the same way: with the platform built by someone else, on top, at the edge, exactly where the protocol said the intelligence would thrive.

IP was a verdict. Telecom has spent twenty-five years appealing it, one noun at a time.
