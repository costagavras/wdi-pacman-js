// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;

// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'orange',
  character: 'Pokey',
  edible: false
};

// replace this comment with your four ghosts setup as objects
var ghosts = [inky, blinky, pinky, clyde];

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  if (powerPellets > 0){
    console.log('Score: ' + score + '     Lives: ' + lives + '\n\nPower pellets: ' + powerPellets);
  } else {
    console.log('Score: ' + score + '     Lives: ' + lives);
  }
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(p) Eat Power-Pellet');
  var i;
  var edible;
  for (i = 0; i < ghosts.length; i++) {
      if (ghosts[i].edible ? edible = "edible" : edible = "inedible");
      console.log("(" + (i+1) + ") Eat " + ghosts[i].name + " (" + edible + ")");
  }
  // console.log('(1) Eat' + ghosts[0].name + "(" + ghosts[0].edible + ")");
  // console.log('(2) Eat' + ghosts[1].name + "(" + ghosts[1].edible + ")");
  // console.log('(3) Eat' + ghosts[2].name + "(" + ghosts[2].edible + ")");
  // console.log('(4) Eat' + ghosts[3].name + "(" + ghosts[3].edible + ")");
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost) {
  if (!ghost.edible){
    lives -=1;
    console.log(`\n\nA ${ghost.colour} ${ghost.name} ate me!`);
    if (lives < 0){
    console.log(`\nAnd now I'really dead!`);
    process.exit();
    }
  } else {console.log(`\nAte a ${ghost.character} ${ghost.name} and he was good!`);
    score += 200;
    ghost.edible = false;
  }
}

function eatPowerPellet(){
  console.log('\nGo Go Gadget Power Pellet!');
  score += 50;
  ghosts.forEach(function(ghost) {
    ghost.edible = true;
  });
  powerPellets -=1;
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      if (powerPellets < 1){
        console.log('\nNo more Pellets left!');
        break;
      }
      eatPowerPellet();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 1000); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
