function winAnimation() {
    let W = window.innerWidth;
let H = window.innerHeight;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const maxConfettis = 150;
const particles = [];

const possibleColors = [
  "DodgerBlue",
  "OliveDrab",
  "Gold",
  "Pink",
  "SlateBlue",
  "LightBlue",
  "Gold",
  "Violet",
  "PaleGreen",
  "SteelBlue",
  "SandyBrown",
  "Chocolate",
  "Crimson"
];

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
  this.x = Math.random() * W; // x
  this.y = Math.random() * H - H; // y
  this.r = randomFromTo(11, 33); // radius
  this.d = Math.random() * maxConfettis + 11;
  this.color =
    possibleColors[Math.floor(Math.random() * possibleColors.length)];
  this.tilt = Math.floor(Math.random() * 33) - 11;
  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = function() {
    context.beginPath();
    context.lineWidth = this.r / 2;
    context.strokeStyle = this.color;
    context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    return context.stroke();
  };
}

function Draw() {
  const results = [];

  // Magical recursive functional love
  requestAnimationFrame(Draw);

  context.clearRect(0, 0, W, window.innerHeight);

  for (var i = 0; i < maxConfettis; i++) {
    results.push(particles[i].draw());
  }

  let particle = {};
  let remainingFlakes = 0;
  for (var i = 0; i < maxConfettis; i++) {
    particle = particles[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.y <= H) remainingFlakes++;

    // If a confetti has fluttered out of view,
    // bring it back to above the viewport and let if re-fall.
    if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
      particle.x = Math.random() * W;
      particle.y = -30;
      particle.tilt = Math.floor(Math.random() * 10) - 20;
    }
  }

  return results;
}

window.addEventListener(
  "resize",
  function() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false
);

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
  particles.push(new confettiParticle());
}

// Initialize
canvas.width = W;
canvas.height = H;
var audio = new Audio('win.mp3');
audio.play();
Draw();
}
conf = {
    piece_colors: Object.freeze([
        "white",
        "black"
    ]),
    piece_shapes: Object.freeze([
        "square",
        "circle"
    ])
}

class Game {
    constructor(gameid, dimensions = 4) {
        this.gameid = gameid
        this.GameBoard = new GameBoard(dimensions);
        this.players = this.createPlayers();
        this.isOver = false;
        this.activePiece = undefined;
        this.lastActivePiece = undefined;
        this.lastPlayedLocation = undefined;
        this.currentPlayerTurn = "white";

    }
    createPlayers() {
        let resulting_arr = {}
        for (let color = 0; color < conf.piece_colors.length; color++) {
            resulting_arr[conf.piece_colors[color]] = new Player(conf.piece_colors[color]);
        }
        return resulting_arr
    }
    // ws11
    setActivePiece(piece) {
        if (piece.color != this.currentPlayerTurn) {
            return false;
        }
        if (!this.activePiece) {
            this.players[piece.color].pieces[piece].used = true;
            this.activePiece = piece;
            return true
        }
        else {
            return false
        }
    }

    searchForWin() {
        for (const r of this.GameBoard.board) {
            if (!r[0] || !r[1] || !r[2] || !r[3]) continue;
            if (r[0].color === r[1].color && r[0].color === r[2].color && c[0].color === c[3].color) {
                return true;
            }
            if (r[0].isTall === r[1].isTall && r[0].isTall === r[2].isTall && r[0].isTall === r[3].isTall) {
                return true;
            }

            if (r[0].shape === r[1].shape && r[0].shape === r[2].shape && r[0].shape === r[3].shape) {
                return true;
            }
            if (r[0].isHoled === r[1].isHoled && r[0].isHoled === r[2].isHoled && r[0].isHoled === r[3].isHoled) {
                return true;
            }
        }
        let b = this.GameBoard.board
        for (let i = 0; i < b.length; i++) {
            let c = [b[0][i], b[1][i], b[2][i], b[3][i]]
            if (!c[0] || !c[1] || !c[2] || !c[3]) continue;
            if (c[0].color === c[1].color && c[0].color === c[2].color && c[0].color === c[3].color) {
                return true
            }
            if (c[0].isTall === c[1].isTall && c[0].isTall === c[2].isTall && c[0].isTall === c[3].isTall) {
                return true
            }

            if (c[0].shape === c[1].shape && c[0].shape === c[2].shape && c[0].shape === c[3].shape) {
                return true
            }
            if (c[0].isHoled === c[1].isHoled && c[0].isHoled === c[2].isHoled && c[0].isHoled === c[3].isHoled) {
                return true
            }
        }
        if (b[0][0] && b[1][1] && b[2][2] && b[3][3]) {
            if (b[0][0].color === b[1][1].color && b[0][0].color === b[2][2].color && b[0][0].color === b[3][3].color) {
                return true
            }
            if (b[0][0].isTall === b[1][1].isTall && b[0][0].isTall === b[2][2].isTall && b[0][0].isTall === b[3][3].isTall) {
                return true
            }

            if (b[0][0].shape === b[1][1].shape && b[0][0].shape === b[2][2].shape && b[0][0].shape === b[3][3].shape) {
                return true
            }
            if (b[0][0].isHoled === b[1][1].isHoled && b[0][0].isHoled === b[2][2].isHoled && b[0][0].isHoled === b[3][3].isHoled) {
                return true
            }
        }
        if (b[0][3] && b[1][2] && b[2][1] && b[3][0]) {
            if (b[0][3].color === b[1][2].color && b[0][3].color === b[2][1].color && b[0][3].color === b[3][0].color) {
                return true
            }
            if (b[0][3].isTall === b[1][2].isTall && b[0][3].isTall === b[2][1].isTall && b[0][3].isTall === b[3][0].isTall) {
                return true
            }

            if (b[0][3].shape === b[1][2].shape && b[0][3].shape === b[2][1].shape && b[0][3].shape === b[3][0].shape) {
                return true
            }
            if (b[0][3].isHoled === b[1][2].isHoled && b[0][3].isHoled === b[2][1].isHoled && b[0][3].isHoled === b[3][0].isHoled) {
                return true
            }
        }
        return false;
    }

    checkWin() {
        this.isOver = this.searchForWin()
        return this.isOver;
    }



    placeActivePieceAtLocation(idx, idy) {
        if (this.activePiece) {
            this.GameBoard.board[idx][idy] = this.activePiece;
            this.lastActivePiece = this.activePiece;
            this.activePiece = undefined;
            this.lastPlayedLocation = { x: idx, y: idy };
            this.currentPlayerTurn = this.currentPlayerTurn === "white" ? "black" : "white"
        }
    }

}

class Player {
    constructor(color) {
        this.color = color
        this.pieces = this.createGamePieces();
    }
    createGamePieces() {
        var pieces = {}
        for (let shape = 0; shape < conf.piece_shapes.length; shape++) {
            for (let isHoled = 0; isHoled < 2; isHoled++) {
                for (let isTall = 0; isTall < 2; isTall++) {
                    pieces[this.color[0] + conf.piece_shapes[shape][0] + isHoled.toString()[0] + isTall.toString()[0]] = new WoodPiece(this.color, conf.piece_shapes[shape], isHoled, isTall);
                }
            }
        }
        return pieces
    }
}

class GameBoard {
    constructor(dimensions = 4) {
        this.dimensions = dimensions;
        this.board = Array.from(Array(dimensions), () => new Array(dimensions))
    }
}

class WoodPiece {
    constructor(color, shape, isHoled, isTall) {
        this.color = color;
        this.shape = shape;
        this.isHoled = isHoled;
        this.isTall = isTall;
        this.used = false;
    }
    toString() {
        return this.color[0] + this.shape[0] + this.isHoled.toString()[0] + this.isTall.toString()[0]
    }
}

function virtualize_game_board(g, ctx, tbl) {
    for (let i = 0; i < ctx.board.length; i++) {
        const tr = document.createElement("tr")
        for (let j = 0; j < ctx.board.length; j++) {
            const td = document.createElement("td")
            const elm = ctx.board[i][j];

            td.id = `game-board-${i}-${j}`;
            if (!elm) {
                td.classList = ["board-spot", "empty-board-spot"].join(" ")
            } else {
                td.classList = [
                    "board-spot", "board-pice",
                    elm.isHoled ? `${elm.shape}-${elm.color}-holed-pice holed-pice` : "",
                    elm.isTall ? `tall-${elm.color}-pice` : "",
                    `${elm.color}-pice`, `${elm.shape}-pice`,
                ].join(" ")
            }
            tr.appendChild(td)

            function handler() {
                const elm = g.activePiece
                if(!elm||g.isOver) return;
                g.placeActivePieceAtLocation(i, j);
                document.getElementById("active").innerHTML = "";
                if (!elm) {
                    td.classList = ["board-spot", "empty-board-spot"].join(" ")
                } else {
                    td.classList = [
                        "board-spot", "board-pice",
                        elm.isHoled ? `${elm.shape}-${elm.color}-holed-pice holed-pice` : "",
                        elm.isTall ? `tall-${elm.color}-pice` : "",
                        `${elm.color}-pice`, `${elm.shape}-pice`,
                    ].join(" ")
                }

                if (g.checkWin()) {
                    winAnimation();
                }
                td.removeEventListener("click", handler);
            }
            td.addEventListener("click", handler)
        }
        tbl.appendChild(tr)
    }
}

function virtualize_players(g, plr, tbl) {
    const tr = document.createElement("tr");
    pieces = Object.values(plr.pieces);

    for (let j = 0; j < pieces.length; j++) {
        const td = document.createElement("td");
        const elm = pieces[j];

        td.id = `player-pice-${plr.color}-${j}`;
        if (!elm) {
            td.classList = ["board-spot", "empty-board-spot"].join(" ");
        } else {
            td.classList = [
                "board-spot", "board-pice",
                elm.isHoled ? `${elm.shape}-${elm.color}-holed-pice holed-pice` : "",
                elm.isTall ? `tall-${elm.color}-pice` : "",
                `${elm.color}-pice`, `${elm.shape}-pice`,
            ].join(" ");
        }

        function handler() {
            if (!g.setActivePiece(elm)|| g.isOver) {
                return;
            }
            const act = document.getElementById("active")
            act.innerHTML = `
            <div>
                <span class="active-color">${elm.color}</span>
                <span class="active-shape">${elm.shape}</span>
                <span class="active-holed">${elm.isHoled ? 'holed' : 'full'}</span>
                <span class="active-tall">${elm.isTall ? 'tall' : 'short'}</span>
            </div>
            `;
            act.appendChild(td);
            td.removeEventListener("click", handler);
        }
        td.addEventListener("click", handler);
        tr.appendChild(td);
        tbl.appendChild(tr);
    }
}

function main() {
    let g = new Game(1234, 4);

    const plr1 = document.getElementById("plr1");
    const plr2 = document.getElementById("plr2");
    const brd = document.getElementById("board");

    virtualize_players(g, g.players["white"], plr1);
    virtualize_game_board(g, g.GameBoard, brd);
    virtualize_players(g, g.players["black"], plr2);

    window.addEventListener("active-piece-changed", () => {

    });

    window.addEventListener("active-piece-played", () => {

    });
}

main();
