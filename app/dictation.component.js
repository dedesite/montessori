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
var DictationComponent = (function () {
    function DictationComponent() {
        this.displayedGraphemes = [];
        this.isComplexGraphemesDisplayed = false;
        this.isToolbarDisplayed = false;
        this.isAlphabeticOrder = false;
        this.isCursiveFont = true;
        //@temp need to put this into config file which will be language speicific
        this.vowels = 'aâeéèêiïîouy';
        this.consonants = 'bcçdfghjklmnpqrstvwxz';
        this.phonems = ['ou', 'ai', 'ei', 'er', 'ed', 'et', 'ette', 'en', 'an', 'on',
            'tion', 'oi', 'oin', 'ch', 'ph', 'gu', 'qu', 'eau', 'ain', 'in', 'ein', 'ien',
            'œu', 'eu', 'ill', 'euil', 'ail', 'eil', 'eille'];
    }
    DictationComponent.prototype.ngOnInit = function () {
        this.updateDisplayedGraphemes();
    };
    DictationComponent.prototype.updateDisplayedGraphemes = function () {
        if (this.isComplexGraphemesDisplayed) {
            this.displayedGraphemes = this.phonems;
        }
        else {
            var s = this.vowels + this.consonants;
            if (this.isAlphabeticOrder)
                s = s.split('').sort(function (a, b) { return a.localeCompare(b); }).join('');
            this.displayedGraphemes = s.split('');
        }
    };
    DictationComponent.prototype.toggleGraphemeDisplay = function () {
        this.isComplexGraphemesDisplayed = !this.isComplexGraphemesDisplayed;
        this.updateDisplayedGraphemes();
    };
    DictationComponent.prototype.toggleisAlphabeticOrder = function () {
        this.isAlphabeticOrder = !this.isAlphabeticOrder;
        this.updateDisplayedGraphemes();
    };
    DictationComponent = __decorate([
        core_1.Component({
            selector: 'my-dictation',
            templateUrl: 'app/dictation.component.html',
        }), 
        __metadata('design:paramtypes', [])
    ], DictationComponent);
    return DictationComponent;
}());
exports.DictationComponent = DictationComponent;
//# sourceMappingURL=dictation.component.js.map