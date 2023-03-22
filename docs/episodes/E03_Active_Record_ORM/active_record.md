# Active Record

C'est un **design pattern** qui, tout comme dataMapper, permet de gérer la persistance des donénes dans une application.  
Bien que le 2 patterns ont le même but, ils diffèrent dans leur approche.

Dans ce pattern, une classe va représenter un enregistrement de la DB.  
Cette classe va contenir les propriétés des enregistrements de la DB mais également des méthodes pour les manipuler !

=> En Active Record : une classe va représenter une table de la DB et contenir les méthodes afin de lire, créer, modifier et supprimer ses entrées.

## DataMapper

Le pattern DataMapper va séparer la représentation des données et la manipulation de ces dernières !  
Il va y avoir des classes représnetant les tables et qui vont contenir les attributs.  
Mais la logique de manipulation des données va se trouver dans un objet `dataMapper`

On dit que les instances de classes sont des **objets domaines**

## Cas d'utilisation

- Active Record est bien à utiliser dans des projets avec de DB pas trop grandes. Imaginez devoir faire plusieurs centaines de classes pour modéliser chacune des tables...
- DataMapper sera plus utilisé sur des projets avec de DB de grandes enbergures ! Permettant moins d'écriture de classes et de mieux séparer les concepts !
