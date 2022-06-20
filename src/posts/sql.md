---
title: SQL
date: 2022-05-16
tags: ['setup', 'sql']
templateEngineOverride: njk, md
category: resurs
---



SQl skrivs som frågor (querys).  Du behöver välja att använda en databas för att kunna göra detta. Det förutsätter förstås att en databas finns. SQL frågor skrivs ofta med gemener för att visa kommandot, detta är dock inget krav då MySQL inte gör en skillnad på stora och små bokstäver för detta (men databasnamn är skifteskänsliga). 

```sql
CREATE DATABASE my_database;
USE my_database;
```

{% image "./src/images/Screenshot 2022-05-16 120900.png", "Skärmdump av MySQL-klienten", "Så här kan det se ut när du skapar en ny databas och tabell." %}

För att skapa en tabell i databasen så används `CREATE` kommandot men för att skapa en table så behöver vi ange minst ett fält för databasen. Vi passar även på att specificera teckenkodningen som utf8mb4 (vilket är som utf-8 vi är vana vid).

```sql
CREATE TABLE tabellnamn (id INT UNSIGNED AUTO_INCREMENT, PRIMARY KEY(id))
    ENGINE = innodb
    DEFAULT CHARSET = utf8mb4;
```

Slutligen kan vi inspektera den tabell vi skapat.

```
DESCRIBE tabellnamn;

+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| id    | int unsigned | NO   | PRI | NULL    | auto_increment |
+-------+--------------+------+-----+---------+----------------+
1 row in set (0.00 sec)
```

För att tabellen faktiskt ska hålla data