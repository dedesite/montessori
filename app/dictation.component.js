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
var grapheme_service_1 = require('./grapheme.service');
var DictationComponent = (function () {
    function DictationComponent(graphemeService) {
        this.graphemeService = graphemeService;
        this.displayedGraphemes = [];
        this.isComplexGraphemesDisplayed = false;
        this.isToolbarDisplayed = false;
        this.isAlphabeticOrder = false;
        this.isCursiveFont = true;
        this.isUpperCase = false;
        this.isSolutionDisplayed = false;
        this.areMutedGraphemesDisplayed = true;
        this.areComplexGraphemesDisplayed = true;
        this.areComplexGraphemesGrouped = true;
        this.currentWordIndex = 0;
    }
    DictationComponent.prototype.ngOnInit = function () {
        this.words = this.graphemeService.getWords();
        this.graphemes = this.graphemeService.getGraphemes();
        this.setRandomCurrentWord();
        this.updateDisplayedGraphemes();
    };
    DictationComponent.prototype.setRandomCurrentWord = function () {
        this.currentWordIndex = Math.floor(Math.random() * (this.words.length));
        this.updateWord();
    };
    DictationComponent.prototype.updateWord = function () {
        this.currentWord = this.words[this.currentWordIndex];
        this.isSolutionDisplayed = false;
        this.updateWordGraphemes();
    };
    DictationComponent.prototype.updateWordGraphemes = function () {
        var _this = this;
        this.currentWord.graphemes.forEach(function (g) {
            if (g.isMute) {
                g.isFound = _this.areMutedGraphemesDisplayed;
            }
            if (g.graphemeType == 'complex') {
                g.isFound = _this.areComplexGraphemesDisplayed;
            }
        });
    };
    DictationComponent.prototype.updateDisplayedGraphemes = function () {
        if (this.isComplexGraphemesDisplayed) {
            this.displayedGraphemes = this.graphemes.complexes;
        }
        else {
            this.displayedGraphemes = this.graphemes.vowels;
            this.displayedGraphemes = this.displayedGraphemes.concat(this.graphemes.consonants);
            if (this.isAlphabeticOrder)
                this.displayedGraphemes.sort(function (a, b) { return a.representation.localeCompare(b.representation); });
        }
    };
    DictationComponent.prototype.toggleAreMutedGraphemesDisplayed = function () {
        this.areMutedGraphemesDisplayed = !this.areMutedGraphemesDisplayed;
        this.updateWordGraphemes();
    };
    DictationComponent.prototype.toggleareComplexGraphemesDisplayed = function () {
        this.areComplexGraphemesDisplayed = !this.areComplexGraphemesDisplayed;
        this.updateWordGraphemes();
    };
    DictationComponent.prototype.toggleGraphemeDisplay = function () {
        this.isComplexGraphemesDisplayed = !this.isComplexGraphemesDisplayed;
        this.updateDisplayedGraphemes();
    };
    DictationComponent.prototype.toggleIsAlphabeticOrder = function () {
        this.isAlphabeticOrder = !this.isAlphabeticOrder;
        this.updateDisplayedGraphemes();
    };
    DictationComponent.prototype.toggleAreComplexGraphemesGrouped = function () {
        this.areComplexGraphemesGrouped = !this.areComplexGraphemesGrouped;
    };
    DictationComponent.prototype.toggleIsCursiveFont = function () {
        //We don't want to have upper case for cursive font
        if (this.isUpperCase && !this.isCursiveFont)
            this.toggleIsUpperCase();
        this.isCursiveFont = !this.isCursiveFont;
    };
    DictationComponent.prototype.toggleIsUpperCase = function () {
        if (this.isUpperCase || !this.isCursiveFont)
            this.isUpperCase = !this.isUpperCase;
    };
    DictationComponent.prototype.applyCase = function (str) {
        return this.isUpperCase ? str.toUpperCase() : str;
    };
    DictationComponent = __decorate([
        core_1.Component({
            selector: 'my-dictation',
            templateUrl: 'app/dictation.component.html',
            providers: [grapheme_service_1.GraphemeService]
        }), 
        __metadata('design:paramtypes', [grapheme_service_1.GraphemeService])
    ], DictationComponent);
    return DictationComponent;
}());
exports.DictationComponent = DictationComponent;
//# sourceMappingURL=dictation.component.js.map