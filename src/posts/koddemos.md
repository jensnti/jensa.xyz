---
title: Koddemos
date: 2022-05-20
tags: ['kod', '2.0']
templateEngineOverride: njk, md
lead: "Testkod för att skapa kodexempel, hämtad från 5t3phs sida med lite variation för att kunna visa annan kod är css."
category: anteckning
---

## Varför

Min tanke är att kunna använda den här sidan för att hosta kodexempel som jag använder i mina kurser. För närvarande är materialet på ett antal olika sidor:
* [Exempel för webbutveckling](https://jensnti.github.io/wu-exempel/)
* [Webbserverprogrammering](https://jens-andreasson.gitbook.io/webbserverprogrammering/)
* [Webbutveckling](https://jens-andreasson.gitbook.io/webbutveckling/)

En del av materialet är i behov av uppdatering så när jag började titta på det och arbetade med en uppdaterad version av exempel för webbutveckling så kändes det som en rimlig ambition att flytta koden hit.

## Hur

Det är inte första eller sista gången jag vänder mig till Eleventy-communityn för  att hitta kod, exempel och ideer. Basen till koden för mina demos kommer från [11ty.rocks](https://11ty.rocks/posts/eleventy-templating-static-code-demos/) en sida skapad av [Stephanie Eckles](https://twitter.com/5t3ph).

Det första exemplet som jag arbetade med är kopierat från den sidan. Jag har dock bytt ut ```<details>``` elementet för att skapa tabbar. Jag ville kunna använda tabbar för koden eftersom jag vill kunna visa html, css och javascript.

{% set demo = collections.orderedDemos | getDemo("CSS Centering") %}
<article>
    <h2 id="{{ demo.data.title | slugify }}">
        <a class="header-anchor" href="#{{ demo.data.title | slugify }}">
            <span aria-hidden="true">#</span></a> {{ demo.data.title }}
    </h2>
  {{ demo.templateContent | safe }}
</article>

Lösningen kombinerar en massa olika delar, på den här sidan laddas exemplet med följande kod.

```twig
{% raw %}{% set demo = collections.orderedDemos | getDemo("CSS Centering") %}
<article>
  <h2 id="{{ demo.data.title | slugify }}">{{ demo.data.title }}</h2>
  {{ demo.templateContent | safe }}
</article>
{% endraw %}
```

Vi väljer önskad demo och laddar den från collections. Det mesta har dock skett innan detta då demosar sparas som njk poster på sidan som i sin tur använder en partial för att formateras. Denna funktionalitet kommer från 5t3phs kod.

```twig
{% raw %}---
title: "CSS Centering"
order: 1
date: 2021-03-31
templateEngineOverride: njk, md
---

{% set description %}

**Put down the CSS centering jokes**! This modern update is often the solution you're looking for to solve your centering woes.

{% endset %}

{% set css %}
.centering {
    display: grid;
    place-content: center;
    min-height: 30vh;
}
.centering span {
    padding: .5em;
    outline: 2px solid;
}
{% endset %}

{% set javascript = false %}

{% set html %}
<div class="centering">
    <span>Feeling Centered</span>
</div>
{% endset %}

{% include "partials/components/demo/template.njk" %}
{% endraw %}
```

Den utökning jag har gjort ses i javascript/html delarna och formatteringen och för  att se det behöver vi titta på templaten. Den här templaten är uppmärkt med en brappiljard raw taggar för att den faktiska koden ska synas, oklart om allt är rätt men här är den i alla fall. Jag är tveksam till att den går att kopiera eller att använda eftersom den är otroligt petig med whitespace, så om du är intresserad av att faktiskt använda det, kolla på [demo template](https://github.com/jensnti/jensa.xyz/tree/main/src/_includes/partials/components/demo/template.njk).

```twig
<div class="demo">

{% raw %}{%- if not hideDemo -%}{% endraw %}
<style>{% raw %}{{- css | safe }}{% endraw %}</style>
{% raw %}{%- endif -%}{% endraw %}

{% raw %}{% if javascript %}{% endraw %}
<script>{% raw %}{{- javascript | safe }}{% endraw %}</script>
{% raw %}{%- endif -%}{% endraw %}

{% raw %}{% if not hideDescription %}{% endraw %}
{% raw %}{{ description | safe }}{% endraw %}
{% raw %}{% endif %}{% endraw %}

<div class="demo__code">
{% raw %}{% if html %}{% endraw %}
<div id="html-{% raw %}{{ title | slugify }}{% endraw %}" class="tab">

{% raw %}{% highlight "html" %}{% endraw %}
{% raw %}{{- html | safe }}{% endraw %}
{% raw %}{% endhighlight %}{% endraw %}
</div>
{% raw %}{% endif %}{% endraw %}
{% raw %}{% if css %}{% endraw %}
<div id="css-{% raw %}{{ title | slugify }}{% endraw %}" class="tab">

{% raw %}{% highlight "css" %}{% endraw %}
{% raw %}{{- css | safe }}{% endraw %}
{% raw %}{% endhighlight %}{% endraw %}
</div>
{% raw %}{% endif %}{% endraw %}
{% raw %}{% if javascript %}{% endraw %}
<div id="js-{% raw %}{{ title | slugify }}{% endraw %}" class="tab">

{% raw %}{% highlight "javascript" %}{% endraw %}
{% raw %}{{- javascript | safe }}{% endraw %}
{% raw %}{% endhighlight %}{% endraw %}
</div>
{% raw %}{% endif %}{% endraw %}

<ul class="tabs group">
{% raw %}{% if html %}{% endraw %}
<li>
    <a href="#html-{% raw %}{{ title | slugify }}{% endraw %}">HTML</a>
</li>
{% raw %}{% endif %}{% endraw %}
{% raw %}{% if css %}{% endraw %}
<li>
    <a href="#css-{% raw %}{{ title | slugify }}{% endraw %}">CSS</a>
</li>
{% raw %}{% endif %}{% endraw %}
{% raw %}{% if javascript %}{% endraw %}
<li>
    <a href="#js-{% raw %}{{ title | slugify }}{% endraw %}">Javascript</a>
</li>
{% raw %}{% endif %}{% endraw %}

</div>
{% raw %}{%- if not hideDemo -%}{% endraw %}
<div class="demo__playground">
{% raw %}{{- html | safe }}{% endraw %}
</div>
{% raw %}{%- endif -%}{% endraw %}
</div>

<style>
#html-{% raw %}{{ title | slugify }}{% endraw %}:target ~ .tabs li > a[href="#html-{% raw %}{{ title | slugify }}{% endraw %}"],
#css-{% raw %}{{ title | slugify }}{% endraw %}:target ~ .tabs li > a[href="#css-{% raw %}{{ title | slugify }}{% endraw %}"],
#js-{% raw %}{{ title | slugify }}{% endraw %}:target ~ .tabs li > a[href="#js-{% raw %}{{ title | slugify }}{% endraw %}"] {
    background: var(--color-dark);
    color: var(--color-light);
    border-color: var(--color-dark);
}
</style>
```

Ganska så rörigt, tack och lov så behöver en kanske inte vara och peta i filen. Den sista delen är kopplat till tabbarna och krävs för att styla den aktiva tabben. Tabbarna är gjorda helt med css och förlitar sig på target selectorn genom fragment länkar (#id). Detta gör även att om jag vill länka till en bit av koden så använder jag helt enkelt en fragment länk.

```css
.tab {
    display: none;
}

.tab:target {
    display: block;
}

.tab:not(:target) {
    display: none;
}
```

## Slutsats

Jag är hyffsat nöjd och det fungerar. Nu är det good enough och fokuset ligger på innehåll.