# Analyse des besoins client

## Ce qu'on a comprit de la vidéo

Structure bdd avec petite orga
Projet pour une école (contacté par le responsable du projet)

Plateforme de quizz :

- Titre
- Thématique (info, etc.)
- Sujets (espace, relativité, etc.) avec auteurs signés

- Chaque quizz à des questions (le responsable fournira un schéma).
- Du contexte pour les questions et niveaux de difficultés (débutant, etc.).

Zone de connexion
récap des scores

Pas besoin de stocker, consommation instantanée
Faire une structure bdd
Veulent utiliser PHPMyAdmin

Schéma de la structure de la base de données à fournir au client

chaque eleve peut se co (page login)
les quiz ont des theme, un sujet, un auteur (signé), une difficulté (débutant, confirmé voir plus), des réponses possible, un type de question(?), un contexte
analyse avec des réponse (page de correction)
Analyse recap Score (pas mémorisé en DB)

- Quiz
- Theme
- Sujet
- Auteur
- Question (type de question ?, un contexte)
- Difficulté (débutant, confirmé, etc...)
- Réponses (vraies ou fausses)

## Clarifications possibles

- le niveau c'est à choisir par le candidat ou c'st en fonction des résultat de quiz ?
  - Chaque va avoir un niveau de difficulté. Libre aux étudiants de passer tel ou tel quiz.
- Quel est votre budgert ?
  - Mon budget sera le votre (efin... On verra)
- On a un auteur par Quiz ou par Question ?
  - Un auteur par Quiz sera suffisant.
- Un quiz sera fait a partir de questions pouvant etre reutilisees dans un autre quiz ou chaques questions seront liees a un quiz precis ?
  - Chaque questions seront liées à un Quiz précis. Les questions ne seront pas réutilisable d'un quiz à l'autre pour simplifier la gestion.
- La gestion des thèmes / sujets n'est pas clair. Est ce qu'il ne serait pas judicieux de seulement parler de thème ou de sujet ?
  - Non j'aime bien mon idée!
    - Ok, le fait de gérer simplement des thèmes sera plus simple pour vous côté gestion et plus simple/rapide à dev. Du coup moins cher...
  - Ah ! si c'est moins LET'S GO !! Du coup pour faire simple : chaque Quiz aura des "catégories" qu'on appelera des `Tag`
- Ok, est ce qu'un Quiz peut avoir plusieurs catégories / `Tag` ?
  - Yes !
- Vous avez dit que vos questions auraient des types, serait-il possible d'avoir plus de précision?
  - Oui, j'avais dans l'idée de pouvoir proposer des types de réponses différentes, mais pour faire plus simple (et pour économiser un peu pcq mon pote Elon a besoin que je finance son dernier projet), on va oublier ça ! On aura qu'un seul type de réponse : les cases à cocher !
- Est ce que pour chaque question il peut y avoir une seule ou plusieurs réponses possibles?
  - J'ai prévu de n'avoir qu'une seule réponse possible pour les questions !
- Delais de livraison ?
  - Aller, on se dit dans 11 épisodes c'est bon ?
- le niveau de difficulté est lié au quizz ou au question?
  - Au question !
- Le score s'affichent sur chaque question au fur et a mesure ou vraiment qu'a la fin avec le total ?
  - A la fin, sur une page dédiée qui affichera le score
- Le thème du site peut être propre à lui-même ou il doit se baser sur celui du site du collège ou une charte graphique spécifique ?
  - Ici, vous avez carte blanche, faite nous révez
- les éléments demandés lors de la création du compte? par ex s'il souhaite juste le mail + mdp, ou s'il faut un profil complet
  - Les infos de bases : nom, prenom, email, mdp...
