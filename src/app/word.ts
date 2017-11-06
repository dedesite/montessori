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
    console.log('mot', this);
  }

  playWordGraphemeSound(resolve, reject, graphemeIndex) {
    const currentGrapheme = this.graphemes[graphemeIndex];
    if(currentGrapheme) {
      currentGrapheme.playPhonem()
        .then(() => this.playWordGraphemeSound(resolve, reject, graphemeIndex + 1))
        .catch(err => reject(err))
    } else {
      resolve();
    }
  }

  playAllWordGraphemesSound() {
    return new Promise((resolve, reject) => {
      this.playWordGraphemeSound(resolve, reject, 0);
    });
  }

  isFound() {
    return this.graphemes.every(g => g.isFound);
  }
}
