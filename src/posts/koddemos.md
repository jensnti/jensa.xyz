---
title: Koddemos
date: 2022-05-20
tags: ['kod']
templateEngineOverride: njk, md
lead: "Testkod för att skapa kodexempel, hämtad från 5t3phs sida med lite varianton för att kunna visa annan kod är css."
---

{% set demo = collections.orderedDemos | getDemo("CSS Centering") %}
<article>
  <h2 id="{{ demo.data.title | slugify }}">{{ demo.data.title }}</h2>
  {{ demo.templateContent | safe }}
</article>

{% set demo = collections.orderedDemos | getDemo("Knappar") %}
<article>
  <h2 id="{{ demo.data.title | slugify }}">{{ demo.data.title }}</h2>
  {{ demo.templateContent | safe }}
</article>
