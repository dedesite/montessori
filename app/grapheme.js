"use strict";
var Grapheme = (function () {
    function Grapheme(graphemeType, 
        //A grapheme can represent sevral phonems
        //ie : the letter "e" in french
        phonems, representation, inWord, isMute) {
        if (inWord === void 0) { inWord = false; }
        if (isMute === void 0) { isMute = false; }
        this.graphemeType = graphemeType;
        this.phonems = phonems;
        this.representation = representation;
        this.inWord = inWord;
        this.isMute = isMute;
        this.currentPhonemIndex = 0;
        //whether the grapheme has been found in the game or not
        //used for inWord grapheme
        this.isFound = false;
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
    Grapheme.prototype.playPhonem = function () {
        var a = new Audio('./sounds/phonems/' + this.phonems[this.currentPhonemIndex] + '.mp3');
        a.play();
        this.currentPhonemIndex++;
        this.currentPhonemIndex = this.currentPhonemIndex % this.phonems.length;
    };
    return Grapheme;
}());
exports.Grapheme = Grapheme;
//# sourceMappingURL=grapheme.js.map