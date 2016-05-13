import { Grapheme } from './grapheme';

export class Word {
  //Complex grapheme can be displayed as simple graphemes
  public ungroupedGraphemes: Grapheme[] = [];
  constructor(
    public graphemes: Grapheme[],
    public fileName: string  
    ) {
      this.graphemes.forEach(g => {
        if(g.graphemeType == 'complex') {
          g.representation.split('').forEach(simpleGraph => {
            this.ungroupedGraphemes.push(new Grapheme('vowel', [simpleGraph], simpleGraph, true));
          });
        }
        else {
          this.ungroupedGraphemes.push(g);
        }
      });
  }
}