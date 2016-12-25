$(() => {
  const bingoBoard = new BingoBoard(90);
  const bingoBoardView = new BingoBoardView();

  bingoBoardView.renderBoard(bingoBoard.size);

  $('#next-btn').click(() => {
    bingoBoardView.renderNextNumber(bingoBoard.callNextNumber());
  });
});

class BingoBoard {
  constructor(size) {
    this.size = size;
    this.calledNumbers = [];
  }

  callNextNumber() {
    const nextNumber = this._chooseRandomUncalledNumber();
    this.calledNumbers.push(nextNumber);

    return nextNumber;
  }

  _chooseRandomUncalledNumber() {
    let lookingForUncalledNumber = true;
    let randomNumber;

    do {
      randomNumber = getRandomInteger(1, this.size);

      if (!this.calledNumbers.includes(randomNumber)) {
        lookingForUncalledNumber = false;
      }
    } while (lookingForUncalledNumber);

    return randomNumber;
  }
}

class BingoBoardView {
  constructor() {
    this.$board = $('#bingo-board');
    this.$lastNumber = $('#last-number');
  }

  renderBoard(size) {
    let rendering = '<ul>';
    
    for (let i = 1; i <= size; i++) {
      rendering += `<li>${i}</li>`;
    }

    rendering += '</ul>';

    this.$board.html(rendering);
  }

  renderNextNumber(nextNumber) {
    this.$lastNumber.text(nextNumber);
    this.$getBoardNumberElement(nextNumber).addClass('called');
  }

  $getBoardNumberElement(number) {
    return this.$board.find(`li:nth-child(${number - 1})`);
  }
}

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
