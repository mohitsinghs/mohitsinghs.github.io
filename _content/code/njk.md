---
title: Story of njk, a tool mistreated
author: Mohit Singh
date: '2021-08-07'
excerpt: In 2014, I decide to build static websites for others in need, voluntarily. I didn't know much about web technologies but after a little research (googling ?) I found that static-site-generators were a thing.
---

In 2014, I decide to build static websites for others in need, voluntarily. I didn't know much about web technologies but after a little research (googling ?) I found that static-site-generators were a thing. I spent next few months teaching myself web stuff. Next, I was looking for a good static site generator to utilize this newly gained knowledge.

## From Jekyll to njk

I decide to use Jekyll ^[A static site generator written in Ruby.] and built those websites with it. Jekyll has a templating/markup language named liquid. I got familiar with markdown, yaml and templating languages. It was working fine until one day, I decided to move to something else due to some limitations.

required ruby along with ruby devkit which I really didn't like. I learned about gulp ^[A build tool written in javascript] and nunjucks, a templating language similar to liquid and decided to build old sites with these new tools. Node felt simple and easy to use.

After putting together a few gulp plugins to replicate Jekyll like structure, I was able to move away from Jekyll, but not completely, The plugin I used render nunjucks needed 3 other plugins in order to support front-matter and external data. This didn't feel right to me. I forked original rendered and added markdown and front-matter support to it. It got some community adoption and I learned that same problem was with a lot of other plugin users. I was happy that I helped others.

Soon after, I abstracted away my gulp-config as a module and named it njk. It was njk v1, a gulp config to build static-sites. After a while I wanted to optimize my slow build process and huge dependency tree. I rewrote njk as a command line tool to render nunjucks with markdown, front-matter and external data and released as njk v2. I deprecated the gulp-plugin after a while since I was no longer maintaining it and deleted afterwards.

## A tool mistreated

Fast forwards to some years, I kept maintaining njk since I was building all my sites with it. It got some adoption but wasn't much popular. By now, I was good enough in React and with time, migrated those sites to Next. njk was in good shape and in maintainence mode at this point. A few months ago, during a random lookup, I landed in a project that used njk as dependency. I got curious how they used it. What I found next was shocking. They used njk just to have nunjucks as a dependency. My guess was that njk sounded official and some people downloaded it instead of nunjucks library. It worked since njk was depending on nunjucks.

A facepalm later, I decide to dig deeper. After looking into some dependent projects, I found that most of them had njk but they intended to use nunjucks directly. It was okay that njk wasn't much used, but finding out that most of existing users were misusers was hilarious. They intended bananas but ended up with a gorilla with bananas and the whole circus around it ^[nunjucks is way lighter than njk since former is a library and later is a command line tool for specific job]

We are installing dependencies so mindlessly nowadays that something like this can happen frequently and I witnessed it in my previous job. I have no idea how to solve this and I've already stopped using that tool but if njk were a person, I can imagine him complaining - "They are doing weird thing with me".
