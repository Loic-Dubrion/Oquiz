# Architecture

La question classique : kessessé ?
<p class="fragment">une étiquette sur une organisation</p>
<p class="fragment">Quelles sont les archis les plus répandues ?</p>

---

## MVC

Model - Vue - Controller

![mvc-simple](/slides/s5/mvc-simple.png)

<p class="fragment">La bonne nouvelle ? on le fait déjà !</p>

-- 

### Model

La couche Model est l'ensemble des classes qui définissent les objets manipulés par l'application, qui contiennent les données et, la plupart du temps, réalisent les opérations de stockage.

Protège l'intégrité des données en implémentant la logique métier.

<p class="fragment">Les "opérations de stockage" (le lien avec la BDD) peut se faire de différentes manières. On verra ça dans une minute.</p>

--

### Vue

Gère la présentation des données. 

`¯\_(ツ)_/¯`

--

### Controller

Gère l'aspect dynamique de l'application.
A partir de l'action demandée (requête utilisateur), il peut :
- récupèrer les données (avec le Model), les injecter dans la vue adéquate, et envoyer la réponse. (requêtes GET)
- récupérer des données utilisateurs (via les formulaires), les injecter dans un Model, provoquer la sauvegarde, et renvoyer une réponse. (requêtes POST)

--

## Avantages du MVC

<ul>
<li class="fragment">Séparation claire des concepts.</li>
<li class="fragment">DRY : un même model peut être utilisé par plusieurs views</li>
<li class="fragment">DRY : une même view peut être utilisée dans plusieurs contexte</li>
<li class="fragment">Modularité : je veux changer l'affichage, je n'ai que les views à refaire.</li>
</ul>


---

## SOA

Service Oriented Architecture

<p class="fragment">Un Service consiste en une fonction ou fonctionnalité bien définie. C'est aussi un composant autonome qui ne dépend d’aucun contexte ou service externe.</p>

--

## SOA

Le cockpit O'clock, par exemple, suit une architecture SOA. Les différents services sont : 
- l'authentification
- le partage d'écran
- la gestion des webcams et du son
- le chat
- et d'autres, moins visibles (comme des stats...)

Tous ces services sont indépendants, et contactés par une "application centrale", codée en React.

<p class="fragment">A noter que chacun de ces services respecte une archi ! Ils peuvent même être eux-aussi organisés en SOA !</p>

---

## D'autres pattern

- SAM : State-Action-Model (utilisé par Angular2)
- Micro-services : le principe du SOA poussé à l'extrême. (ex. Amazon Web Services)
- ....


---

## Liaison avec la BDD

2 grands modèles 
- DataMapper
- Active Record

<p class="fragment">Les deux fonctionnent très bien dans une archi MVC !</p>

--

### DataMapper

Un peu comme on fait en S4 : un objet centralise tous les appels à la Base de Données.

Utilisé par : 
- Doctrine (Symfony)
- Java Hibernate
- Alchemy (un framework Python)
- Microsoft .NET

--

## DataMapper

Avantages: 
- Performances supérieures (moins d'appels à la DB)
- Changement de DB facilité

Inconvénients:
- Un peu "lourd" à l'utilisation (bcp d'instructions)

--

## DataMapper

Un exemple abstrait:
```js
const student = new Student();
student.setName("Paul");

const student2 = new Student();
student2.setName("Henri");

const dataMapper = require('dataMapper');
dataMapper.addEntity(student);
dataMapper.addEntity(student2);

dataMapper.save(); // <- appel effectif à la DB
```

--

## Active Record

Chaque objet porte les requêtes qui le concernent !

Toutes les classes des Modèles auront donc des méthodes d'accès à la BDD.

Utilisé par : 
- Eloquent (Laravel - PHP)
- Django (un framework en Python)
- Ruby On Rails
- Sequelize

--

## Active Record

Avantages: 
- Facile et intuitif à manipuler (code léger)

Inconvénients:
- Un peu moins optimisé (plus d'appels à la BDD)
- Difficile de changer de DB : il faut refaire les models !

--

## Active Record

Un exemple abstrait
```js
const student = new Student();
student.setName("Paul");
student.save(); // <- appel effectif à la DB

const student2 = new Student();
student2.setName("Henri");
student2.save(); // <- appel effectif à la DB
```

--

Un dernier petit exemple (abstrait) : 
```js
// Avec dataMapper, tout est centralisé !
const allStudents = dataMapper.getAllStudents();

// Avec Active Record, chaque classe se débrouille !
const allStudents = Student.findAll();
```

---

# A l'attaque

On va coder les méthodes Active Record dans nos models! 