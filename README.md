# montessori
Dictée Montessori

## TODO

* Horizontally and vertically center image
* Play animations on wrong, good and end
* Maybe choose letter order and font (lower and upper, cursive or not)
* Sort words regarding their difficulty or specific phonem learning
* Avoir plusieurs sons pour la même lettre qu'on peut écouter à chaque fois que l'on clique dessus.
* Avec un autre niveau de difficulté, permettre l'écoute des 31 phonèmes complexes montessori pour s'aider à trouver des mots comme chat, soleil, roi tout seul sans que le phonème soit déjà positionné
* Peut-être précharger tous les sons au début (voir avec un loader)
* Gérer les erreurs sur le fichier JSON et sur les mots et son manquant
* Pouvoir définir quelle lettre sera prononcé en fonction du mot (ex: bèc pour bec)
* Jouer toutes les lettres et le son du mot à la fin avec une petite animation

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