import { Grapheme } from './grapheme';

export class Word {
  //Complex grapheme can be displayed as simple graphemes
  public ungroupedGraphemes: Grapheme[] = [];
  constructor(
    public graphemes: Grapheme[],
    public fileName: string
    ) {
      this.graphemes.forEach(g => {
        if(g.graphemeType === 'complex') {
          g.representation.split('').forEach(simpleGraph => {
            // TODO : it is not always a vowel
            this.ungroupedGraphemes.push(new Grapheme('vowel', [simpleGraph], simpleGraph, true));
          });
        }
        else {
          this.ungroupedGraphemes.push(g);
        }
      });
  }

  playSound() {
    const a = new Audio(`./assets/sounds/words/${this.fileName}.mp3`);
    a.play();
  }

  isFound() {
    return this.graphemes.every(g => g.isFound);
  }
}
