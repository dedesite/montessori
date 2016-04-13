$(function() {
  var vowels = 'aâeéèêiïîouy';
  var consonants = 'bcçdfghjklmnpqrstvwxz';
  var words = null;

  function getLetterType(letter) {
    if(letter.length > 1)
      return letter[0] === '_' ? 'mute' : 'phonem';
    else
      return vowels.search(letter) != -1 ? 'vowel' : 'consonant';
  }
  function createLetter(el, letter) {
    var letterType = getLetterType(letter);
    $('<div/>', {
      class: 'col-md-1 letter draggable base ' + letterType,
      text: letter
    }).appendTo(el).draggable({
      revert: true, revertDuration: 0,
      start: function(event, ui) {
        //playSound($(event.target).text());
      }
    }).data('letter', letter);
  }

  function createWord(el, word) {
    var fullWord = word.join('').replace('_', '');
    $('<div/>', {
      class: 'col-md-1'
    }).appendTo(el).html('<img class="word-img" src="./img/' + fullWord + '.jpg" class="thumbnail">');
    word.forEach(function(c) {
      var letter = c.replace('_', '');
      //Only display complex phonem and mute char
      var displayedChar = c.length > 1 ? letter : '';
      $('<div/>', {
        class: 'col-md-1 letter droppable base ' + getLetterType(c),
        text: displayedChar
      }).appendTo(el).droppable({drop: onDrop}).data('letter', letter);
    });
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

  function playSound(letter) {
    $('<audio autoplay="autoplay" type="audio/mp3" src="./sounds/' + letter + '.mp3"/>').appendTo('#app');
  }

  function getRandomWord() {
    return words[Math.floor(Math.random() * (words.length))];
  }

  function reloadWord() {
    var el = $('.word').get(0);
    $(el).html('');
    createWord(el, getRandomWord());
    $('.letter').mousedown(function(ev){
      playSound($(ev.target).text());
    });
  }

  function createLetters() {
    el = $('.letters').get(0);
    var s = vowels + consonants;
    s.split('').forEach(function(c) {
      createLetter(el, c);
    });
  }

  $('#reload').click(function(){
    reloadWord();
  });

  $.getJSON('./data/words.json', function(data){
    words = data;

    createLetters();
    reloadWord();
  });
});