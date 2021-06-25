---
title: CSS, metoder och namn
date: 2021-06-22
lead: 'Att namnge CSS, att återanvända CSS och hantera cascade är något som de flesta webb-projekt behöver göra. Det finns ett antal olika sätt att närma sig detta.'
tags: ['css', 'bem', 'bootstrap', 'tailwind', 'utilities']
---

Jag har omformulerat texten till det här inlägget ett par gånger nu istället för att skriva flera. Kanske är det så att jag borde skriva ett inlägg mer som en artikel och låta den gro några dagar innan jag publicerar. Vem vet.

Det första utkastet handlade om BEM och det sättet att tänka kring CSS, men jag vet inte om jag riktigt är med på tåget. Jag har använt [Bootstrap](https://getbootstrap.com/) väldigt mycket för de projekt jag har gjort och det följer ett annat sätta att tänka. Men jag har till största del använt mig av Bootstraps utility klasser. Positionering, grid och en grundläggande stil för forms. Väldigt smidigt och fungerar utmärkt när en vant sig vid det.

Jag har sneglat en del på [Tailwind](https://tailwindcss.com/), men aldrig riktigt testat. Det är som att det tar utilities ett steg för långt(det som jag dock använt från Bootstrap), allt blir utilities och vi är nästan tillbaka till att skriva inline CSS(detta är vad många som ondgör sig över Tailwind säger). Det är inte riktigt sant då utility klasserna exempelvis ser till att textstorleken är konsekvent.
Jag kan dock hålla med Adam Wathan i hans [resonemang](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/) som lett till skapandet av Tailwind.

## Vad gör jag då

Jag tror jag landar någonstans i mitten, jag har en del utility men försöker skriva en del komponentstyrda css regler. Det är å andra sidan det som har lett till att folk håller sig till något som BEM eller utilities. Jag försvarar mig genom att försöka använda SCSS och variabler för färger, avstånd och annat. Nu har jag för den här sidan försökt använda mig av BEM liknande class-namn för struktur. Jag tror jag inte vill använda BEM helt ut, dels för att det försöker [undvika cascade](https://www.smashingmagazine.com/2014/07/bem-methodology-for-small-projects/), något som jag förstår poängen med, men samtidigt så är cascade en feature i språket och något som jag försöker använda.
Sen att enbart jobba med utilities säger jag nja till, men de har definitivt sin plats. 

Optimalt så kan en bygga upp sitt eget bibliotek med utilities som går att anpassa till nya projekt och efter behov. Bootstrap har varit mitt bibliotek med utilities länge, men det ger en hel del overhead så i det här projektet har jag hoppat det.

### Mer läsning

* https://css-tricks.com/bem-101/
* https://www.smashingmagazine.com/2014/07/bem-methodology-for-small-projects/
* http://nicolasgallagher.com/about-html-semantics-front-end-architecture/
* https://adamwathan.me/css-utility-classes-and-separation-of-concerns/
* https://cube.fyi/
