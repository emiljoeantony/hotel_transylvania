//to check total number of attempts
var numberOfTry = 4;
const elem = document.querySelectorAll('.window');
const windows = document.querySelectorAll('.row .window:not(.occupied)');
var bgm = document.getElementById('bgm');
var gameWonAudio = document.getElementById('victory');
var gameOverAudio = document.getElementById('gOver');
var doorOpenAudio = document.getElementById('door-open');
mutebtn = document.getElementById('mute-button');
mutebtn.addEventListener('click', mute);

var timeLeft = 30;
var clock = document.getElementById('time');
var timerId = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft == 60) {
    clearTimeout(timerId);
    gameOverAudio.play();
    gameOverPopup();
    
  }
   else {
    clock.innerHTML = '11' + ':' + '59' + ':' + timeLeft;
    timeLeft++;
  }
}

window.onload = function () {
  spawnMasterkey();
  var thirtySeconds = 60 / 2,
    display = document.querySelector('#time');
  startTimer(thirtySeconds, display);
};

 function spawnMasterkey() {
  var array = new Uint8Array(6);
  console.log(array);
  window.crypto.getRandomValues(array);

  for (var i = 0; i < array.length; i++) {
    const OldRange = 255 - 0;
    const NewRange = 49 - 0;
    const NewValue = parseInt(((array[i] - 255) * NewRange) / OldRange + 49);
    console.log(NewValue);
    if (i === 5) {
      elem[NewValue].classList.add('masterkey');

      return;
    }
    elem[NewValue].classList.add('ghost-window');
  }
  // var spawnedKey = Math.floor(Math.random() * 50 + 1);
  // elem[spawnedKey].classList.add('masterkey');
  // console.log(spawnedKey);
  // for (var i = 0; i < 5; i++) {
  //   var ghost_room_position = Math.floor(Math.random() * 50 + 1);
  //   if (spawnedKey === ghost_room_position) {
  //     elem[ghost_room_position + 1].classList.add('ghost-window');
  //     console.log(ghost_room_position + 1);
  //   }

  //   elem[ghost_room_position].classList.add('ghost-window');
  //   console.log(ghost_room_position);
  // }
};

function gameClue() {
  document.getElementById('game-clue').classList.add('visible');
}

function gameOverPopup() {
  document.getElementById('restart-button').classList.add('visible');
  document.getElementById('background').classList.add('visible');
}

function gameWonPopup() {
  document.getElementById('restart-button').classList.add('visible');
  document.getElementById('gamewon').classList.add('visible');
}
function chancesOverPopup(){
  document.getElementById('chances-gm').classList.add('visible');
  document.getElementById('restart-button').classList.add('visible');
}



for (var i = 0; i < elem.length; i++) {
  elem[i].addEventListener('click', function (e) {
    doorOpenAudio.play();
    bgm.play();
    var current = this;
    for (var i = 0; i < elem.length; i++) {
      if (current != elem[i]) {
        if (elem[i].classList.contains('selected') === true) {
          elem[i].classList.add('occupied');
          setTimeout(gameClue, 1000);

          numberOfTry -= 1;
        }
        elem[i].classList.remove('selected');
        setTimeout(gameClue, 1000);
      }
      if (numberOfTry === 0) {
        console.log('💣 Booom! Game over.');
        bgm.pause();
        gameOverAudio.play();
        setTimeout(chancesOverPopup, 500);
        document.getElementById('game-clue').classList.add('hidden');
      }
      if (current.classList.contains('ghost-window') === true) {
        current.classList.add('ghost-svg-pop');
        console.log('💣 Booom! Game over.');

        bgm.pause();
        gameOverAudio.play();
        setTimeout(gameOverPopup, 1500);
         countdown.setTimeout(200);
        document.getElementById('game-clue').classList.add('hidden');
      }
      if (current.classList.contains('masterkey') === true) {
        current.classList.add('masterkey-position');
        console.log('you won');
        bgm.pause();
        gameWonAudio.play();
        setTimeout(gameWonPopup, 1000);
        document.getElementById('game-clue').classList.add('hidden');
      } else {
        current.classList.add('selected');
        setTimeout(gameClue, 1000);
      }
    }
    e.preventDefault();
  });
}

function mute() {
  if (bgm.muted) {
    bgm.muted = false;
    mutebtn.style.background = 'url(svg/unmute.svg) no-repeat';
  } else {
    bgm.muted = true;
    mutebtn.style.background = 'url(svg/mute.svg) no-repeat';
  }
}
