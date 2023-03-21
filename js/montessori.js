$(function () {
  var vowels = "aâeéèêiïîouy";
  var consonants = "bcçdfghjklmnpqrstvwxz";
  var phonems = [
    "ou",
    "ai",
    "ei",
    "er",
    "ed",
    "et",
    "ette",
    "en",
    "an",
    "on",
    "tion",
    "oi",
    "oin",
    "ch",
    "ph",
    "gu",
    "qu",
    "eau",
    "ain",
    "in",
    "ein",
    "ien",
    "œu",
    "eu",
    "ill",
    "euil",
    "ail",
    "eil",
    "eille",
  ];
  var words = null;
  var multipleSoundsLetters = null;
  var currentWord = null;
  var currentFullWord = null;
  var previousPlayedLetter = "";
  var currentSoundIndex = 0;
  var optionDisplayPhonem = true;
  var optionDisplayMute = true;
  var optionUpperCase = false;
  var optionScript = false;
  var optionPhonemInPanel = false;
  var optionAlphabeticOrder = false;
  var optionSeparatePhonems = false;
  var solutionDisplayed = false;

  function getLetterType(letter) {
    if (letterIsPhonem(letter)) return "phonem";
    else if (letterIsMute(letter)) return "mute";
    else return vowels.search(letter) !== -1 ? "vowel" : "consonant";
  }

  //@return whereas the letter should not be pronounced
  //they are preceed by a "_"
  function letterIsMute(letter) {
    return letter.length > 1 && letter[0] === "_";
  }

  //@return whereas the letter is a "complex phonem" (I don't know what is the right word)
  //like "oi" "ou"
  function letterIsPhonem(letter) {
    return letter.length > 1 && letter.search("_") === -1;
  }

  //@return whereas the letter should be pronounced differently
  //eg : "e" in "bec" sounds "bèc", the letter is written this way "e_è"
  function letterSoundsDifferent(letter) {
    return letter.length > 1 && letter[1] === "_";
  }

  //@return the letter that should be pronounced
  //eg : "e" in "bec" should be pronounced "è"
  function getLetterSound(letter) {
    if (letterIsMute(letter)) return "";
    else if (letterSoundsDifferent(letter)) return letter[2];
    else return letter;
  }

  //@return the character displayed in word to help children
  //only complex phonem and mute char are displayed
  function getDisplayedChar(letter) {
    if (letterIsMute(letter))
      return optionDisplayMute ? letter.replace("_", "") : "";
    else if (letterIsPhonem(letter)) return optionDisplayPhonem ? letter : "";
    else return "";
  }

  //@return the written letter
  //eg : "e" for "bec"
  function getLetter(letter) {
    if (letterIsMute(letter)) return letter.replace("_", "");
    else if (letterSoundsDifferent(letter)) return letter[0];
    else return letter;
  }

  //@return the written word
  //eg : "bec" for ["b", "e_è", "c"]
  function getWrittenWord(word) {
    var writtenWord = "";
    word.forEach(function (c) {
      writtenWord += getLetter(c);
    });
    return writtenWord;
  }

  function applyCase(letter) {
    return optionUpperCase ? letter.toUpperCase() : letter;
  }

  function createWordLetter(el, letter) {
    var letterType = getLetterType(letter);
    var letterSound = getLetterSound(letter);
    var displayedChar = getDisplayedChar(letter);
    var letterData = getLetter(letter);

    var cursive = optionScript ? "script" : "cursive";
    currentFullWord += letterData;
    var letterEl = $("<div/>", {
      class:
        "col-md-1 word-letter letter droppable base " +
        letterType +
        " " +
        cursive,
      text: applyCase(displayedChar),
    })
      .appendTo(el)
      .data("letter", letterData)
      .data("sound", letterSound);
    if (displayedChar === "") letterEl.droppable({ drop: onDrop });
  }

  function createWord(el, word) {
    $(el).html("");
    currentFullWord = "";
    word.forEach(function (c) {
      var letterType = getLetterType(c);
      if (letterType === "phonem" && optionSeparatePhonems) {
        c.split("").forEach(function (l) {
          createWordLetter(el, l);
        });
      } else {
        createWordLetter(el, c);
      }
    });

    $("<div/>", {
      class: "col-md-2",
    })
      .prependTo(el)
      .html(
        '<img class="word-img" src="./img/' +
          currentFullWord +
          '.png" class="thumbnail">'
      );

    //Put the reload word button at the right
    $(el).append(
      '<div class="base col-md-1 navbar-right"><button id="reload" class="btn btn-primary btn-lg"><span class="glyphicon glyphicon-refresh"></span></button></div>'
    );
    //Then the solution button
    $(el).append(
      '<div class="base col-md-2 navbar-right sol"><button id="solution" class="btn btn-primary btn-lg">?</button></div>'
    );

    onRefresh();

    solutionDisplayed = false;
    $("#solution").off("click");
    $("#solution").click(function () {
      showSolution();
    });

    $(".word-img").click(function () {
      playSound("words/" + currentFullWord);
    });
    return word;
  }

  function isWordCompleted() {
    var ok = true;
    $(".word-letter").each(function (ind, letter) {
      ok = $(letter).text() !== "";
      return ok;
    });
    return ok;
  }

  function playEndAnimation() {
    playSound("finish");
    var ind = 0;
    var nbBefore = 0;
    var interval = setInterval(function () {
      //Really hacky, didn't want to create another timeout
      if (nbBefore <= 2) {
        if (nbBefore === 0) playSound("mot juste");
        nbBefore++;
        return;
      }
      if (ind >= currentWord.length) {
        playSound("words/" + currentFullWord);
        clearInterval(interval);
        //Then start a new word after 3s
        setTimeout(function () {
          reloadWord();
        }, 3000);
      } else {
        playSound("letters/" + getLetterSound(currentWord[ind]));
      }
      ind++;
    }, 800);
  }

  function onDrop(event, ui) {
    var dropLetter = $(ui.draggable).data("letter");
    var wantedLetter = $(this).data("letter");
    if (dropLetter == wantedLetter) {
      playSound("juste");
      $(this)
        .removeClass("droppable")
        .addClass("good")
        .text(applyCase(wantedLetter));
      if (isWordCompleted()) {
        playEndAnimation();
      }
    } else {
      playSound("faux");
    }
  }

  function playSound(name) {
    $(
      '<audio autoplay="autoplay" type="audio/mp3" src="./sounds/' +
        name +
        '.mp3"/>'
    ).appendTo("#app");
  }

  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  function letterHasMultipleSound(letter) {
    return multipleSoundsLetters[letter] != null;
  }

  function onMouseDown(ev) {
    var letter = $(ev.target).text().toLowerCase();
    if (previousPlayedLetter !== letter) {
      if (letterHasMultipleSound(previousPlayedLetter)) {
        $("#" + previousPlayedLetter).removeClass("sound-" + currentSoundIndex);
        $("#" + previousPlayedLetter).addClass("sound-0");
      }
      currentSoundIndex = 0;
      previousPlayedLetter = letter;
    }
    if (
      letterHasMultipleSound(letter) &&
      (previousPlayedLetter === "" || previousPlayedLetter === letter)
    ) {
      $(ev.target).removeClass("sound-" + currentSoundIndex);
      var size = multipleSoundsLetters[letter].length;
      letter = multipleSoundsLetters[letter][currentSoundIndex];
      currentSoundIndex++;
      currentSoundIndex = currentSoundIndex % size;
      $(ev.target).addClass("sound-" + currentSoundIndex);
    }
    previousPlayedLetter = $(ev.target).text().toLowerCase();
    playSound("letters/" + letter);
  }

  function onWordLetterDown(ev) {
    if ($(ev.target).text() !== "")
      playSound("letters/" + $(ev.target).data("sound"));
  }

  function onRefresh() {
    $(".panel-letter").off("mousedown", onMouseDown);
    $(".panel-letter").mousedown(onMouseDown);
    $(".word-letter").off("mousedown", onWordLetterDown);
    $(".word-letter").mousedown(onWordLetterDown);

    $("#opt-phonems-panel").off("click");
    $("#opt-phonems-panel").click(function () {
      optionPhonemInPanel = !optionPhonemInPanel;
      refreshPanel();
    });

    $("#reload").off("click");
    $("#reload").click(function () {
      reloadWord();
    });
  }

  function reloadWord(word) {
    var w = word != null ? word : getRandomWord();
    var el = $(".word").get(0);
    currentWord = createWord(el, w);
    playSound("words/" + currentFullWord);
  }

  function createLetter(el, letter) {
    var letterType = getLetterType(letter);
    var cursive = optionScript ? "script" : "cursive";
    var sound = letterHasMultipleSound(letter) ? "sound-0" : "";
    $("<div/>", {
      class:
        "col-md-1 panel-letter letter draggable base " +
        letterType +
        " " +
        cursive +
        " " +
        sound,
      text: applyCase(letter),
      id: letter,
    })
      .appendTo(el)
      .draggable({
        revert: true,
        revertDuration: 0,
        start: function (event, ui) {
          //playSound($(event.target).text());
        },
      })
      .data("letter", letter);
  }

  function createLetterPanel(letters) {
    el = $(".letters").get(0);
    $(el).html("");
    letters.forEach(function (l) {
      createLetter(el, l);
    });
    //Do not display phonem panels when seprate phonems option is on
    if (!optionSeparatePhonems) {
      var arrow = optionPhonemInPanel
        ? "glyphicon-arrow-left"
        : "glyphicon-arrow-right";
      var btn =
        '<div class="col-md-1 base letter"><button id="opt-phonems-panel" type="button" class="btn btn-primary btn-lg"><span class="glyphicon ' +
        arrow +
        '" aria-hidden="true"></span></button></div>';
      $(el).append(btn);
    }
    onRefresh();
  }

  function createLetters() {
    var s = vowels + consonants;
    if (optionAlphabeticOrder)
      s = s
        .split("")
        .sort(function (a, b) {
          return a.localeCompare(b);
        })
        .join("");
    createLetterPanel(s.split(""));
  }

  function createPhonems() {
    createLetterPanel(phonems);
  }

  function showSolution() {
    solutionDisplayed = true;
    var el = $(".sol").get(0);
    $(el).html("");
    var cursive = optionScript ? "script" : "cursive";
    currentWord.forEach(function (c) {
      var letter = getLetter(c);
      $("<div/>", {
        class: "solution " + getLetterType(letter) + " " + cursive,
        text: applyCase(letter),
      }).appendTo(el);
    });
  }

  function refreshPanel() {
    optionPhonemInPanel ? createPhonems() : createLetters();
  }

  function refreshWord() {
    var el = $(".word").get(0);
    createWord(el, currentWord);
  }

  $("#opt-phonems").click(function () {
    optionDisplayPhonem = !optionDisplayPhonem;
    $("#opt-phonems").text(
      optionDisplayPhonem ? "Cacher phonèmes" : "Afficher phonèmes"
    );
    refreshWord();
  });

  $("#opt-mutes").click(function () {
    optionDisplayMute = !optionDisplayMute;
    $("#opt-mutes").text(
      optionDisplayMute ? "Cacher muettes" : "Afficher muettes"
    );
    refreshWord();
  });

  function toggleUpperCaseOption() {
    optionUpperCase = !optionUpperCase;
    $("#opt-upper").text(optionUpperCase ? "Minuscules" : "Majuscules");
  }

  $("#opt-upper").click(function () {
    //Only allow uppercase for Script writting
    if (optionUpperCase || optionScript) {
      toggleUpperCaseOption();
      refreshPanel();
      refreshWord();
      if (solutionDisplayed) showSolution();
    }
  });

  $("#opt-script").click(function () {
    optionScript = !optionScript;
    $("#opt-script").text(optionScript ? "Cursive" : "Script");
    //Cursive writting is only in lower case
    if (!optionScript && optionUpperCase) toggleUpperCaseOption();
    refreshPanel();
    refreshWord();
    if (solutionDisplayed) showSolution();
  });

  $("#opt-alphabetic-order").click(function () {
    optionAlphabeticOrder = !optionAlphabeticOrder;
    $("#opt-alphabetic-order").text(
      optionAlphabeticOrder ? "Consonnes/Voyelles" : "Ordre Alphabétique"
    );
    refreshPanel();
  });

  $("#opt-separate-phonems").click(function () {
    optionSeparatePhonems = !optionSeparatePhonems;
    $("#opt-separate-phonems").text(
      optionSeparatePhonems ? "Grouper phonèmes" : "Dégrouper phonèmes"
    );
    if (optionSeparatePhonems) {
      optionPhonemInPanel = false;
    }
    refreshWord();
    refreshPanel();
  });

  $("#show-toolbar").click(function () {
    $(".toolbar").toggle();
  });

  $("#opt-word").change(function (e) {
    reloadWord(words[$(e.target).val()]);
  });

  //Not working for now, need to test more with a multitouch device
  //Solution taken from http://stackoverflow.com/questions/1517924/javascript-mapping-touch-events-to-mouse-events
  function touchHandler(event) {
    console.log(
      event.type,
      event.changedTouches[0].clientX,
      event.changedTouches[0].clientY
    );
    var touches = event.changedTouches,
      first = touches[0],
      type = "";
    switch (event.type) {
      case "touchstart":
        type = "mousedown";
        break;
      case "touchmove":
        type = "mousemove";
        break;
      case "touchend":
        type = "mouseup";
        break;
      default:
        return;
    }

    var simulatedEvent = new MouseEvent(type, {
      screenX: first.screenX,
      screenY: first.screenY,
      clientX: first.clientX,
      clientY: first.clientY,
    });

    first.target.dispatchEvent(simulatedEvent);
    //event.preventDefault();
  }

  let previousEventType = "";
  function mouseHandler(event) {
    if (event.type !== previousEventType) {
      previousEventType = event.type;
      console.log(event.type, event.clientX, event.clientY);
    }
  }

  function init() {
    //const wheelOpt = supportsPassive ? { passive: false } : false;
    const wheelEvent =
      "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
    document.addEventListener("mousedown", mouseHandler, true);
    document.addEventListener("mouseup", mouseHandler, true);
    document.addEventListener("mousemove", mouseHandler, true);

    //Hide it at the begining
    $(".toolbar").toggle();

    words = data.words;
    multipleSoundsLetters = data.multiple_sounds_letters;
    createLetters();
    reloadWord();

    //Load all the words in the select
    words.forEach(function (word, ind) {
      $("#opt-word").append(
        '<option value="' + ind + '">' + getWrittenWord(word) + "</option>"
      );
    });
  }

  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          supportsPassive = true;
        },
      })
    );
  } catch (e) {}

  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

  // call this to Disable
  function disableScroll() {
    window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    window.addEventListener("keydown", preventDefaultForScrollKeys, false);
  }

  // call this to Enable
  function enableScroll() {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener("touchmove", preventDefault, wheelOpt);
    window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
  }

  disableScroll();
  init();
});
