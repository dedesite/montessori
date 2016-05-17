export class Grapheme {
  public currentPhonemIndex: number = 0;
  private color: string;
  //whether the grapheme has been found in the game or not
  //used for inWord grapheme
  public isFound: boolean = false;

  constructor(
    public graphemeType: string,
    //A grapheme can represent sevral phonems
    //ie : the letter "e" in french
    public phonems: string[],
    public representation: string,
    public inWord: boolean = false,
    public isMute: boolean = false ) {

    switch (this.graphemeType) {
      case 'vowel':
        this.color = 'blue';
        break;
      case 'consonant':
        this.color = 'red';
        break;
      case 'complex':
        this.color = 'green';
        break;
      default:
        this.color = 'blue';
        break;
    }
    if (this.isMute)
      this.color = 'grey';
  }

  playPhonem() {
    let a = new Audio('./sounds/phonems/' + this.phonems[this.currentPhonemIndex] + '.mp3');
    a.play();
    this.currentPhonemIndex++;
    this.currentPhonemIndex = this.currentPhonemIndex % this.phonems.length;
  }
}