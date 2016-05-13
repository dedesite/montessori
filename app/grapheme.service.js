"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var grapheme_1 = require('./grapheme');
var graphemes_fr_1 = require('./data/graphemes-fr');
var words_fr_1 = require('./data/words-fr');
var LanguageGraphemes = (function () {
    function LanguageGraphemes() {
        this.vowels = [];
        this.consonants = [];
        this.complexes = [];
    }
    return LanguageGraphemes;
}());
exports.LanguageGraphemes = LanguageGraphemes;
;
var GraphemeService = (function () {
    function GraphemeService() {
    }
    GraphemeService.prototype.getGraphemes = function () {
        //@todo handle this with a promise
        var graphemes = new LanguageGraphemes();
        graphemes_fr_1.GRAPHEMES.vowels.split('').forEach(function (grapheme) {
            var g = new grapheme_1.Grapheme('vowel', graphemes_fr_1.GRAPHEMES.multiplefileNamesGraphemes[grapheme] != null ? graphemes_fr_1.GRAPHEMES.multiplefileNamesGraphemes[grapheme] : [grapheme], grapheme);
            graphemes.vowels.push(g);
        });
        graphemes_fr_1.GRAPHEMES.consonants.split('').forEach(function (grapheme) {
            var g = new grapheme_1.Grapheme('consonant', graphemes_fr_1.GRAPHEMES.multiplefileNamesGraphemes[grapheme] != null ? graphemes_fr_1.GRAPHEMES.multiplefileNamesGraphemes[grapheme] : [grapheme], grapheme);
            graphemes.consonants.push(g);
        });
        graphemes_fr_1.GRAPHEMES.complexes.forEach(function (grapheme) {
            var g = new grapheme_1.Grapheme('complex', [grapheme], grapheme);
            graphemes.complexes.push(g);
        });
        return graphemes;
    };
    GraphemeService.prototype.getWordGrapheme = function (description) {
        var phonem = [];
        var isMute = false;
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
        var graphemeType;
        if (description.length > 1) {
            graphemeType = 'complex';
        }
        else {
            graphemeType = graphemes_fr_1.GRAPHEMES.vowels.indexOf(description) != -1 ? 'vowels' : 'consonant';
        }
        return new grapheme_1.Grapheme(graphemeType, phonem, description, true, isMute);
    };
    //@todo put this into a separate service (but it'll need GraphemeService)
    GraphemeService.prototype.getWords = function () {
        var _this = this;
        var words = [];
        //@todo put this into a promise
        words_fr_1.WORDS.forEach(function (word) {
            var wordGraphemes = [];
            var fileName = '';
            word.forEach(function (description) {
                var g = _this.getWordGrapheme(description);
                wordGraphemes.push(g);
                //the fileName of the word is a concatenation off all the graphemes
                fileName += g.representation;
            });
            words.push({ graphemes: wordGraphemes, fileName: fileName });
        });
        return words;
    };
    GraphemeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GraphemeService);
    return GraphemeService;
}());
exports.GraphemeService = GraphemeService;
//# sourceMappingURL=grapheme.service.js.map