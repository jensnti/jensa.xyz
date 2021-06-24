---
title: BEM
date: 2021-06-22
lead: 'Block, element and modifier(BEM) är det engelska namnet för en metod att döpa CSS klasser i projekt. Jag har aldrig riktigt brytt mig om detta men för just den här sidan har jag gjort ett försök.'
tags: ['css', 'metod', 'bem']
---

Tanken är att döpa element så att det ska vara begripligt vad det är för element så att det underlättar underhåll i större applikationer. Det är förmodligen inte nödvändigt i det här fallet, men samtidigt så skadar det sällan att använda en tydlig metod. Att få in lite övning är dessutom en bonus.

Namngivningen i BEM strävar efter att vara semantisk.

Förhoppningsvis har jag inte missförstått hela grejjen och gjort ett hyffsat försök. 😔

## Block

Ett block är en funktionell komponent. Blockets namn ska beskriva dess funktion och syfte. Ett block är en fristående del med en egen mening.

Ett blocks namn anges med ```class``` attributet.

```scss
.site-head {
    ...
}

.post-list {
    ...
}
```

## Element

Element är en del av ett block som inte kan användas utan det block som elementet tillhör. Ett element har en semantisk koppling till blocket.

Ett elements namn är separerat från blockets med **två** understreck ```__```.

```scss
.site-head {
    &__title {
        ...
    }
}

.post-list {
    &__item {
        ...
    }
}
```

## Modifier

En modifier används för att definiera ett block eller elements egenskaper. Det kan exempelvis röra sig om booleska modiferare. 

En modifiers namn är separaret från ett block eller element med **ett** understreck ```_```, docker verkar det finnas alternativet(se [css-tricks BEM-101](https://css-tricks.com/bem-101/)) **två** streck, ```--```.

```scss
.post-list {
    &__item {
        ...
        &_active {
            font-weight: 600;
        }
    }
}
```

## Slutsats

Eftersom jag använt scss som jag gjort på sidan så kanske jag mest har använt BEM liknande class-namn. I [artikeln](https://www.smashingmagazine.com/2014/07/bem-methodology-for-small-projects/) från Smashing mag så diskuteras det en del hur BEM undviker cascade i CSS, något som jag förstår poängen med, men samtidigt så är cascde en feature i språket.
CSS-tricks artikeln är lite inne på det spåret också där de förklarar hur en kan jobba med scss och BEM, något som jag inte gjort och typ pajjar i mina exempel här ovan.

Jaja.

### Mer läsning

* https://css-tricks.com/bem-101/
* https://www.smashingmagazine.com/2014/07/bem-methodology-for-small-projects/
* https://en.bem.info
* http://getbem.com/introduction/