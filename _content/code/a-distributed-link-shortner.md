---
title: A distributed link shortener
author: Mohit Singh
date: '2021-09-04'
excerpt: In my post about building building link-shortener, I discussed about how I attempted to build a fully functional link shortener. That worked well but I was left with several questions during my previous attempt.
---

In my post about building [building link-shortener](/code/building-a-link-shortner), I discussed about how I attempted to build a fully functional link shortener. That worked well but I was left with several questions during my previous attempt &mdash;

- I never finished the dashboard despite of entire system being ready. With so many open source visualization tools ^[like metabase, superset, redash etc], do I really need to build a custom dashboard ?
- It was hard to scale and was still prone to collisions. Is there any way to have a faster but complete collision free system ?
- Bloom-Filters did a good job, but is it a good generate IDs at request time ?

There were several other questions as well and above all, I wanted to make this scalable. So, let's see how far I explored.

## Breaking into pieces

After some thinking and punching through walls, I came with a seemingly distributed architecture. I decided to remove authentication and custom dashboard and planned to use external tools directly connected to database for visualization. My architecture has three services &mdash;

- **Generator** - The job of this guy is to generate IDs and pass them to those who request.
- **Director** - This one directs people to correct links and passes their information to our timeseries database.
- **Creator** - This one is for handling creation and other modifications of short links.

### Generator

The one took longer than I expected. It further contains several pieces &mdash;

- **Bucket** - A custom data-structure which contains a two dimensional slice for holding IDs, the fist dimension is for number of buckets and second is for capacity and a synchronized map to keep record of bucket states.
- **Bloom** - A thread-safe wrapper around bloom-filter implementation I was using.
- **Factory** - The primary pieces which exposes gRPC method to retrieve one bucket full of IDs at time and fills buckets as they get empty

Now, this service keeps generating IDs as we request more IDs from It. This way, we always end up with enough pre-generated IDs with no collisions.

To scale it, we can make our bloom-filters distributed and use gRPC for it's operations, but for now it works well even for generating millions of IDs in my limited testing.

### Creator

Most of the code from old monolith was reused to build this. Although, I had to introduce several new pieces to make it horizontally scalable &mdash;

- **Ingestor** handles batch insertion of created links based on a limited and a timed fallback.
- **Reserve** keeps a bucket full of IDs and when a bucket gets empty, it calls the generator to request new bucket through gRPC.

With a request handler combined with this, I fired `wrk` only to find that I had several collisions. Since slices don't always modify internal array in heap, I suspected that my slice operation on bucket was concurrent causing it to return duplicate IDs. A mutex later, it was fixed and then came another issue. Several IDs were failing to generate. It was easy to spot as the number of failed requests was same as no of requested bucket. I added some delay in main request when bucket was requested. Now, every request was processed without failure.

The system was able to create 7-8 Million links during several one minute tests. It was a huge improvement over my previous attempt which could only generate around 2-3 Million links in a minute with same resource usage. Added benefit with this is that I can scale this service horizontally along with some database replicas or by switching to Cassandra or Scylla.

### Director

Director was rather simple since it was already independent of rest of the system. All I had to do was to decouple it from old monolith. After adding redis as caching layer over postgres I was able to double request handling. I excepted better but perhaps running everything on a single system for wasn't a good idea for this test.

The good is that this too scales horizontally, So all we need to is to grow machines and instances to handle more requests.

## Conclusion

The code is [open source](https://github.com/mohitsinghs/wormholes), so you can always have a look but it's lacking pieces like k8s config at the time of writing. I am still curious what other ways are there to make this even more fast and reliable. I sticked to postgres and timescale but for huge traffic, I wonder how Cassandra, Scylla and Druid will perform compared to these. I learned a few memory and optimization techniques during this and witnessed my failures multiple times. Learning is a continuos process like workout. We can never expect to get done either.
