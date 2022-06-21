---
title: Tema, område, del
date: 2021-07-31
lead: 'Mitt intresse för att testa en statisk sidbyggare började i ett projekt kallat Tema, område, del. Detta efter samtal med en kollega.'
tags: ['TOD', '11ty']
templateEngineOverride: njk, md
category: anteckning
---

I slutet av vårterminen 2021 så diskuterade jag tillsammans med min kollega Kaj över hur uppgifter, information och instruktioner skulle kunna utformas för att nå elever på ett så gott sätt som möjligt.
Kaj hade delat upp kursens innehåll i teman, områden och delar. Där en del var ett begränsat område (till en sida) innehållandes information, instruktion och uppgift. Jag gillande upplägget och började fundera utifrån det.
Det var i samband med detta som jag bestämde mig för att testa [Eleventy](https://www.11ty.dev/) för att skapa en slags kurswebb.

Min testkurs blev [Webbutveckling (obs sökning på skolverket)](https://www.skolverket.se/undervisning/gymnasieskolan/laroplan-program-och-amnen-i-gymnasieskolan/hitta-program-amnen-och-kurser-i-gymnasieskolan?url=-996270488%2Fsyllabuscw%2Fjsp%2Fsearch.htm%3FalphaSearchString%3DW%26searchType%3DFREETEXT%26searchRange%3DCOURSE%26subjectCategory%3D%26searchString%3Dwebbutveckling&sv.url=12.5dfee44715d35a5cdfa8e7a) och jag skapade ett system kring detta. Min kurswebb för [Webbutveckling](https://webbutveckling.jensa.xyz) är ofullständig, men gav mig en bas för att skapa en Eleventy template att använda.

## TOD

[Projekt templaten](https://github.com/jensnti/tod) kom att döpas till TOD efter just tema, område, del(fiffigare namnförslag är välkomna). Så nu skriver jag om TOD här, eftersom jag nyss gått igenom sidan och gjort en rejäl uppdatering av den. Efter att ha skapat [jensa.xyz](https://www.jensa.xyz), där du läser detta och sedan kört igenom [Learn eleventy from scratch](/posts/learn-eleventy-from-scratch/) kursen så bestämde jag mig för att arbeta om vissa grunder på sidan.

-   Skippa [Bootstrap](https://getbootstrap.com/)
-   Skriva CSS med struktur och tanke
-   Bundla javascript

Jag är hyfsat nöjd med slutresultatet och har lyckats halvera storleken på CSS och halvera storleken på JS. Förutom det så är Lighthouse poängen något bättre och jag har mer kontroll över alltihopa.

{% image "./src/images/tod-lighthouse.png", "Skärmdump av Lighthouse score.", "Lighthouse score." %}

## Innehåll

Så nu när sidan är mer eller mindre klar(fix fix fix) handlar det främst om att skriva innehåll. Förhoppningsvis kan jag komma igång med det snart, men det tar emot att slita sig ur sommarlovslunken.
När det är gjort så ska jag försöka uppdatera den här sidan med lite av det jag lärt mig.

Resultaten av arbetet finns att beskåda på [Webbutveckling](https://webbutveckling.jensa.xyz) och [Programmering](https://programmering.jensa.xyz) och uppdateras kontinuerligt.
