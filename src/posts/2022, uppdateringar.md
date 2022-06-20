---
title: 2022, uppdateringar
date: 2022-03-13
lead: "Ett nytt år, ett nytt © datum på sidan och kanske ett slut på pandemin"
tags: [ 'reflektion', 'uppdatering', 'TOD']
category: anteckning
---

Här kommer en kort uppdatering om sidan och saker jag arbetat med. Det har varit en period av mindre aktivitet, av olika anledningar men förhoppningsvis kommer det mer nu under våren.

## Mat

Ett projekt som legat i träda en längre period är min mat sida, [måltidsloggen](https://mat-jensnti.vercel.app/). Projektet skapades ursprungligen för att jag skulle lära mig mer om en api, men också för att lära mig om [React](https://reactjs.org/). Anledningen till att sidan varit nere är att databasservern (mysql) som den använde inte längre var tillgänglig. [Måltidsloggens api/backend](https://github.com/jensnti/mat) är hostat med [Heroku](https://www.heroku.com/) och Herokus mysql add-on är sådär. Heroku fungerar mycket enklare med deras postgres add-on, så jag tog mig tiden att uppdatera sidans api till att köra postgres. Att migrera till postgres var inte en stor grej eftersom sidan använder en ORM, [Sequelize](https://sequelize.org/).

När väl api/backend backend delen var uppdaterad så kunde jag fixa frontend delen. Frontenden använder [Next.js](https://nextjs.org/) och är hostat på [Vercel](https://vercel.com). Eftersom sidan varit nere så krävdes det en hel del uppdateringar av frontend-koden för att den skulle fungera igen (Next kräver lintning bla.) men det ordnade sig.

Så måltidsloggen är live igen och dess TODO-lista är gigantisk. Det kliar i fingrarna att använda nya lärdomar.

## Popup

Jag har uppdaterat sidan med bland annat en "cookie-consent" popup, detta av den enkla anledningen att sidan faktiskt sparar info i din localstorage (färgschema) men även använder [Google Analytics](https://analytics.google.com/analytics/web/) för trafik. Utöver det så finns fonter på typekit.

Själva designen på elementet kommer från mitt arbetet med [TOD sidorna](https://programmering.jensa.xyz/) där jag tyckte det var viktigt att få med. 

## TOD

Just TOD sidorna har fått en del uppmärksamhet då jag försökte skapa en alternativ uppgifts-layout, detta efter lite pedagogiskt prat med min kollega [Kaj](https://github.com/KajSchmidt). En av grundtankarna med att dela upp ett material i teman, områden och delar är att kunna gömma information för eleven. Detta för att hjälpa eleven med sina val, sitt fokus och helt enkelt inte visa för mycket.

Den existerande designen på TOD använder accordions för att begränsa informationen som visas. Det har dock visat sig att eleverna går vilse i strukturen och det fortfarande är mycket att ta in. För att underlätta skapades två nya funktioner:

* Popup med "Du arbetade senast med" som leder användaren till senaste området
* Toggle för att byta layout, till en struktur med boxar som visar teman och områden. Eleven ser alltså inte delarna.

Den kompaktare layouten med boxar utgår från en spelinspirerad tanke om skilltrees. Resultatet blev sådär och är i högsta grad ett work in progress, men det fungerar och används på [programmering.jensa.xyz](https://programmering.jensa.xyz/).

## TODO

### Den här sidan

Listan är lång men jag tvingar mig att faktiskt skriva text om det först. 🙂

### Webbexempel

Jag har börjat samla en del elevarbeten på webbplatser utifrån en "sidmall" jag skapade för att visa exempel i webbutvecklingen. Sidan är byggd med eleventy men jag valde att hosta den på GitHub pages, en test. I nuläget finns [wu-exempel](https://jensnti.github.io/wu-exempel/) hostad där men en tanke jag hade var att flytta exempel hit, till bloggen. Av den anledningen påbörjade jag arbetet med att kunna sandboxa exempel i denna kod, men det blev inte riktigt färdigt.

### Elevarbeten, spel

Jag har nu kört ett moment med speldesign i flera år och varje år samlat elevernas spel. Det har varje år blivit en ny typ av sida och i slutändan har inte något samlats i en form som går att överblicka, men nu finns det något där. Eftersom jag hade exempel-sidan så valde jag att återanvända den. [Eleventy](https://www.11ty.dev/) är så perfekt för den här typen av arbete och att hosta det på Netlify gör alltihopet lite enklare.

Kolla gärna in [spelsiten med elevarbeten](https://spelsite.netlify.app/).

### Elevarbeten, gymnasiearbete

I kollegiet har vi de senaste åren arbetat hårt tillsammans med eleverna för att höja kvaliten på elevernas gymnasiearbeten. Gymnasiearbetet på teknik-programmet ska vara en förberedels inför högre studier. Eleverna ska efter arbetet ha god koll på hur en  genomför en vetenskaplig studie.

För att visa upp detta arbete och hjälpa eleverna så kopierade jag spel-sites mallen för att använda med gymnasiearbeten. [GYARB sidan](https://gyarb.netlify.app/2022/) är dock än så länge enbart ett skelett.

