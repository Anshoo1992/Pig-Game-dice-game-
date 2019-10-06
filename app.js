
class DicePigGame {
    constructor() {
        this.init();
    }
    init() {
        this.scores = [0, 0];
        this.roundScore = 0;
        this.gamePlaying = true;

        this.dice_1 = 0;
        this.dice_2 = 0;
        this.finalScore = 0;

        this.setDefaultValue();
        this.setActivePlayer();
        this.toggleDice('none');
    }

    rollDice() {
        if (this.gamePlaying) {

            this.dice_1 = Math.floor(Math.random() * 6) + 1;
            this.dice_2 = Math.floor(Math.random() * 6) + 1;

            this.finalScore = document.querySelector('.final-score').value ? document.querySelector('.final-score').value : 100;

            this.toggleDice('block');
            this.setDiceImge();

            if (this.dice_1 !== 1 && this.dice_2 !== 1) {
                this.roundScore += this.dice_1 + this.dice_2;
                this.updateScore('current');
            }
            else this.nextPlayer();
        }
    }

    onHold() {
        if (this.gamePlaying) {

            this.scores[this.activePlayer] += this.roundScore;
            this.updateScore('score');

            if (this.scores[this.activePlayer] >= Number(this.finalScore)) {
                this.declareWinner();
                this.toggleDice('none');
                this.gamePlaying = false;
            } else {
                this.nextPlayer();
            }
        }
    }

    setDefaultValue() {
        for (let i = 0; i < 2; i++) {
            document.getElementById(`score-${i}`).textContent = 0;
            document.getElementById(`current-${i}`).textContent = 0
            document.querySelector(`.player-${i}-panel`).classList.remove('winner');
            document.querySelector(`.player-${i}-panel`).classList.remove('active');
            document.getElementById(`name-${i}`).textContent = `Player ${i + 1}`;
        }
    }

    setActivePlayer() {
        this.activePlayer = this.activePlayer == 0 ? 1 : 0;
        document.querySelector(`.player-${this.activePlayer}-panel`).classList.toggle('active');
    }

    setDiceImge() {
        let diceDOM = document.querySelectorAll('.dice');
        diceDOM[0].src = `images/dice-${this.dice_1}.png`;
        diceDOM[1].src = `images/dice-${this.dice_2}.png`;
    }

    updateScore(name) {
        let scoreToBeAdded = (name === 'score') ? this.scores[this.activePlayer] : this.roundScore;
        document.getElementById(`${name}-${this.activePlayer}`).textContent = scoreToBeAdded;
    }

    nextPlayer() {
        document.getElementById(`current-${this.activePlayer}`).textContent = 0;
        document.querySelector(`.player-${this.activePlayer}-panel`).classList.remove('active');
        this.roundScore = 0;
        this.setActivePlayer();
    }

    declareWinner() {
        document.getElementById(`name-${this.activePlayer}`).textContent = 'Winner !!'
        let winner = document.querySelector(`.player-${this.activePlayer}-panel`);
        winner.classList.remove('active');
        winner.classList.add('winner');
    }

    toggleDice(value) {
        let diceDOM = document.querySelectorAll('.dice');
        diceDOM.forEach(ele => ele.style.display = value)
    }

}



let newGame = new DicePigGame();
bindMethod()

function bindMethod() {
    document.querySelector('.btn-new').addEventListener('click', () => newGame.init());
    document.querySelector('.btn-roll').addEventListener('click', () => newGame.rollDice());
    document.querySelector('.btn-hold').addEventListener('click', () => newGame.onHold());
}
