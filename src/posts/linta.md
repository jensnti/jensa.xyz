---
title: Linta
date: 2021-12-06
lead: 'Automatisk kodformattering och hjälp med stilen, det kan väl vara trevligt.'
tags: ['eslint', 'praxis', 'prettier']
category: resurs
---

Jag tänkte först att jag skulle skriva den här posten för ett par veckor sedan, men tiden försvann till annat. Ibland är det bra att låta saker och texter gro, det är en lärdom från den här sidan, men i det här fallet har jag nog till viss del glömt vad jag ville skriva.

Grunden till en post om att linta var att jag fixat [ESLint](https://eslint.org/) för [Tema, Område, Del](https://github.com/jensnti/tod) och den här sidan. Som ett minnesmärke till skrivandet hade jag lämnat följande rad.

```bash
npm i --save-dev prettier eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-simple-import-sort
```

## ESLint

Är ett kod-verktyg/-hjälpmedel som analyserar din kod och hjälper dig att hitta problem. ESLint kan fixa problem men kan även ställa till det en del. Att följa reglerna som ESLint har kan tyckas vara självklart utan ett verktyg, men det är ett hjälpmedel och när det börjar bli mycket kod så kan det hjälpa.

ESLint har en uppsjö plugins och regelsystem så det är bara att välja och vraka. Det kan vara lite pill att få till konfigurationen, men jämfört med andra val så tycker jag det är värt det.

Min konfiguration för det här projektet ser ut som följer.

```json
{
    "env": {
        "browser": true,
        "node": true
    },
    "extends": ["eslint:recommended", "plugin:prettier/recommended"],
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module",
        "impliedStrict": true
    },
    "plugins": ["prettier", "simple-import-sort"],
    "rules": {
        "prettier/prettier": ["error", {}, { "usePrettierrc": true }],
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error"
    }
}
```

Den använder både node och browser som environment, eftersom [Eleventy](https://www.11ty.dev/) är javascript i node och det finns även med script som körs i webbläsaren. Utöver det har jag valt eslint:recommended inställningen samt att jag kör formatteringen från [Prettier](https://prettier.io/) med [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier).

## Prettier

Som komplement till ESLint använder jag [Prettier](https://prettier.io/) som är ett annat kod-verktyg/-hjälpmedel för formattering. Tillsammans så tycker jag att de
i de flesta fallen fungerar riktigt bra.

Prettier har relativt lite inställningar och går fort att få igång. Det fungerar även utmärkt utan ESLint och går att konfigurera i VSCode eller med en konfigurationsfil. För VSCode finns det en extension, [Prettier formatter for VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

```json
{
    "semi": true,
    "tabWidth": 4,
    "printWidth": 80,
    "singleQuote": true,
    "trailingComma": "es5"
}
```

## Automatisera

Prettier kan köras på save i VSCode om så önskas, alternativt är att formattera manuellt (SHIFT+ALT+F).
För att linta alltihop så går det att köra från npm i terminalen, i `package.json`.

```json
"scripts": {
    ...
    "lint": "eslint --fix .",
    "format": "prettier --write './**/*.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc"
},
```

Glöm inte att lägga till `node_modules` i `.eslintignore`.

## Problem

Inte helt oväntat så stötte jag på en del problem med att få igång verktygen jag valt för sidorna. Ett av problemen var som tidigare nämnt att ESLint validerade både browser och node kod. Det blev även lite konflikt kring ECMAversion.

Ett område som jag inte riktigt har en bra lösning på är dock arbetet med Eleventy. Formatteringen av Markdown går sådär och ibland så saboteras front-matter fullständigt. I andra fall så blir [Nunjucks](https://mozilla.github.io/nunjucks/) filer en ren röra och det går inte överhuvudtaget med kod-snuttar i Nunjucks.

Tyvärr så sviker mig minnet något här och denna post blev främst en en lista över vad jag använder. Kanske användbart.
