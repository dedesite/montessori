import { Injectable } from '@angular/core';

import { Grapheme } from './grapheme';
import { Word } from './word';

import { GRAPHEMES } from './data/graphemes-fr';
import { WORDS } from './data/words-fr';

export class LanguageGraphemes {
  vowels: Grapheme[] = [];
  consonants: Grapheme[] = [];
  complexes: Grapheme[] = [];
};

@Injectable()
export class GraphemeService {
  getGraphemes(){
    //@todo handle this with a promise
    let graphemes = new LanguageGraphemes();
    GRAPHEMES.vowels.split('').forEach(grapheme => {
      let g = new Grapheme(
        'vowel',
        GRAPHEMES.multipleSoundsGraphemes[grapheme] != null ? GRAPHEMES.multipleSoundsGraphemes[grapheme] : [grapheme],
        grapheme
      );
      graphemes.vowels.push(g);
    });

    GRAPHEMES.consonants.split('').forEach(grapheme => {
      let g = new Grapheme(
        'consonant',
        GRAPHEMES.multipleSoundsGraphemes[grapheme] != null ? GRAPHEMES.multipleSoundsGraphemes[grapheme] : [grapheme],
        grapheme
      );
      graphemes.consonants.push( g);
    });

    GRAPHEMES.complexes.forEach(grapheme => {
      let g = new Grapheme(
        'complex',
        [grapheme],
        grapheme
      );
      graphemes.complexes.push(g);
    });

    return graphemes;
  }

  private getWordGrapheme(description: string) {
    let phonem: string[] = [];
    let isMute = false;
    //muted graphems are describe like this '_e' in the word
    if (description.length > 1 && description.charAt(0) == '_') {
          isMute = true;
          description = description.charAt(1);
    }

    //graphems that fileName differently are describe like this 'e_è' in the word
    if (description.length > 2 && description.charAt(1) == '_') {
      phonem.push(description.charAt(2));
      description = description.charAt(0);
    }
    let graphemeType: string;
    if (description.length > 1) {
          graphemeType = 'complex';
    }
    else {
          graphemeType = GRAPHEMES.vowels.indexOf(description) != -1 ? 'vowels' : 'consonant';
    }
    return new Grapheme(graphemeType, phonem, description, true, isMute);
  }

  //@todo put this into a separate service (but it'll need GraphemeService)
  getWords() {
    let words: Word[] = [];
    //@todo put this into a promise
    WORDS.forEach(word => {
      let wordGraphemes: Grapheme[] = [];
      let fileName: string = '';
      word.forEach(description => {
        let g = this.getWordGrapheme(description);
        wordGraphemes.push(g);
        //the fileName of the word is a concatenation off all the graphemes
        fileName += g.representation;
      });

      words.push(new Word(wordGraphemes, fileName));
    });

    return words;
  }

  //@todo : this need to be put into a promise
  preloadSounds(words, phonems) {
    words.forEach(w => {
      const a = new Audio(`./assets/sounds/words/${w.fileName}.mp3`);
    });
    phonems.forEach(p => {
      const a = new Audio(`./assets/sounds/phonems/${p.representation}.mp3`);
    });
  }
}
