---
title: Learn Eleventy From Scratch
date: 2021-06-24
update: 2021-07-11
lead: 'Scrolla ned för att läsa mina intryck efter att jag slutfört kursen .'
tags: ['css', 'länkar', 'eleventy', 'tips']
---

Plötsligt händer det. I det [första inlägget](../learn-css/) på bloggen skrev jag om Andy Bells [Learn CSS](https://web.dev/learn/css/) kurs. På sin webbplats [Piccalilli](https://piccalil.li/) har han även en kurs, [Learn Eleventy From Scratch](https://piccalil.li/course/learn-eleventy-from-scratch/). Den kursen har tidigare har kostat pengar, men nu är den gratis.
Alltså är det ett utmärkt tillfälle att lära sig mer om [Eleventy](https://www.11ty.dev/).

{% image "./src/images/issue-33.png", "Skärmdump av det du skapar i kursen", "Skapa det här." %}

Eleventy har snabbt blivit något jag verkligen gillar. I våras har jag gett mig i kast med [Vue](https://vuejs.org/), [React](https://reactjs.org/) och [Next.js](https://nextjs.org/) för att skapa en frontend till en separat backend. Resultatet av det finns på min [GitHub](https://github.com/) och på [Måltidsloggen](https://mat.jensa.xyz/).

I slutändan så är jag inte övertygad, jag gillar det inte så värst mycket och tycker att mycket av det det gör är omständligt. Ska jag ranka dem så hamnar React sist. Next förbättrar dock utvecklarupplevelsen med React markant.
Så utifrån vårens erfarenheter så känns Eleventy kul och inspirerande att jobba med (och ja, det är lite som att jämföra äpplen och apelsiner).

Hursomhelst så ser jag fram emot att köra igenom kursen nu i sommar och att använda den i höst förhoppningsvis.

Du hittar den här, [Learn Eleventy From Scratch](https://piccalil.li/course/learn-eleventy-from-scratch/).

## Erfarenheter och intryck

Här är lite tankar efter att jag kört igenom kursen.
Kursen är skapad i fyra moduler. Det är dock mer som tre, eftersom den fjärde är en wrap-up.

### Modul 1

Den första modulen introducerar Eleventy och hur en kan arbeta med det. Det finns mycket bra här att lära. Det är lärorikt tycker jag att se Andys tänkt kring Front matter och hur det kan användas. Att spara flera delar av en sida i front matter och sedan kombinera det på olika sätt är verkligen en styrka i Eleventy.

Det finns även mycket bra här kring användadet av [Nunjucks](https://mozilla.github.io/nunjucks/) för att på smarta sätt återanvända komponenter och skapa layouter.

### Modul 2

Efter att ha skapat sidans HTML kod i den första modulen så handlar denna om byggsystem. Jag hade inte testat att använd [GULP](https://gulpjs.com/) tidigare (i alla fall medvetet) och tycker att det var en mycket bra introduktion.

Den här sidan använder inte GULP, utan den byggs med [npm-run-all](https://www.npmjs.com/package/npm-run-all), [cssnano](https://www.npmjs.com/package/cssnano), [autoprefixer](https://www.npmjs.com/package/autoprefixer) och [postcss](https://www.npmjs.com/package/postcss). Detta är något som jag plockade upp från [Stephanie Eckles](https://twitter.com/5t3ph) utmärkta startkurs, [Build An Eleventy (11ty) Site From Scratch](https://egghead.io/courses/build-an-eleventy-11ty-site-from-scratch-bfd3).

Men efter att ha testat att bygga med GULP så kommer jag nog att prova det framöver då det ger en del extra kontroll (tror jag).

Den här modulen innehåller även ett avsnitt kring att arbeta med bilder. Jag använder [@11ty/eleventy-img](https://www.npmjs.com/package/@11ty/eleventy-img) paketet för den här sidan för att automatisera optimeringen av bilder, så GULP behövs inte för detta. Men det är ett alternativ.

### Modul 3

I den här modulen är det dags för CSS och för att få sidan att se ut som något. Här får Andy verkligen visa upp det han kan och sidan introducerar steg för steg [CUBE CSS](https://cube.fyi/) och tänket bakom det. Andy visar även sitt verktyg för utilities, [Gorko](https://www.npmjs.com/package/gorko).
Det finns mycket bra att lära här kring CSS och en metodologi för det som jag tycker känns rimlig, men jag är nog inte riktigt där i att använda den för något eget.

Om du letat efter en bra introduktion till CSS_grid så finns det även här. CSS-grid är något som jag inte alls gett mig in på, flexbox har gjort det jag önskat hittills. Men det är nog något som kommer ändras efter detta.

Att få se sidan skapas och bli till med CSS är riktigt kul och lärorikt. Det finns massor med bra tips i detta avsnitt och slutresultatet innehåller mycket design-element som jag gillar.

Avsnittet levererar även flera läsvärda länkar och jag har samlat en del i slutet av den här texten.

## Slutsats

Kursens form är i stilen av att kod presenteras, förklaras och sedan upprepas det. Du ställas alltså inte inför några direkta problem att lösa. Det fungerar bra för mig, men det är verkligen viktigt att skapa en egen produkt utifrån kursens innehåll för att befästa och använda det.

Det har hänt en del kring Eleventy sen kursen skapades. Nyheter och plugins har lagts till, men det påverkar inte kursens kvalité och innehåll.

Så slutligen kan jag _verkligen_ rekommendera kursen för att komma igång med statiska sidor och Eleventy.

⭐⭐⭐⭐⭐
