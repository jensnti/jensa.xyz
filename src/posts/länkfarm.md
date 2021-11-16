---
title: Länkfarm
date: 2021-09-30
tags: ['transform', 'eleventy', 'länkar']
---

När jag skrev föregående inlägg så formulerade sig en feature i mitt huvud som jag önskade på den här sidan. Ett sätt att sammanställa alla länkar i texten till en lista i slutet av dokumentet.

För att skapa en lista med det så använde jag den redan existerande transform (HTML koden parsas och spottas ut på nytt) som körs när Eleventy bygger den här sidan.

Jag skrev och testade följande javascript. Alla länkar på sidan hämtas, loopas igenom och koden skapar listan.

Självklart så dök det upp undantag för vissa sidor där jag inte önskade detta och tyvärr så är transform funktionen ett senare steg i 11tys byggprocess så det kan inte använda `collections.posts`.

```js
    const articleLinks = [
        ...document.querySelectorAll('main .post a')
    ];

        if (articleLinks.length) {
            const pageTitle = document.querySelector('.site-intro__title');
            // what if I write the post Om... something
            if (pageTitle !== null && !pageTitle.textContent.startsWith('Om')) {
                const list = document.querySelector('.post__harvest-links');
                const externalLinks = [];

                articleLinks.forEach((anchor) => {
                    if (anchor.href.startsWith('https')) {
                        const listItem = document.createElement('li');
                        const listLink = document.createElement('a');
                        listLink.href = anchor.href;
                        listLink.textContent = anchor.textContent;
                        listLink.target = '_blank';
                        listLink.rel = 'noopener';
                        listItem.appendChild(listLink);
                        list.appendChild(listItem);
                        externalLinks.push(anchor);
                    }
                });
```

Rent tekniskt är det en lösning som funkar, vilket är okej. Men rent skrivtekniskt så tvingar det mig att skriva mina texter så att länkarna faktiskt är en del av dem. Det får mig att skriva in mina källor och referenser i texten, snarare än att bara klistra dit en _Läs mer_ länk i slutet. Det är bra.
