---
title: On frontend tooling
author: Mohit Singh
date: '2021-08-21'
excerpt: One thing I keep saying to people, Love it or hate it but it's still in your mind.. Same happens with me and frontend tooling. When I started creating websites and was recovering from my android madness, the state of frontend tooling was way more complex than today.
---

One thing I keep saying to people, "Love it or hate it but it's still in your mind.". Same happens with me and frontend tooling. When I started creating websites and was recovering from my android madness, the state of frontend tooling was way more complex than today.

## Too many tools

There were a lot of tools to do the same job. I didn't know what to learn and what to ignore, so, I went through almost all of them, one by one. It took so long, that some of them lost their fame when I finished.

Since then, I was hoping that tooling for frontend should not be written in JavaScript. Now, don't get me wrong ? I know there are a lot of excellent frontend tools written in JavaScript, but most of them are heavyweights.

To give you perspective here are some tools and their installations size when using npm &mdash;

| Tool                         | Install Size | Packages |
| ---------------------------- | -----------: | -------: |
| **jest**                     |          45M |      327 |
| **webpack** + **dev-server** |          42M |      297 |
| **eslint**                   |          18M |      114 |
| **@babel/preset-env**        |          19M |      155 |
| **postcss** + **preset-env** |          34M |      101 |
| **postcss** + **tailwind**   |          54M |      133 |

and the list goes on for countless libraries and tools. Some abstractions, like official build tools for frameworks break every limit &mdash;

| Tool        | Install Size | Packages |
| ----------- | -----------: | -------: |
| **react**   |         322M |     1903 |
| **next**    |         177M |      525 |
| **angular** |         406M |     1325 |
| **vue**     |         176M |     1326 |

For almost every framework we have or editor integrations we use, there is a dependency hell of node-modules and a lot of bus-factor dependencies waiting to break things if we ignore maintenance burden, burnouts, competitions, disk-space and network uses.

Another concerning thing is, any of these might phone home without informing us, compromise our systems, steal secrets or just annoy us by doing mindless and funny things. This isn't even a speculation and is something we are already facing a lot. I'll rather have single point of failure than being afraid of which of 2000 dependencies are being rouge.

My points are &mdash;

- They all can be much faster and better when written in something like Go and Rust.
- We will save ourselves from the JavaScript jungle we download with these tools.
- This will raise the barrier of entry to write a another tool. So, focus on existing tools will make them better with time.
- This will improve security and stability since we will no longer wait for a huge chain of dependencies to break.

## The way out

Tools like **Vite** (uses **esbuild**), **esbuild** (Go) and **swc** (Rust) have made situation better for Javascript and by switching to these or using these as better foundation can lead us to minimal and fast tooling.

For writing CSS though, we still don't have better tools except `sass`. For writing modern CSS, you need `postcss` with `postcss-preset-env` which requires you to have 100+ plugins ignoring cli or companion tool to use these. For `tailwindcss`, you need 130+ packages costing 54 MB disk space. Writing and maintaining these tools requires a great amount of time and effort. Writing something like these in Go or Rust requires even greater effort and reinventing some wheels.

I didn't even mentioned other things like testing or linting tools, which will further reduce time of interaction while writing code. Writing these requires time and patience along with knowledge but the time it will save for frontend developers will be much greater. This will also reduce the number of alternatives and hence confusion of choice.

## Conclusion

My pet peeve among these are CSS tools. `postcss` is by far, the best thing happened to CSS tooling. I played a lot with `sass` and `css-in-js` in past but I no longer like those approaches. I'm [using tailwind](/code/no-tailwind) a lot these days, Something like a version of tailwind written in Go or Rust will help me. And for those thinking, "Why hope someone else to do it for you ?", While I'm hopeful that others might do this, I might end up writing something like that myself If I get time from a dozen of other fields my brain drags me into.
