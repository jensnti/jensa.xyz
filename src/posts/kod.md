---
title: Kod
date: 2021-06-21
tags: ['kod', 'markdown', 'prism', 'css']
---

Att kunna skriva kodexempel och visa kod på den här sidan är ett måste. Som tur är så finns det tillgängligt med Eleventys [Syntax Highlight Plugin](https://www.11ty.dev/docs/plugins/syntaxhighlight/). Det använder i sin tur [Prism](https://prismjs.com/) för att styla koden.

Att inkludera ett tema blir första steget, att sedan bli nöjd med det tillsammans med den här sidans tema, det är en annan fråga. Förutom Prisms startteman så finns det lite fler i det här repot, [Prism themes](https://github.com/PrismJS/prism-themes/blob/master/README.md).

Min tanke ~~är~~/~~var~~ att utgå från [GitHubs](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-ghcolors.css) tema och sedan ändra, Vi ~~får se hur det går~~ kan nu se hur det gick.

## Dags att testa

För att inkludera ett plugin i eleventy så behöver det inkluderas i konfigurationen.
```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
};
```

Sedan behöver Prisms css laddas, detta kan göras med lokal fil eller från CDN.
```html
<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism.min.css"
    integrity="sha512-tN7Ec6zAFaVSG3TpNAKtk4DOHNpSwKHxxrsiw4GHKESGPs5njn/0sMCUMl2svV4wo4BK/rCP7juYz+zx+l6oeQ=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"/>
<!-- eller -->
<link rel="stylesheet" href="{{ '/css/prism.css' }}">
```

Det första jag vill ändra på är fontstorleken, jag har valt stor text på denna sida för att jag gillar det, men för kod-stycken blir det inte bra.
```css
.text-small {
    font-size: ms(0) !important;
}
```

En del trixande senare...
```scss
$code-paths: (
    1: polygon(0 0, 100% 2%, 100% 98%, 0% 100%),
    2: polygon(0 2%, 100% 0, 100% 100%, 0 98%)
);

pre {
    width: 100vw !important;
    margin-left: 50% !important;
    transform: translateX(-50%) !important;
    display: flex;
    align-content: center;
    &:nth-of-type(even) {
        clip-path: map-get($code-paths, 1);
    }
    &:nth-of-type(odd) {
        clip-path: map-get($code-paths, 2);
    }
    code {
        width: 100%;
        display: inline-block;
        margin-left: auto !important;
        margin-right: auto !important;
        padding: ms(1) !important;
        max-width: 45.18rem !important;
    }
}
```

Men nja, nu är det nog dags att skrota allt, [skapa ett eget tema](http://k88hudson.github.io/syntax-highlighting-theme-generator/www/) eller titta vad andra gjort.

## Slutresultat

Vad det blev i slutändan syns på sidan och kommer säkert att ändras. Jag utgick från [Prism Duotone Space](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-duotone-space.css) för att få en enkel grund. Sedan ändrade jag på färgerna.

Klart.