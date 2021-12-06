---
title: CSS, namn och semantik
date: 2021-06-22
update: 2021-06-30
lead: 'Att namnge CSS, att återanvända CSS och hantera cascade är något som de flesta webb-projekt behöver göra. Det finns ett antal olika sätt att närma sig detta.'
tags: ['css', 'bem', 'bootstrap', 'tailwind', 'utilities']
---

Jag har omformulerat texten till det här inlägget ett par gånger nu istället för att skriva flera. Kanske är det så att jag borde skriva ett inlägg mer som en artikel och låta den gro några dagar innan jag publicerar. Jag har även försökt att skriva så att texten kan bidra med lite förståelse och olika synpunkter, inte bara kasta ut min åsikt.

Det första utkastet handlade om BEM och det sättet att tänka kring CSS, men jag vet inte om jag riktigt är med på tåget. Jag har ofta använt [Bootstrap](https://getbootstrap.com/) för de projekt jag har gjort. Bootstrap är långt från BEM i sin utformning. Från Bootstrap har jag främst använt mig av de utility-klasser som finns. Positionering, grid och en grundläggande stil för forms. Ett bibliotek som Bootstrap är väldigt smidigt och fungerar utmärkt när en vant sig vid det.

Jag har tittat på [Tailwind](https://tailwindcss.com/), men aldrig riktigt testat. Tailwind är väldigt mycket utility-klasser. Jag upplever det som ett steg för långt, även om jag verkligen kan uppskatta utility-klasser. Många som ondgör sig över Tailwind jämför det med att skriva inline css. Det är inte en helt rättvis jämförelse (mer om detta på [CSS-tricks](https://css-tricks.com/if-were-gonna-criticize-utility-class-frameworks-lets-be-fair-about-it/)).

## Utility-first

Det som Tailwind kommit att representera är att skriva CSS Utility-first.
I ett [blogginlägg](<(https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)>) från 2017 resonerar sig Adam Wathan fram till tänket bakom ramverket. Texten är väl värd att läsa. Jag tror att de flesta som arbetat med CSS kommer att känna igen sig i hans resonemang om hur CSS bör/ska/kan struktureras.

## BEM

Jag nämnde BEM tidigare i texten, det står för Block Element Modifier och är en metod för att namnge CSS i större projekt. Ordningen i BEM är tämligen sund och tydlig tycker jag.

-   Block, en semantisk komponent
-   Element, en del som är beroende av blocket
-   Modifier, något som kan ändra blockets stil

BEM försöker att [undvika cascade](https://www.smashingmagazine.com/2014/07/bem-methodology-for-small-projects/), något som jag förstår poängen med. Cascade är dock en feature i CSS och något som bör användas anser jag.
På den här sidan har jag försökt låna BEM liknande klassnamn i min CSS, men jag är ganska långt ifrån att följa reglerna.
Läs mer om BEM i [BEM-101](https://css-tricks.com/bem-101/) på CSS-Tricks, för BEM har en del bra poänger det med.

## Ett exempel

Här nedan finns scss koden för `.post` klassen här på sidan. `.post` är ett semantiskt namn för vad det är. Klassen återfinns på ett `<article>` element.

```scss
.post {
    h2, h3 {
        margin-top: ms(1);
    }
    figure {
        padding: ms(1) 0;
        width: 100vw;
        max-width: ms(11);
        margin-left: 50%;
        transform: translateX(-50%);
        position: relative;
        figcaption {
            padding-top: ms(-1);
            font-style: italic;
        }
    }
    img, picture {
        width: 100%;
    }
    ...
}
```

I `.post` klassen så är ett antal andra element nästlade, headings, bilder osv. Eftersom dessa element är genererade av Eleventy så har jag valt att använda element-selektorer. Detta skapar då problemet att klassen med största sannolikhet inte går att återanvända, den blir väldigt specifik för denna sida.

Det går inte heller att återanvända koden för en figure, då den är specifik under `.post`. Den skulle behöva flyttas till en klass. Den upprepning är inte heller bra i enlighet med Don't Repeat Yourself (DRY) principer. Koden för utfall (eng. [bleed](<https://en.wikipedia.org/wiki/Bleed_(printing)>)) även på `pre` elementet (som används för kod).

```scss
&__lead {
    font-family: $serif;
}
&__foot {
    padding-top: ms(1);
    padding-bottom: ms(1);
}
```

Sist finns det två klasser för delar i en `.post`. Tyvärr är bitar av det också återanvänt i `.pagination`.

Utöver det så laddas en del andra stilar kopplade till header- och image-elementen som ärvs med cascade. Det är även det som gör att marginaler och padding krävs på vissa ställen, då andra värden önskas.

### Analys

En stor del av den CSS på den här sidan faller i fällorna som Adam tar upp i sin artikel. Klassnamnen försöker vara semantiska, men klasserna i sig är inte tillräckligt generiska för att kunna återanvändas.
Jag har lite BEM tänk där, vilket orsakar en del upprepning.

```scss
.post-list__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    padding-left: 0rem;
    padding-right: 0rem;
    ...
}

.tag-list {
    list-style: none;
    display: flex;
    padding-left: 0rem;
    padding-right: 0rem;
}
```

Här är ett exempel som är ganska hemskt faktiskt. Men samtidigt så vill jag inte att elementet för tag-list ska ha klassen post-list, det känns rörigt och inte BEM. Det orsakar dock upprepning för att uppnå någorlunda semantiska klassnamn.
En variant hade såklart kunnat vara att arbeta med utilities.

```scss
li {
    list-style: none;
}
.d-flex {
    display: flex;
}

.px-0 {
    padding-left: 0rem;
    padding-right: 0rem;
}
```

Då hade min markup ändrats ganska avsevärt för att undvika upprepning i CSS-klasserna. Jag får samtidigt ett gäng CSS-klasser som jag kan återanvända.

```html
<ul class="tag-list">
    ...
</ul>

<ul class="tag-list d-flex px-0">
    ...
</ul>
```

En annan variant är att skippa det semantiska och skapa en `.styled-list` klass som går att återanvända tillsammans med specifika och/eller utilities.

```scss
.styled-list {
    list-style: none;
    padding-left: 0rem;
    padding-right: 0rem;
}

.flex {
    display: flex;
}

.flex-column {
    flex-direction: column;
}
```

I det här fallet kanske klassen passar bättre som `.unstyled-list`. CSS-klassens namn blir inte lika specifikt semantisk, men frågan om det verkligen påverkar kodens läsbarhet. En vinner nog lite här och förlorar lite där.

## Slutsats

Jag tror jag landar någonstans i mitten, jag har en del utility men försöker skriva en del komponentstyrda CSS-regler. Jag känner ingen större lust att använda Tailwind och samtidigt så använder jag gärna Bootstrap för utility. Kanske är det så att det är dags att skriva mitt eget utility baserat på vad jag använder från Bootstrap, det vore nog rätt lärorikt.
