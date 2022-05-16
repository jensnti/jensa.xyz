---
title: Kom igång med webbserverprogrammering
date: 2022-05-16
tags: ['jobb', 'webbserverprogrammering', 'setup', 'node', 'wsl', 'mysql']
lead: Istället för att dela upp det jag skriver på flera olika sidor har jag bestämt mig för att samla det på ett ställe. Det här är alltså en introduktionspost till det du behöver för att komma igång med kursen webbserverprogrammering.
---

Den teknik, eller stack, vi använder i kursen är Node, Mysql och WSL.

## Windows Subsystem for Linux

WSL låter oss köra Linux under Windows. Det är i min mening helt fantastiskt och med det slipper vi dual-boot och massa annan ondska. Det är enkelt och smidigt och ger oss tillgång till bash i en terminal under Windows. Med WSL2 går det även att köra grafiska program om du så önskar.

Det är otroligt nyttigt att lära sig bash och att kunna använda Linux. Enklast är att köra Ubuntu (finns i Microsoft store) även om du får välja dist själv.

* [Installera WSL](https://docs.microsoft.com/en-us/windows/wsl/install)
* [Windows Terminal](https://docs.microsoft.com/en-us/windows/terminal/install)

När du installerar så var noga när du skapar en användare, glöm inte bort lösenordet. När installationen är slutförd så behöver du uppdatera din distro, följande förutsätter att du kör Ubuntu.

```bash
sudo apt update
sudo apt upgrade
```

I bash kan du sedan skapa en code mapp där du kan spara dina projekt.

```bash
cd
mkdir code
cd code
ls -la
```

{% image "./src/images/Screenshot 2022-05-16 115024.png", "Skärmdump av WSL", "Skärmdump av WSL" %}

### Några användbara bash kommandon

| Kommando | Beskrivning |
| --- | --- |
| `ls` | Listar innehållet i en mapp, `-la` för att se allt |
| `cd` | Går till en annan mapp |
| `mkdir` | Skapar en ny mapp |
| `touch` | Skapar en fil |
| `rm` | Tar bort en fil, ska du ta bort en mapp med filer lägg till `-rf`, recursive force |
| `cp` | Kopierar en fil |
| `mv` | Flyttar en fil |
| `cat` | Läser en fil och skriver ut den |
| `history` | Listar historik, du kan seadan köra kommandot från historiken med !# |

## Nodejs

[Node](https://nodejs.org/en/) är en javascript runtime byggd på Chrome V8s javascript motor. Tillsammans med [Express](https://expressjs.com/) blir Node den webbserver vi använder.
Vi använder Node för att det låter oss använda samma programmeringsspråk både för frontend och backend, javascript. Genom att använda Node får vi även en koppling till att använda [Node packet manager (npm)](https://www.npmjs.com/).

För att installera och köra Node samt NPM så använder vi oss utan Node Version Manager(nvm).

* [Installera Node](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl#install-nvm-nodejs-and-npm)

Mer om Node i ett första Express exempel.

## [Mysql](https://www.mysql.com/)

För att arbeta med databas så använder vi Mysql. Mysql är en relationsbaserad databas.
Vi använder SQL som databasspråk för att det är användbart och relevant att kunna. Vi kör MySQL för att det är en av de vanligaste databaserna.

MySQL körs med en server på din dator. Du kan sedan använda en client för att koppla upp dig till databasen. FÖr att installera MySQL server och klient.

```bash
sudo apt install mysql-server mysql-client
```

WSL verkar inte starta upp MySQL servern korrekt när det startas, så kom in i vanan att starta om servern.

```bash
sudo service mysql restart
```

Du är nu redo att skapa en databasanvändare på din server. Detta måste göras som superuser första gången. Detta gör du genom att koppla upp dig till databasservern som superuser med användaren root.

```bash
sudo mysql -u root
```

{% image "./src/images/Screenshot 2022-05-16 115805.png", "Skärmdump av MySQL-klienten", "Skärmdump av MySQL-klienten. Notera att trots varningen så är restarten av servern [  OK  ], vid fel så står det inte OK." %}

Väl inne i MySQL klienten så kör du följande kommando för att skapa en user med alla rättigheter. Kom ihåg att byta ut `username` och `password`.

```sql
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost';
FLUSH PRIVILEGES;
```

När du skapat användaren så avsluta med `exit`. Du kan nu ansluta till databasen igen med din skapade användare.

Mer SQL i det avsnittet.