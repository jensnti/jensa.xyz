---
title: Länkfarm
date: 2021-09-30
tags: ['transform', 'eleventy', 'länkar']
---

Jag kom faktiskt på en sak jag önskade sidan när jag skrev föregående inlägg och det var ett sätt att sammanställa alla länkar i texten till en lista i slutet av dokumentet. För att göra detta så använde jag den redan existerande transform (HTML koden parsas och spottas ut på nytt) som görs när Eleventy bygger den här sidan. 

Det görs med följande javascript. En lista med alla länkar hämtas, loopas igenom och koden spottar ur sig en lista med länkar.

```js
    const articleLinks = [
        ...document.querySelectorAll('main .post a')
    ];

    if (articleLinks.length) {
        const list = document.querySelector('.post__harvest-links');
        articleLinks.forEach((anchor) => {
            if (anchor.href.startsWith('https')) {
                const listItem = document.createElement('li');
                const listLink = document.createElement('a');
                listLink.href = anchor.href;
                listLink.textContent = anchor.textContent;
                listLink.target = '_blank';
                listLink.rel = 'noopener noreferrer';
                listItem.appendChild(listLink);
                list.appendChild(listItem);
            }
        });
    }
```

Så rent tekniskt är det en lösning jag är nöjd med, men framförallt så tvingar det mig att skriva mina texter så att länkarna faktiskt är en del av dem. Det får mig att skriva in mina källor och referenser i texten, snarare än att bara klistra dit en *Läs mer* länk i slutet, även om det är vad det betyder.