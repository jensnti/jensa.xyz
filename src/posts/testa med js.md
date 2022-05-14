---
title: Testa med JS
date: 2022-05-14
lead: I veckan omarbetade jag en uppgift från det här läsåret. Jag skapade tester som ska fungera som milstolpar i arbetet för eleverna. Att skriva tester är inte något jag gjort i större utsträckning och jag tänkte skriva om några lärdomar.
tags: ['skola', 'javascript', 'tester']
---

Min utgångspunk blev en kort en artikel, [How to test Express.js...](https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/) om att testa [Express](https://expressjs.com/) med [Jest](https://jestjs.io/) och [Supertest](https://www.npmjs.com/package/supertest). Jag hade dock inte något behov av babel, så jag installerade följande:

```bash
npm install --save-dev jest supertest supertest-session
```

Testen skapades i mappen ```__tests__```. Eftersom det jag önskade testa var setup, routes, session och databas så delade jag upp testen i olika filer. Filerna numrerades för att få dem att köras i ordning (det finns säkert andra sätt att göra detta på).

Exempel på ett första test:
```js
const app = require('../app');
const request = require('supertest');

describe('1. Setup', () => {
    describe('GET / ', () => {
        it('should return a 200 response', async () => {
            expect.assertions(1);
            const response = await request(app).get('/');
            expect(response.statusCode).toBe(200);
        });
    });
});
```

Testet är skapat för att se om eleverna fått igång sin app/server. Här är det viktigt att notera att supertest kör ```app.js```, för att starta upp testservrar. Jag har kört [Express-generator](https://www.npmjs.com/package/express-generator) för att scaffolda projektet och när npm startar http-servern så används filen ```bin/www``` som i sin tur startar ```app.js```.

```js
/* bin/www */
var server = http.createServer(app);
server.listen(port);
```

Det är viktigt att förstå att det inte blir riktigt samma process som när du kör igång din egen utvecklarserver och vissa problem kan manifisteras som inte annars märks. Till exempel som att din databaspool ligger och puttrar, din session inte är bortplockad, promises ligger och väntar och så vidare.
Detta visar sig i att Jest spottar ur sig meddelandet, **Jest has detected the following 1 open handle potentially keeping Jest from exiting**.
En googling eller tre på området gav ingen nyttig information och anledningen till detta är (tror jag) att felet inte är Jests, utan en brist på förståelse för processen som Jest kör.

## Lösning

**Se till att städa efter dig!** För det här projektet använder jag [mysql2](https://www.npmjs.com/package/mysql2) för databas-kopplingen och dess funktion för en connection pool med promises. Den städar upp connections, men den lämnar även poolen öppen för nyttjande. Detta ledde till att Jest inte avslutades. För att åtgärda det så behövde jag stänga poolen när jag var klar med testerna, i mina tester (något som jag inte kan göra i min serverkod, då stängs poolen som faktiskt behöver vara öppen).

Så för teardown efter alla tester körts så använder jag funktionen afterAll och stänger poolen.

```js
afterAll(async () => {
    await pool.end();
});
```

För att testa databasen så är även ```beforeAll()``` viktigt att känna till så att du kan skapa users eller liknande. Jest har mer om dessa funktioner i dokumentationen, [Setup and Teardown](https://jestjs.io/docs/setup-teardown).

Att använda både setup och teardown blev även aktuellt för att kunna testköra sessions på servern. Här valde jag att använda paketet Express-session. Det skapar en server likt supertest som du kan testa mot.

```js
let authenticatedSession;
beforeAll(async () => {
    let testSession = await session(app);
    await testSession.post('/login').send({...});
    authenticatedSession = testSession;
});
```

Med det på plats så används authenticatedSession i alla test som behöver sessions. Men glöm inte att avsluta sessionen om Jest inte avslutar korrekt.

```js
await authenticatedSession.destroy();
```

## Avslutning

Så det var en lärdom från att skriva lite tester, förstå hur din kod körs och hur testerna faktiskt fungerar. Min ambition ör att det ska bli mer tester kommande läsår både på [teknikprogrammet](https://www.ntigymnasiet.se/program/informations-och-medieteknik/umea/) och på [te4](https://www.ntigymnasiet.se/program/mjukvarudesign/umea/). Jag har tänkt det förut, men för min det gäller det att komma över tröskeln så jag är bekväm med det. Med det sagt så är jag osäker på vad som är god praxis gällande tester i större utsträckning. 

För att skriva många av testerna till det här projektet så visade sig GitHub Copilot vara en hjälpsam parprogrammerare, med otaliga förslag om att testa input element efter input element.