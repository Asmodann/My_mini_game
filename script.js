include("Player");
include("Ball");
include("Brick");

window.addEventListener("load", function() {
  var canvas = document.getElementsByTagName("canvas")[0];
  var remake = document.getElementById("remake");
  var ctx = canvas.getContext("2d");

  var Player = new Player_("Bernard", canvas);
  var Ball = new Ball_(canvas);
  var Brick = new Brick_(canvas);

  document.addEventListener("keydown", function(ev) {
    Player.move_keyboard(ev.keyCode, canvas);
  });
  document.addEventListener("keyup", function(ev) {
    Player.move_keyboard(ev.keyCode, canvas);
  });

  /*remake.addEventListener("click", function() {
    window.location.reload();
  });*/
  setInterval(function() {
    if (!Player.is_alive || Player.won) {
      //remake.innerHTML = "<button>Rejouer</button>";
      return false;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Ball.collisionDetection(Brick, Player);
    Ball.move(canvas, Player);
    Ball.draw(canvas);
    Brick.draw(canvas, Player);
    Player.process_move(canvas);
    Player.draw(canvas);
    Player.gui(canvas, Brick);
  }, 30);
  
});


