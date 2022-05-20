---
title: Koddemos
date: 2022-05-20
tags: ['kod']
templateEngineOverride: njk, md
---

{% set demo = collections.orderedDemos | getDemo("CSS Centering") %}
{{ demo | log }}
<article>
  <h2 id="{{ demo.fileSlug }}">{{ demo.data.title }}</h2>
  {{ demo.templateContent | safe }}
</article>

{% set demo = collections.orderedDemos | getDemo("Knappar") %}
{{ demo | log }}
<article>
  <h2 id="{{ demo.fileSlug }}">{{ demo.data.title }}</h2>
  {{ demo.templateContent | safe }}
</article>
