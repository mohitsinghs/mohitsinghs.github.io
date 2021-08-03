#!/bin/env bash
SITE_URL="mohitsingh.in"
OUT_DIR="./out"

# build site first
next build
# now export static content
next export

# a .nojekyll file to inform github pages that
# it's not a jekyll site
touch "$OUT_DIR/.nojekyll"

# create a CNAME file in output directory
echo $SITE_URL >"$OUT_DIR/CNAME"

# create robots.txt
echo -n "# *
User-agent: *
Allow: /

# Host
Host: https://$SITE_URL

# Sitemaps
Sitemap: https://$SITE_URL/sitemap.xml
" >"$OUT_DIR/robots.txt"

echo -n "Writing sitemap..."
# start with sitemap head
sm='<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
'
# loop over all html file
for file in out/**/*.html; do
  # convert current file to urls
  current=$(echo $file | rev | cut -d '.' -f 2- | rev | cut -d '/' -f 2-)
  loc="https://$SITE_URL/$current"
  # treat index and 404 differently
  [[ $file == "out/index.html" ]] && loc="https://$SITE_URL"
  [[ $file == "out/404.html" ]] && continue
  sm="$sm  <url>
    <loc>$loc</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
    <lastmod>$(date +%FT%T.%3NZ)</lastmod>
  </url>
"
done
# close outer tag
sm="$sm</urlset>"
# Write sitemap
echo "$sm" >"out/sitemap.xml"
