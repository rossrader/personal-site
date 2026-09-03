---
title: Dumb Won
date: 'September 3, 2026'
tags:
  - ai
  - ideas
  - telecom
  - dinosaurs
excerpt: >-
  AI is moving to the edges, so the middle needs to get smarter and cost more.
  Not really.
---

# Dumb won

The internet was built on an important idea: the network moves bits and stays out of the way, and everything interesting happens at the ends. It works. That architecture beat every smart network the phone companies built to compete with it. But every few years someone argues the deal has run its course and the network needs to get clever again. 

This week, AI is the pretext.

Two industry reports make the case. [CTIA's "Wireless & AI"](https://www.ctia.org/news/wireless-ai) says AI is leaving the data centre for phones, sensors, drones and factory floors, that AI traffic will grow three times faster than everything else and reach a third of all broadband use by 2034, and that the fix is a 6G network with intelligence in the radio layer to allocate spectrum, predict congestion and authenticate devices on its own. The [Canadian Telecommunications Association](https://canadatelecoms.ca/canadas-connectivity-future-depends-on-sustaining-investment/) supplies the other half: wireless prices fell 45% since 2020, investors have noticed, and regulators should ease up on pricing and wholesale access so carriers can afford to build it.

In other words, intelligence is moving to the edges, so the middle needs to get smarter and cost more. Only the first part is true, and not in the way the reports think.

## A world of ends

[Dave Weinberger](https://weinberger.org/) and [Doc Searls](https://doc.searls.com/) [gave the idea its name](https://web.archive.org/web/20040331183105/http://worldofends.com/) in 2003. Nobody owns the internet and nobody runs it. It's an agreement among everyone connected to it, with one term: carry the bits from one end to the other and don't look inside. That term is what puts the value, the applications and the intelligence at the ends. A network that doesn't care what it carries lets anyone build anything on it without asking. Permissionless innovation.

That's why the internet won. The phone companies had intelligence in every switch and a business built on knowing what crossed the wire. They lost to a network that knew nothing and carried everything.

## Ends aren't devices

The CTIA report pictures a model running inside every sensor. That doesn't make sense.

Nobody puts a DNS server in a thermostat. The thermostat asks a resolver down the hall. The resolver is local, fast and an end of the network. Two ends share the job. The internet has worked this way for 40 years. Services sit near the things that use them.

AI at the edge works the same way. The sensor reports a number. A box on the shop floor, or at the base of the tower, thinks for a few thousand sensors at once. That box is the end. Copying the model into every device is the expensive way to do it. Each one needs the compute to run it and the plumbing to keep it current, and the payoff on the wide-area network is nothing, because the raw data was never going to cross it either way.

Once the intelligence lives in a local service, most of the traffic in that forecast never leaves the building. What leaves is a summary. The network-buckling forecast assumes the one architecture nobody who builds these systems would pick.

## "AI-native" is the smart network again

An AI-native network inspects traffic, ranks it, decides which devices to trust and allocates capacity based on what it thinks is happening. Each of those is the network making a decision about someone else's application.

It's the smart network back under a new name. A toll booth that reads your plates. Whoever owns it decides what moves and what waits, and we know how that ends because we watched it end once. Don't spend time trying to understand it further. It's a control function for a network architecture that already lost.

Video was going to break the network. Then mobile. Then IoT. Then 5G. Now AI. The technology in the pitch changes. The ask at the end never does.

## What to build instead

Traffic is growing. Networks need capital. Neither needs a word about intelligence in the radio layer.

Build capacity. Push fibre as deep as it goes. Separate wholesale from retail in law, and open the wires to anyone who can pay a fair, cost-based rate, because competition at the ends is the only thing that has ever made the middle bigger. Keep the network dumb. Put the services next to the things that need them.

Let the edges be clever. There's still good money in running a utility.
