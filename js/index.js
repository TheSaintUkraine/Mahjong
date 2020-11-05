var gameCont;
function startnew() {
  gameCont = false;
  localStorage.setItem('gameType',gameCont)
  document.location = 'game.html';
}
function cont() {
  gameCont = true;

  localStorage.setItem('gameType',gameCont);
  document.location = 'game.html';
}
