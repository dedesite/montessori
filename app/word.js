"use strict";
var grapheme_1 = require('./grapheme');
var Word = (function () {
    function Word(graphemes, fileName) {
        var _this = this;
        this.graphemes = graphemes;
        this.fileName = fileName;
        //Complex grapheme can be displayed as simple graphemes
        this.ungroupedGraphemes = [];
        this.graphemes.forEach(function (g) {
            if (g.graphemeType == 'complex') {
                g.representation.split('').forEach(function (simpleGraph) {
                    _this.ungroupedGraphemes.push(new grapheme_1.Grapheme('vowel', [simpleGraph], simpleGraph, true));
                });
            }
            else {
                _this.ungroupedGraphemes.push(g);
            }
        });
    }
    Word.prototype.playSound = function () {
        var a = new Audio('./sounds/words/' + this.fileName + '.mp3');
        a.play();
    };
    return Word;
}());
exports.Word = Word;
//# sourceMappingURL=word.js.map