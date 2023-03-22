# MLD

Le **Modèle Logique de Données** se rapproche un peu plus de ce qu'on va avoir en base de données. C'est la traduction directe du MCD.

Ici on va pouvoir utiliser les mots techniques :

- Id
- Tables
- Colonnes
- Clés étrangères
- etc

## Règles de transformations

- Toute entité du MCD devient une table du MLD. Les propriétés de ces entités deviennent les colonnes des tables. Le discriminant de l’entité devient une colonne comme les autres, simplement assortie d’une contrainte d’unicité. (La clé primaire de la table sera un id auto-généré par le SGBD)

- Si l’une des cardinalités max. vaut 1, une clé étrangère est créée du côté de l’entité où se trouve le 1. Cette clé étrangère fera référence à l’identifiant dans la table associée.

- Si les deux cardinalités max. sont n, donc une relation « plusieurs à plusieurs » la relation devient une table à part entière en relation avec les deux entités. On parle de table de liaison, d’association, de jonction ou de correspondance. Cette table de liaison contient 2 clefs étrangères vers les 2 tables à lier.

## Correction MLD

- user( id, firstname, lastname, email, password )
- quiz( id, title, description, #user(id) )
- question( id, description, info, #quiz(id), #level(id), #answer(id) )
- level( id, name )
- answer( id, description, #question(id) )
- tag( id, name )
- quiz_has_tag( #quiz(id), #tag(id) )
