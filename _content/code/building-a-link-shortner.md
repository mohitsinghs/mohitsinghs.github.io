---
title: Building a link shortener
author: Mohit Singh
date: '2021-07-26'
excerpt: A while back, I was asked to write a link shortener for a startup. It took me a day to come up with a production ready version but I warned them about collisions and other possible limitations.
---

A while back, I was asked to write a link shortener for a startup. It took me a day to come up with a production ready version, but I warned them about collisions and other possible limitations. I used [nanoid][nanoid] to generate IDs. They asked me to use Mongo along with Express, and I did so. Not the best choice due to limited opportunity of optimizations.

Fast-forward a few months, that link shortener was performing well on a two core ec2 instance. I left that startup later, but one problem that stuck with me was collisions. They used to face errors due to collisions. Collisions increased with time, having some business impact.

## Rebuilding

Later, I decided to write an open source link shortener. I picked [Fiber][fiber] (Go) and PostgreSQL instead of Express and Mongo ^[A database that I try to avoid]. After some hours, I had a working link shortener, which was already faster and reliable than what I created previously. I still had to fix a few things &mdash;

- Reducing lookup time
- Minimizing failures
- Increasing creation speed
- Increasing retrieval speed
- Adding analytics

## Reducing lookup time

Database lookup before creating every link was problematic. I decided to fix it first. After some digging, I came across [Probabilistic Data Structures][pds]. The possible candidates were [Bloom Filters][bf], [Cuckoo Filters][cf] and [Quotient Filters][qf]. After some testing and thinking, I picked [Bloom Filters][bf].

When I was looking for implementations, I found out that **Bitly** had [one old implementation][dablooms] in their GitHub repo ^[Which I guess how they solved it too. Not sure if they still do the same]. I used [bloom][bloom] after writing a thread-safe wrapper around it. By using that to lookup before generating IDs, the lookup time reduced significantly.

## Minimizing failures

When [Bloom Filters][bf] helped reduce lookup time, I figured out that I can utilize this reduced lookup time to minimize failures due to collisions. I implemented a recursive fallback ID generator with limit. Now, failures due to collisions were reduced, and this link shortener was almost fail-safe, yet much faster than previous one.

By now, I implemented a way to back up and restore these bloom filters. In case of missing backup, I generated bloom-filters from database.

## Increasing creation speed

Since I was no longer using the database for checking the existence of an ID, the only db query left was `create` query for link. Upon thinking about ways to speed this up, goroutines came in mind. I created a worker to queue and batch insert IDs. Now, for every link creation request, the link data was pushed in batch with the help of channels and since there was no collision of generated ID. This approach worked, and creation speed went up by a few times.

## Increasing retrieval speed

Now that my link creation speed was way higher than retrieval, I wanted to optimize retrieval too, but I was limited by db connections. I tuned my PostgreSQL instance to have around 3000 connections ^[Since, just bumping `max_connections` doesn't work. I used [PGTune][pgtune] to generate config for 3000 connections.]. This worked, but retrieval wasn't that fast. It still isn't, but the possible solution is to put these ID link pairs in Redis and use that. The insertion can be done on startup ^[Any better ideas ?].

## Adding analytics

Since the real benefit of link shortener for businesses was to extract data and analyze traffic from these links. I decided to implement that too. I was already getting IP and User-Agent. All I needed was a user-agent parser and an IP info parser. I found [a good parser][ua] for user agents and used [GeoLite2][geolite2] from MaxMind to parse IP info. Since every click had info, I decided to implement a worker pool and sent data there for paring and batch ingestion to avoid request slowdowns.

As I've interacted with almost every popular TimeSeries Database, I picked [Timescale][ts] since it was already PostgreSQL based and was fast enough. ^[I admit there were better choices and [Druid][druid] is my favorite, but this was a self-contained system and not a cluster-mess [Druid][druid] is and because I wanted to use [Timescale][ts]]. The workers ingested events fine, and I had a good amount of data-points for every single click.

## Going crazy

At some point, I thought about generating all IDs beforehand, randomizing them and using that to create links. No collisions at all. That could be stored in a few GB. I had some other crazy ideas, but I avoided them for now.

## Conclusion

I named this after **Wormholes**, the imaginary links between two distant points in space. This system is still not finished. More databases can be supported, and analytics data can be rendered beautifully to make this a production ready and reliable system, but I'm already building something else and will come back to this later.

[nanoid]: https://github.com/ai/nanoid
[fiber]: https://github.com/gofiber/fiber
[pds]: https://en.wikipedia.org/wiki/Category:Probabilistic_data_structures
[bf]: https://en.wikipedia.org/wiki/Bloom_filter
[cf]: https://en.wikipedia.org/wiki/Cuckoo_filter
[qf]: https://en.wikipedia.org/wiki/Quotient_filter
[dablooms]: https://github.com/bitly/dablooms
[bloom]: https://github.com/bits-and-blooms/bloom
[pgtune]: https://pgtune.leopard.in.ua/
[ua]: https://github.com/mssola/user_agent
[geolite2]: https://dev.maxmind.com/geoip/geoip2/geolite2/
[ts]: https://github.com/timescale/timescaledb
[druid]: https://github.com/apache/druid
