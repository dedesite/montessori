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
        //whether the grapheme has been found or not
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
    return Grapheme;
}());
exports.Grapheme = Grapheme;
//# sourceMappingURL=grapheme.js.map