---
title: Not The Tailwind Way
author: Mohit Singh
date: '2021-07-25'
excerpt: I love Tailwind and it solves a lot of pain points I had writing CSS. The problem is, it pollutes my HTML well beyond refactoring and I've to be lucky to get something broken fixed.
---

I love Tailwind, and it solves a lot of pain points I had writing CSS. The problem is, it pollutes my HTML well beyond refactoring, and I've to be lucky to get something broken fixed.

## Partially Broken Animations

Recently, I was trying to use combined animations, and they didn't work. After some trial and error, I found that keyframes were missing. I created an issue on their GitHub repo. Meanwhile, I was trying to figure out what's wrong with it.

It turned out their internal plugin for animations, which was working in v1, was broken in v2. The culprit was this line.

```js
let { name: animationName } = parseAnimationValue(value)
// So this means parseAnimationValue is always an object
```

Raw animations were being parsed, and their value was being extracted in an `js-->Object` for processing. So, `js-->parseAnimationValue` should return an `js-->Object` containing `js-->name`, but the declaration of this function said otherwise.

```js
export default function parseAnimationValue(input) {
  // ... some parsing work
  return animations.length > 1 ? result : result[0]
}
```

According to the declaration, for combined animation, it returns an `js-->Array` of animation `js-->Object`. So, I tried fixing it, which took a few minutes, and created a pull request with tests.

At this point, I was hoping that in the worst case, I'll get some kind of feedback on how impractical my solution was. After a week, my pull request was still in black hole. So, I simply closed it thinking maybe they don't care, and since my animations were defined in CSS by now. I moved on with life.

## Broken syntax highlighting

So, to reduce class pollution in HTML, I decided to use tailwind in CSS directly. Since, I was planning to redesign my website, I decided to apply it there. Tailwind bundles `postcss-nested` which is `sass` like syntax for `postcss`. Highlighting for this was broken in both VSCode and VIM. Before tailwind, I was using `postcss-preset-env` which included stage 1 implementation of css-nesting spec called `postcss-nesting`. Tailwind supports that. So, I quickly installed it and did necessary changes.

```js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting')(require('postcss-nesting')),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
```

The Next build system started to complain that I can only use strings as plugin. Passing this plugin as options didn't work either. The syntax highlight was working great, but my build itself was broken.

## Down the rabbit hole

I decided to fork tailwind and use my fork directly from GitHub. I did and applied my changes as well. Next was `postcss-nesting` so, I made that one default in tailwind. I wanted my changes to be as minimal and as isolated as possible so that merging from upstream will be easy. I found out, no matter what nesting plugin I use, for styles defined in config, tailwind uses `postcss-nested`. After adjusting tests and fixing other bugs, there were still two reasons causing my version to break. `postcss-nesting` didn't support bubble of custom at rules, and the CSS resulted from it has semicolons removed. Luckily, that plugin was very simple, so I added bubbling support for tailwind at rules, fixed semicolons and ported tests to jest.

Next was the battle of `commonjs` vs `esm` and the build. It took a while to add fallback in imports and fixing broken stuff due to this. My fork was still unusable since npm published version had transpiled commonjs modules. I didn't want to use npm, so I decided to publish build files in an orphan branch. With some git tricks around worktree, I was able to put together a branch with transpiled modules. A deployment script later, I was finally able to use my fork while still being able to rebase with upstream.

## Conclusion

So, while I'm still using Tailwind, I no longer do it the tailwind way, but everything works smoothly now. Instead of doing `bash-->yarn add tailwindcss` I can do `bash-->yarn add mohitsinghs/tailwindcss#x` and on the top of that I can finally fix things without my pull request in black hole. Investing a day or two to save weeks of waiting on fixes is a better way to learn things we use.
