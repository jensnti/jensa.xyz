---
title: BEM
date: 2021-06-22
tags: ['css', 'metod', 'bem']
---

{% lead %}
Block, element and modifier(BEM) är det engelska namnet för en metod att döpa CSS klasser i projekt. Jag har aldrig riktigt brytt mig om detta men för just den här sidan har jag gjort ett försök.
{% endlead %}

Tanken är att döpa element så att det ska vara begripligt vad det är för element så att det underlättar underhåll i större applikationer. Det är förmodligen inte nödvändigt i det här fallet, men samtidigt så skadar det sällan att använda en tydlig metod. Att få in lite övning är dessutom en bonus.

Namngivningen i BEM strävar efter att vara semantisk.

Förhoppningsvis har jag inte missförstått hela grejjen och gjort ett hyffsat försök.

## Block

Ett block är en funktionell komponent. Blockets namn ska beskriva dess funktion och syfte. Ett block är en fristående del med en egen mening.

Ett blocks namn anges med ```class``` attributet.

```scss
.site-head {
    ...
}

.post {
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

.post {
    &__foot {
        ...
    }
}
```

## Modifier

En modifier används för att definiera ett block eller elements egenskaper. Det kan exempelvis röra sig om booleska modiferare. 

En modifiers namn är separaret från ett block eller element med **ett** understreck ```_```.

```scss
.site-head {
    &_dark {
        background-color: $dark;
    }
}
```

### Mer läsning

* https://en.bem.info
* http://getbem.com/introduction/
* https://css-tricks.com/bem-101/
* https://www.smashingmagazine.com/2014/07/bem-methodology-for-small-projects/