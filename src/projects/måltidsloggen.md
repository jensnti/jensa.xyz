---
title: Måltidsloggen
layout: layouts/project.njk
project:
    start: 2021-02-13
    end: ?
    status: kanske
    title: Måltidsloggen
    url: https://mat-jensnti.vercel.app
    licens: MIT
    tech: ['react', 'nextjs', 'javascript', 'sass', 'bootstrap', 'pgsql', 'node', 'heroku']
    hosting: "[Vercel](https://vercel.com/) och [Heroku](https://heroku.com/)"
    description: "En webbsida / app för att logga dina måltider. Backend: node.js och pgsql. Frontend: Nextjs."
templateEngineOverride: njk, md
tags: ['node', 'nextjs', 'sql']
---

{% image "./src/images/matdump-1.png", "Skärmdump av Måltidsloggen",  "Skärmdump av Måltidsloggen" %}

## Vad

En webbsida / app för att logga dina måltider. Backend med node.js och pgsql. Frontend med Nextjs.

## Varför

> Relationships are just two people constantly asking eachother what they want to eat, until one of them dies

Måltidsloggens koncept skapades vid middagsbordet. Den är tänkt att hjälpa dig hålla reda på vad du ätit/äter. När du saknar inspiration, inte kommer ihåg vad ni åt igår, eller bara är trött och frågan: *Vad ska vi äta idag?* hänger i luften kan du kolla Måltidsloggen. 


Syftet med Måltidsloggen är att hjälpa dig att snabbt och enkelt logga din mat.
Du kan sedan använda din sparade data för att:
* se din historik
* söka
* få tips
* eller bara minnas

{% image "./src/images/matdump-2.png", "Skärmdump av Måltidsloggen",  "Skärmdump av Måltidsloggen" %}
## Hur

Projektet började med att jag kodade en backend/microservice/api. Grundsyftet där var att skapa en api, testa någon form av auth (först [auth0](https://auth0.com/), sedan egen) och skriva tester.

För frontend så var planen att jobba med ett ramverk och lära mig grunderna för det. Först ut var [React](https://reactjs.org/) som senare byttes till [Next](https://nextjs.org/).