$(function() {
  var vowels = 'aâeéèêiïîouy';
  var consonants = 'bcçdfghjklmnpqrstvwxz';
  var phonems = ['ou', 'ai', 'en', 'an', 'on', 'oi', 'ch', 'ette', 'qu', 'ill', 'tion', 'er', 'et', 'eau', 'ain', 'œu', 'in', 'euil', 'ien', 'ail', 'eu', 'gu', 'eil', 'ei', 'ph', 'oin'];
  var words = null;
  var multipleSoundsLetters = null;
  var currentWord = null;
  var currentFullWord = null;
  var previousPlayedLetter = '';
  var currentSoundIndex = 0;
  var optionDisplayPhonem = true;
  var optionDisplayMute = true;
  var optionUpperCase = false;
  var optionScript = false;
  var optionPhonemInPanel = false;
  var solutionDisplayed = false;

  function getLetterType(letter) {
    if(letter.length > 1)
      return letter[0] === '_' ? 'mute' : 'phonem';
    else
      return vowels.search(letter) !== -1 ? 'vowel' : 'consonant';
  }

  //@return whereas the letter should not be pronounced
  //they are preceed by a "_"
  function letterIsMute(letter) {
    return letter.length > 1 && letter[0] === '_';
  }

  //@return whereas the letter is a "complex phonem" (I don't know what is the right word)
  //like "oi" "ou"
  function letterIsPhonem(letter) {
    return letter.length > 1 && letter.search('_') === -1;
  }

  //@return whereas the letter should be pronounced differently
  //eg : "e" in "bec" sounds "bèc", the letter is written this way "e_è"
  function letterSoundsDifferent(letter) {
    return letter.length > 1 && letter[1] === '_';
  }

  //@return the letter that should be pronounced
  //eg : "e" in "bec" should be pronounced "è"
  function getLetterSound(letter) {
    if(letterIsMute(letter))
      return '';
    else if(letterSoundsDifferent(letter))
      return letter[2];
    else
      return letter;
  }

  //@return the character displayed in word to help children
  //only complex phonem and mute char are displayed
  function getDisplayedChar(letter) {
    if(letterIsMute(letter))
      return optionDisplayMute ? letter.replace('_', '') : '';
    else if(letterIsPhonem(letter))
      return optionDisplayPhonem ? letter : '';
    else
      return '';
  }

  //@return the written letter
  //eg : "e" for "bec"
  function getLetter(letter) {
    if(letterIsMute(letter))
      return letter.replace('_', '');
    else if(letterSoundsDifferent(letter))
      return letter[0];
    else
      return letter;
  }

  function applyCase(letter) {
    return optionUpperCase ? letter.toUpperCase() : letter;
  }

  function createWord(el, word) {
    $(el).html('');
    currentFullWord = '';
    word.forEach(function(c) {
      var letterSound = getLetterSound(c);
      var displayedChar = getDisplayedChar(c);
      var letter = getLetter(c);
      var letterType = getLetterType(c);
      var cursive = optionScript ? '' : 'cursive';
      currentFullWord += letter;
      var letterEl = $('<div/>', {
        class: 'col-md-1 letter droppable base ' + letterType + ' ' + cursive,
        text: applyCase(displayedChar)
      }).appendTo(el).data('letter', letter).data('sound', letterSound);
      if(displayedChar === '')
        letterEl.droppable({drop: onDrop});
    });

    $('<div/>', {
      class: 'col-md-1'
    }).prependTo(el).html('<img class="word-img" src="./img/' + currentFullWord + '.jpg" class="thumbnail">');

    return word;
  }

  function onDrop(event, ui ) {
    var dropLetter = $(ui.draggable).data('letter');
    var wantedLetter = $(this).data('letter');
    if(dropLetter == wantedLetter)
    {
      playSound('good');
      $(this)
        .removeClass('droppable')
        .addClass('good')
        .text(wantedLetter);
    }
    else
    {
      playSound('wrong');
    }
  }

  function playSound(name) {
    $('<audio autoplay="autoplay" type="audio/mp3" src="./sounds/' + name + '.mp3"/>').appendTo('#app');
  }

  function getRandomWord() {
    return words[Math.floor(Math.random() * (words.length))];
  }

  function onMouseDown(ev) {
    var letter = $(ev.target).text();
    if(previousPlayedLetter === letter && multipleSoundsLetters[letter] != null){
      currentSoundIndex++;
      var size = multipleSoundsLetters[letter].length;
      currentSoundIndex = currentSoundIndex % size;
      letter = multipleSoundsLetters[letter][currentSoundIndex];
    }
    else{
      currentSoundIndex = 0;
    }
    previousPlayedLetter = $(ev.target).text();
    playSound("letters/" + letter);
  }

  function onRefresh() {
    $('.letter').off('mousedown', onMouseDown);
    $('.letter').mousedown(onMouseDown);
  }

  function reloadWord() {
    var el = $('.word').get(0);
    currentWord = createWord(el, getRandomWord());
    onRefresh();

    solutionDisplayed = false;
    el = $('.sol').get(0);
    $(el).html('<button id="solution" class="btn">Solution</button>');
    $('#solution').click(function(){
      showSolution();
    });

    playSound("words/" + currentFullWord);
  }

  function createLetter(el, letter) {
    var letterType = getLetterType(letter);
    var cursive = optionScript ? '' : 'cursive';
    $('<div/>', {
      class: 'col-md-1 letter draggable base ' + letterType + ' ' + cursive,
      text: applyCase(letter)
    }).appendTo(el).draggable({
      revert: true, revertDuration: 0,
      start: function(event, ui) {
        //playSound($(event.target).text());
      }
    }).data('letter', letter);
  }

  function createLetterPanel(letters) {
    el = $('.letters').get(0);
    $(el).html('');
    letters.forEach(function(l) {
      createLetter(el, l);
    });
    onRefresh();
  }

  function createLetters() {
    var s = vowels + consonants;
    createLetterPanel(s.split(''));
  }

  function createPhonems() {
    createLetterPanel(phonems);
  }

  function showSolution() {
    solutionDisplayed = true;
    var el = $('.sol').get(0);
    $(el).html('');
    var cursive = optionScript ? '' : 'cursive';
    currentWord.forEach(function(c){
      var letter = getLetter(c);
      $('<div/>', {
        class: 'solution ' + getLetterType(letter) + ' ' + cursive,
        text: applyCase(letter)
      }).appendTo(el)
    })
  }

  function refreshPanel() {
    optionPhonemInPanel ? createPhonems() : createLetters();
  }

  function refreshWord() {
    var el = $('.word').get(0);
    createWord(el, currentWord);
  }

  $('#reload').click(function(){
    reloadWord();
  });

  $('#opt-phonems-panel').click(function(){
    optionPhonemInPanel = !optionPhonemInPanel;
    $('#opt-phonems-panel').text(optionPhonemInPanel ? 'Lettres' : 'Phonèmes');
    refreshPanel();
  });

  $('#opt-phonems').click(function(){
    optionDisplayPhonem = !optionDisplayPhonem;
    $('#opt-phonems').text(optionDisplayPhonem ? 'Cacher phonèmes' : 'Afficher phonèmes');
    refreshWord();
  });

  $('#opt-mutes').click(function(){
    optionDisplayMute = !optionDisplayMute;
    $('#opt-mutes').text(optionDisplayMute ? 'Cacher muettes' : 'Afficher muettes');
    refreshWord();
  });

  $('#opt-upper').click(function(){
    optionUpperCase = !optionUpperCase;
    $('#opt-upper').text(optionUpperCase ? 'Minuscules' : 'Majuscules');
    refreshPanel();
    refreshWord();
    if(solutionDisplayed)
      showSolution();
  });

  $('#opt-script').click(function(){
    optionScript = !optionScript;
    $('#opt-script').text(optionScript ? 'Cursive' : 'Script');
    refreshPanel();
    refreshWord();
    if(solutionDisplayed)
      showSolution();
  });

  words = data.words;
  multipleSoundsLetters = data.multiple_sounds_letters;
  createLetters();
  reloadWord();
});