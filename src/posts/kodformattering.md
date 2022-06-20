---
title: Kodformattering
date: 2021-06-21
tags: ['markdown', 'css']
category: resurs
---

Att kunna skriva kodexempel och visa kod på den här sidan är ett måste. Som tur är så finns det tillgängligt med Eleventys [Syntax Highlight Plugin](https://www.11ty.dev/docs/plugins/syntaxhighlight/). Det använder i sin tur [Prism](https://prismjs.com/) för att stila koden.

Att inkludera CSS för ett Prism-tema är sedan nästa steg. Detta följs av dilemmat kring att bli nöjd med helheten, Prism-temat och sidans stilar.
Önskar en fler teman än Prisms standard, så finns [Prism themes](https://github.com/PrismJS/prism-themes/blob/master/README.md) GitHub repo.

Min tanke för den här sidan ~~är~~/~~var~~ att utgå från [GitHubs](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-ghcolors.css) tema och sedan ändra. Vi ~~får se hur det går~~ kan nu se hur det gick.

## Installation och konfiguration

Installera först pluginet.

```bash
npm i @11ty/eleventy-plugin-syntaxhighlight
```

Pluginet behöver sedan laddas i konfigurationen.

```js
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
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
    referrerpolicy="no-referrer"
/>
<!-- eller -->
<link rel="stylesheet" href="{{ '/css/prism.css' }}" />
```

## Eget tema och stil

Fontstorleken behöver åtgärdas då den annars blev för stor för kodavsnitt.

```css
.text-small {
    font-size: ms(0) !important;
}
```

Just fonten flyttade sedan in i ett eget Prism-tema. Koden här nedan formaterar "kod-styckena" i texten.

```scss
$code-paths: (
    1: polygon(0 0, 100% 2%, 100% 98%, 0% 100%),
    2: polygon(0 2%, 100% 0, 100% 100%, 0 98%),
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

Detta tog inte direkt hand om temat dock.

## Slutresultat

Jag provade att skapa ett eget tema med en [generator](http://k88hudson.github.io/syntax-highlighting-theme-generator/www/) men blev inte så nöjd.
Vad det blev i slutändan syns på sidan och kommer säkert att ändras. Jag utgick från [Prism Duotone Space](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-duotone-space.css) för att få en enkel grund. Sedan ändrade jag på färgerna.

Här kan du titta på [CSS-resultatet](/css/prism.css).
