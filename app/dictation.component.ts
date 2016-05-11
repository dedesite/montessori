import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-dictation',
  templateUrl: 'app/dictation.component.html',
})
export class DictationComponent implements OnInit{
  displayedGraphemes: String[] = [];
  isComplexGraphemesDisplayed = false;
  isToolbarDisplayed = false;
  isAlphabeticOrder = false;
  isCursiveFont = true;
  //@temp need to put this into config file which will be language speicific
  private vowels = 'aâeéèêiïîouy';
  private consonants = 'bcçdfghjklmnpqrstvwxz';
  private phonems = ['ou', 'ai', 'ei', 'er', 'ed', 'et', 'ette', 'en', 'an', 'on',
    'tion', 'oi', 'oin', 'ch', 'ph', 'gu', 'qu', 'eau', 'ain', 'in', 'ein', 'ien', 
    'œu', 'eu', 'ill', 'euil', 'ail', 'eil', 'eille'];

  ngOnInit() {
    this.updateDisplayedGraphemes();
  }

  updateDisplayedGraphemes() {
    if(this.isComplexGraphemesDisplayed) {
      this.displayedGraphemes = this.phonems;
    }
    else {
      let s = this.vowels + this.consonants;
      if(this.isAlphabeticOrder)
        s = s.split('').sort((a, b) => { return a.localeCompare(b); }).join('');
      this.displayedGraphemes = s.split('');  
    }
  }

  toggleGraphemeDisplay() {
    this.isComplexGraphemesDisplayed = !this.isComplexGraphemesDisplayed;
    this.updateDisplayedGraphemes();
  }

  toggleisAlphabeticOrder() {
    this.isAlphabeticOrder = !this.isAlphabeticOrder;
    this.updateDisplayedGraphemes();
  }
}