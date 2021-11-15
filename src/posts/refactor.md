---
title: Refactor
date: 2021-11-13
lead: 'Kurswebbsystemet, TOD, behövde en uppdatering för att tillåta slutuppgifter. Det var inte tvärenkelt att bara lägga till.'
tags: ['TOD', 'pedagogik', 'eleventy', 'javascript']
---

Jag har tidigare skrivit om kurswebbsystemet jag byggt, [Tema, område, del](/tag/tod). Det är ett ständigt work in progress (vad är inte det) och jag har inte tidigare riktigt fått till uppgiftsfunktionen som jag önskat.

Tidigare så fanns ingen data i systemet över vilka teman, områden, delar och uppgifter som existerade. Detta för att jag inte ville att en sådan data skulle behöva skapas manuellt. Systemet är skapat med iden att det ska vara tämligen enkelt att köra igång en kurswebb och fokus ska ligga på att skriva innehåll (sen kanske det är ofrånkomligt att viss programmeringskunskap krävs). Det fungerade så att när en användare checkade av en uppgift som klar så skapades ett objekt för att identifiera detta i localstorage.
När sidan laddades kollades detta och på så vis uppdaterades uppgiftsstatusen (och det skapades en progress för kursens startsida).

{% image "./src/images/tod-progress.png", "Skärmdump av startsidan på programmeringswebben.", "Illustration, startsida - progress." %}



