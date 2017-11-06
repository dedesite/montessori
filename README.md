# TODO

- Bugs avec les graphemes complexes :
  - Quand ils sont décomposé, le mot n'est pas "found" même s'il l'est
  - Si on passe de composé à décomposé, on perd le found, même s'il l'était (je sais pas si c'est clair). 
- Factoriser le code lié au son
- Peut-être ne pas mettre les accents à et î ? Ou alors pour un niveau plus élevé ?
- Quand on décomposer les phonèmes complexes c'est pas que des voyelles (voir bug dans le code)
- Attention a ne pas avoir des mots qu'avec phonèmes complexe quand on affiche ces mots, sert à rien
- A la lecture finale du mot, ne pas prononcer les lettre muette et prononcer les phonèmes complexes au lieu des lettres (ex : serpent, 's' 'e' 'r' 'p' 'en' au lieu de 's' 'e' 'r' 'p' 'e' 'n' 't')
- Trouver un moyen propre de mettre grapheme dans un component
  => a besoin des variable de app (majuscule, cursive etc.)
  => et de certaines de ses fonction (applyCase => peut-être la mettre exclusivement dans grapheme)
  => comment créer le composant dans le template ?

# DONE

- Ne pas afficher le bouton majuscule pour les lettres cursives
- N'afficher les phonèmes complexe que quand ils ne sont pas présents dans les mots

# MontessoriAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
