import { Component, OnInit } from '@angular/core';

import { GraphemeService, LanguageGraphemes } from './grapheme.service';
import { Word } from './word';
import { Grapheme } from './grapheme';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GraphemeService]
})
export class AppComponent implements OnInit{
  displayedGraphemes: Grapheme[] = [];
  isComplexGraphemesDisplayed = false;
  isToolbarDisplayed = false;
  isAlphabeticOrder = false;
  isCursiveFont = true;
  isUpperCase = false;
  isSolutionDisplayed = false;
  areMutedGraphemesDisplayed = true;
  areComplexGraphemesDisplayed = true;
  areComplexGraphemesGrouped = true;
  currentWordIndex = 0;
  currentWord: Word;
  words: Word[];
  graphemes: LanguageGraphemes;

  constructor(private graphemeService : GraphemeService) {}

  ngOnInit() {
    this.words = this.graphemeService.getWords();
    this.graphemes = this.graphemeService.getGraphemes();
    const phonems = this.graphemes.vowels.concat(this.graphemes.consonants, this.graphemes.complexes);
    this.graphemeService.preloadSounds(this.words, phonems);

    this.setRandomCurrentWord();
    this.updateDisplayedGraphemes();
  }

  setRandomCurrentWord() {
    this.currentWordIndex = Math.floor(Math.random() * (this.words.length));
    this.updateWord();
  }

  setCurrentWord(wordIndex) {
    this.currentWordIndex = wordIndex;
    this.updateWord();
  }

  updateWord() {
    this.currentWord = this.words[this.currentWordIndex];
    this.isSolutionDisplayed = false;
    this.updateWordGraphemes();
    this.currentWord.playSound();
  }

  updateWordGraphemes() {
    this.currentWord.graphemes.forEach(g => {
      if (g.isMute) {
        g.isFound = this.areMutedGraphemesDisplayed;
      }
      if (g.graphemeType == 'complex') {
        g.isFound = this.areComplexGraphemesDisplayed;
      }
    });
  }

  updateDisplayedGraphemes() {
    if(this.isComplexGraphemesDisplayed) {
      this.displayedGraphemes = this.graphemes.complexes;
    }
    else {
      this.displayedGraphemes = this.graphemes.vowels;
      this.displayedGraphemes = this.displayedGraphemes.concat(this.graphemes.consonants);
      if(this.isAlphabeticOrder)
        this.displayedGraphemes.sort((a, b) => { return a.representation.localeCompare(b.representation); });
    }
  }

  toggleAreMutedGraphemesDisplayed() {
    this.areMutedGraphemesDisplayed = !this.areMutedGraphemesDisplayed;
    this.updateWordGraphemes();
  }

  toggleAreComplexGraphemesDisplayed() {
    this.areComplexGraphemesDisplayed = !this.areComplexGraphemesDisplayed;
    this.updateWordGraphemes();
  }

  toggleGraphemeDisplay() {
    this.isComplexGraphemesDisplayed = !this.isComplexGraphemesDisplayed;
    this.updateDisplayedGraphemes();
  }

  toggleIsAlphabeticOrder() {
    this.isAlphabeticOrder = !this.isAlphabeticOrder;
    this.updateDisplayedGraphemes();
  }

  toggleAreComplexGraphemesGrouped() {
     this.areComplexGraphemesGrouped = !this.areComplexGraphemesGrouped;
  }

  toggleIsCursiveFont() {
    //We don't want to have upper case for cursive font
    if (this.isUpperCase && !this.isCursiveFont)
      this.toggleIsUpperCase();
    this.isCursiveFont = !this.isCursiveFont;
  }

  toggleIsUpperCase() {
    if (this.isUpperCase || !this.isCursiveFont)
      this.isUpperCase = !this.isUpperCase;
  }

  applyCase(str: string) {
    return this.isUpperCase ? str.toUpperCase() : str;
  }

  playSound(filename: string) {
    const a = new Audio(`./assets/sounds/${filename}.mp3`);
    a.play();
  }

  onDrop(droppedGrapheme: Grapheme, wordGrapheme: Grapheme) {
    if(droppedGrapheme.representation === wordGrapheme.representation) {
      this.playSound('juste');
      wordGrapheme.isFound = true;
      if(this.currentWord.isFound()) {
        this.playSound('mot juste');
        this.setRandomCurrentWord();
      }
    } else {
      this.playSound('faux');
    }
  }
}
