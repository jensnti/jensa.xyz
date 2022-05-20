---
title: Localstorage och slutuppgifter
date: 2021-11-16
lead: 'Kurswebbsystemet, TOD, behövde en uppdatering för att tillåta slutuppgifter. Det var inte tvärenkelt att bara lägga till.'
tags: ['TOD', 'pedagogik', 'eleventy', 'javascript', 'lodash', 'localstorage']
templateEngineOverride: njk, md
---

Jag har tidigare skrivit om kurswebbsystemet jag byggt, [Tema, område, del](/tag/tod). Det är ett ständigt work in progress (vad är inte det) och jag har inte riktigt fått till uppgiftsfunktionen som jag önskat.

TOD grunden finns hostad som [Ämnestitel](https://silly-bhaskara-09612e.netlify.app/) på Netlify och för den som vill kolla på koden (eller skapa en egen kurswebb) finns det ett [template repo](https://github.com/jensnti/tod).

## Systemet som fanns

Tidigare så fanns ingen data i systemet över vilka teman, områden, delar och uppgifter som existerade. Detta för att jag inte ville att en sådan data skulle behöva skapas manuellt. Systemet är skapat med iden att det ska vara tämligen enkelt att köra igång en kurswebb och fokus ska ligga på att skriva innehåll (sen kanske det är ofrånkomligt att viss programmeringskunskap krävs).

Det fungerade så att när en användare checkade av en uppgift som klar så skapades ett objekt för att identifiera detta i localstorage. När sidan för en del (med uppgifterna) sedan laddas så kontrolleras då uppgiften i fråga och checkboxens status uppdaterades.
Startsidan fungerade så att alla element för de olika teman, områden och delarna laddades från sidans DOM. Sedan kollade scriptet om en progress finns i localstorage. Om uppgiften finns sparad så skapas stjärnorna samt en progressbar.

{% image "./src/images/tod-progress.png", "Skärmdump av startsidan på programmeringswebben.", "Illustration, startsida - progress." %}

### Slutuppgifter

Jag ville kunna lägga till slutuppgifter i systemet, så att en elev skulle kunna checka av sin kunskap för ett område. Men jag ville inte bara lägga till en del för slutuppgiften och byta template på denna. Anledningen till detta är att en del av den pedagogiska tanken med systemet är att systemet ska dölja uppgifter tills eleven är redo för dem. Det kan tillochmed vara så att en elev aldrig ska se uppgiften i fråga, då det kanske inte är relevant för hen.

Eftersom webbsidan i sig inte hade information kring antalet delar med uppgifter i varje område så blev det mer eller mindre omöjligt att dölja slutuppgiften. Jag började med att försöka få till det med den tidigare strukturen, men det blev inte bra.

## Skapa JSON

Lösningen blev att automatisera skapandet av en JSON fil för uppgiftsstrukturen. För detta använde jag en transform, grunden för detta kommer från [Hylia](https://github.com/andy-piccalilli/hylia-preview), 11ty starter kit.
Detta är en funktion som körs efter det mesta andra i 11ty. Den tuggar sig igenom all HTML och spottar ut något på andra sidan, i det här fallet en JSON-fil. Min mall för JSON-filens utformning såg ut ungefär såhär.

```json
{
    "subject": "amnestitel",
    "themes": [
        {
            "theme": "tema",
            "areas": [
                {
                    "area": "område",
                    "parts": [
                        {
                            "part": "del",
                            "assignments": [
                                {
                                    "assignment": "uppgift-1",
                                    "type": "basic",
                                    "completed": false,
                                    "date": null
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```

JSON-filen fick sedan stå som mall för det objekt sidan skapar i localstorage. Nu kunde detta localstorage object skaps direkt när sidan laddas och status för uppgifterna hanteras. Detta ledde i sin tur till att det mesta behövde skrivas om. Eftersom allt är skrivet i javascript utan något ramverk så måste allt uppdateras, hanteras och fixas. Jag kunde fortsätta använda en del av mina DOM-metoder, men för biten med localstorage så skrev jag en klass.
Progress delen för framsidan och uppgiftshanteringen fick skrivas om, men i slutändan så blev det bra mycket bättre.

## Refactor

Mitt första utkast av koden använde sig av [lodash](https://lodash.com/) för att leta sig igenom objekt och arrayer med objekt i arrayer och så vidare. Lodash fick åka med som en dependecy och jag tänkte inte så mycket mer på det. Detta tills jag började bli klar och såg att min javascript bundle plötsligt blivit gigantisk. Jag trixade en del med [rollup](https://rollupjs.org/) för att få ordning på detta, men lyckades inte. Huruvida detta beror på min förmåga eller rollup/lodash låter jag vara osagt, men jag bestämde mig vilketsom för att lösa problemet utan lodash.

### Find

Att göra detta kom att resultera i att ganska mycket kod skrevs på annat sätt, men här nedan följer ett exempel på hur jag bytte ut [\_find](https://lodash.com/docs/4.17.15#find) mot [find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find). Nu är dess funktion inte riktigt jämförbar, lodash gör mer, men för mitt behov så behövde jag inte mer heller.

```js
result = _find(['name', theme], this.storage.themes); // med lodash
result = this.storage.themes.find((t) => t.name === theme); // utan lodash
```

Lärdomen av detta är att det kan vara bättre att spendera tid för att förbättra sin kod och använda det som finns än att använda genvängen som är ett bibliotek. Med det sagt så har lodash sin funktion och jag lyckades inte helt ersätta det.

### Merge

När 11ty bygger sidan så skapas JSON-objektet för strukturen. När sidans struktur, eller uppgifter ändras, så vill jag uppdatera objektet i localstorage med ändringarna. Det ska ske, men såklart inte skriva över användarens sparade progress. För att göra detta så önskade jag göra en merge av två objekt. Denna merge skulle även ta hänsyn och titta i arrayer och annat.

Att koda detta kändes i stunden som övermäktigt så jag letade på [Copilot](https://copilot.github.com/) och [Stackoverflow](https://stackoverflow.com/). I slutändan så hittade jag en rekursiv funktion i denna [gist](https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6#gistcomment-3889214) som nästan gör det jag vill, så jag är inte riktigt färdig med min refaktor.

```js
const merge = (source, target) => {
    for (const [key, val] of Object.entries(source)) {
        if (val !== null && typeof val === `object`) {
            if (target[key] === undefined) {
                target[key] = new val.__proto__.constructor();
            }
            merge(val, target[key]);
        } else {
            target[key] = val;
        }
    }
    return target;
};

export { merge };
```

## Slutsats

Detta var lärorikt och bra att göra. Jag är nöjd med systemet och jag tror att resultatet både fungerar bättre och är mer robust.

Att skriva javascript på det här sättet tycker jag är både roligt och lärorikt, men det är lagomt besvärligt (i den här skalan). Projektet i sig kanske är på gränsen till att behöva ett ramverk och det är absolut inget konstigt att använda sig av det för att skapa en webb med dessa funktioner, det kan tillochmed vara så att det är att föredra.

Att använda sig av ett ramverk skulle dock ta bort en av de grundläggande ideerna med systemet, att det ska räcka med att skriva lite MD filer för att skapa en kurswebb.
