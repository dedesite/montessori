# montessori
Dictée Montessori

## TODO

* Horizontally and vertically center image
* Sort words regarding their difficulty or specific phonem learning
* Peut-être précharger tous les sons au début (voir avec un loader)
* Gérer les erreurs sur le fichier JSON et sur les mots et son manquant
* Ajouter les touch event pour rendre le site compatible tablette et smartphone
* Revoir peut-être l'html pour être plus responsive
* Revoir la gestion des events jquery et de la génération html pour ne pas avoir à tout refaire à chaque fois
* Ajouter un système de points avec le nom des enfants

## Pour rajouter des mots

### Modification du fichier words.json

Modifier le fichier data/words.json et rajouter une ligne similaire aux lignes au dessus.
Les règles : 
* Commence par [ et fini par ]
* Chaque éléments du mot (lettre ou phonème complexes) doit être entre guillemet comme cela "" et séparer par une virgule (pas de virgule pour le dernier élément)
* Les lettres muettes doivent être précédées par un _ ex : "_e"
* Mettre une virgule après le ] si vous voulez rajouter des mots après

### Ajout du son

Mettre un fichier .mp3 dans le dossier sounds/words qui a exactemement le même orthographe que le mot en minuscule (ex : soleil.mp3)

### Ajout de l'image

Mettre un fichier .jpg dans le dossier img qui a exactement le même orthographe que le mot en minuscule (ex : soleil.jpg)

## Pour rajouter des lettres ou des phonèmes complexe

Mettre un fichier .mp3 dans le dossier sounds/letters, le fichier doit avoir exactement le nom de la lettre ou du phoneme en minuscule (ex : ï.mp3, oi.mp3)

## FAQ

### Si mon son ne se joue pas

Le fichier est surement mal placé ou mal orthographié ou avec une mauvaise extension (ex : .mpeg3)

### Si mon image ne s'affiche pas

Le fichier est surement mal placé ou mal orthographié ou avec une mauvaise extension (ex : .jpeg)

### Si je ne trouve plus de mots

Il y a surement une erreur dans le fichier json, vérifier qu'il est au bon format comme indiqué plus haut