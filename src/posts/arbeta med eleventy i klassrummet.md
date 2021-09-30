---
title: Arbeta med Eleventy i klassrummet
date: 2021-09-29
lead: 'Terminen har rullat igång och jag har börjat använda Eleventy i undervisningen.'
tags: ['eleventy', 'skola', 'webbutveckling']
---

Efter en vår och sommar där jag använt [Eleventy](https://www.11ty.dev/) för egen hand till flera projekt så har jag valt att börja använda Eleventy i klassrummet. Utifrån vad Eleventy är tycker ([static site builder/generator](https://www.11ty.dev/docs/)) jag att det passar utmärkt att använda i kursen [Webbutveckling 2](https://www.skolverket.se/undervisning/gymnasieskolan/laroplan-program-och-amnen-i-gymnasieskolan/gymnasieprogrammen/amne?url=1530314731%2Fsyllabuscw%2Fjsp%2Fsubject.htm%3FsubjectCode%3DWEU%26tos%3Dgy&sv.url=12.5dfee44715d35a5cdfa92a3) (länken fungerar eventuellt, [Skolverket](https://www.skolverket.se/) kör random på sina länkar en gång i veckan).

Eleventy är tillräckligt tillgängligt för att eleverna ska kunna använda det och startsträckan är hanterbar. Jag använder [Windows Subsystem Linux](https://docs.microsoft.com/en-us/windows/wsl/install) (eleverna får installera och använda) i min undervisning för att arbeta med [Node](https://nodejs.org/) i [Webbserverprogrammering 1](https://www.skolverket.se/undervisning/gymnasieskolan/laroplan-program-och-amnen-i-gymnasieskolan/gymnasieprogrammen/amne?url=1530314731%2Fsyllabuscw%2Fjsp%2Fsubject.htm%3FsubjectCode%3DWES%26tos%3Dgy&sv.url=12.5dfee44715d35a5cdfa92a3) (jag tycker inte riktigt att Windows-versionen är användbar + att det är rätt bra att kunna lite bash tycker jag). Eleventy blir således ett utmärkt verktyg för att ta arbetet med HTML och CSS till nästa nivå och börja inkludera verktyg som npm, sass och rollup (eller en bundler av valfri sort).

Att arbeta med Eleventy mot [Netlify](https://www.netlify.com/) ger även en utökad förståelse för hosting och liknande tjänster. Jag har tidigare arbetat med hosting genom [GitHub pages](https://pages.github.com/), så det är en naturlig progression. Att ha Netlify som hosting och att den triggar på pushes till main är även ett utmärkt sätt att få eleverna att arbeta i branches.

De första vi skapat är någon form av personlig sida, blog eller portfolio. Det är framförallt ett sätt att testa och prova Eleventy innan vi går vidare till ytterligare projekt. 

