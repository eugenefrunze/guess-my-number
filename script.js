class Game {
    static minLimit = 0;
    static maxLimit = 20;
    static #theNumber;
    static #attempts = 0;
    static #isGameStarted = false;

    static {
        this.#theNumber = this.CalculateTheNumber(this.minLimit, this.maxLimit);
        this.#attempts = this.CalculateAttempts(this.minLimit, this.maxLimit);
    }

    static RunGame(){
        if(this.#isGameStarted){
            //main container
            const gameContainer = document.createElement('div');
            gameContainer.className = 'gamecontainer';

            //gameCenter
            const gameCenter = document.createElement('div');
            gameCenter.className = 'gamecenter';
            gameContainer.appendChild(gameCenter);
        
            //restart button
            const restartButt = document.createElement('button');
            restartButt.className = 'btn_restart';
            restartButt.onclick = () => this.RestartGame(gameContainer);
            restartButt.textContent = 'Restart';
            gameCenter.appendChild(restartButt);
        
            //game header
            const gameHeader = document.createElement('p');
            gameHeader.innerText = 'Guess My Number';
            gameCenter.appendChild(gameHeader);
        
            // game message
            const gameMessage = document.createElement('p');
            gameMessage.className = 'message';
            gameMessage.innerText = 'waiting for number...';
            gameCenter.appendChild(gameMessage);
        
            //input
            const input = document.createElement('input');
            input.oninput = (e) => this.InputClamp(e, this.minLimit, this.maxLimit);
            input.min = this.minLimit;
            input.max = this.maxLimit;
            input.className = 'guess';
            input.type = 'number';
            gameCenter.appendChild(input);
        
            //check button
            const check = document.createElement('button');
            check.className = 'check';
            check.onclick = () => this.CheckTheGuess();
            check.textContent = 'check guess';
            gameCenter.appendChild(check);
        
            //append container to body
            document.body.appendChild(gameContainer);

        } else {
            //lobby container
            const lobbyContainer = document.createElement('div');
            lobbyContainer.className = 'lobbycontainer';
            
            //centered element
            const centerContainer = document.createElement('div');
            centerContainer.className = 'contcenter';
            lobbyContainer.appendChild(centerContainer);

            //game name
            const nameOfTheGame = document.createElement('h3');
            nameOfTheGame.className = 'nameOfTheGame';
            nameOfTheGame.textContent = 'Guess My Number';
            centerContainer.appendChild(nameOfTheGame);

            //start game button
            const startGame = document.createElement('button');
            startGame.className = 'startthegame';
            startGame.onclick = () => this.StartGame(lobbyContainer);
            startGame.textContent = 'Start the Game';
            centerContainer.appendChild(startGame);

            //append lobby to body
            document.body.appendChild(lobbyContainer);
        }
    }

    static StartGame(button){
        document.body.removeChild(button);
        this.#isGameStarted = true;
        this.RunGame();
    }

    static RestartGame(gameContainer){
        document.body.removeChild(gameContainer);
        this.#isGameStarted = false;
        this.#theNumber = this.CalculateTheNumber(this.minLimit, this.maxLimit);
        this.#attempts = this.CalculateAttempts(this.minLimit, this.maxLimit);
        this.ChangeBackgroundColor('#D7D7D7');
        console.clear();
        this.RunGame();
    }

    static CheckTheGuess(){
        const guess = Number(document.querySelector('.guess').value);
        console.log('Guess:', guess);

        // if(guess === undefined){
        //     this.ShowMessage('ERROR');
        // }

        if (guess === this.#theNumber) {
            this.ShowMessage(this.GetEndMessage('win'));
            this.SetCheckEnableStatus('false');
            this.SetInputEnableStatus('false');
            this.ChangeBackgroundColor('#03cb01');

        } else if (guess < this.#theNumber) {
            this.#attempts--;
            if(this.#attempts === 0){
                this.SetCheckEnableStatus('false');
                this.SetInputEnableStatus('false');
                this.ShowMessage(this.GetEndMessage('lost'));
            } else {
                this.ShowMessage(this.GetMistakeMessage('less'));
            }
        
        } else if (guess > this.#theNumber) {
            this.#attempts--;
            if(this.#attempts === 0){
                this.SetCheckEnableStatus('false');
                this.SetInputEnableStatus('false');
                this.ShowMessage(this.GetEndMessage('lost'));
            } else {
                this.ShowMessage(this.GetMistakeMessage('greater'));
            }
        }
    }

    static GetTheNumber(){
        return this.#theNumber;
    }

    static CalculateTheNumber(minLimit, maxLimit){
         return Math.trunc(Math.random() * maxLimit) + minLimit;
    }

    static CalculateAttempts(minLimit, maxLimit){
        return (maxLimit - minLimit) * 0.25;
    }

    static ShowMessage(message){
        document.querySelector('.message').textContent = message;
    }

    static GetMistakeMessage(ratio){
        return `Your number is ${ratio} than X, you have ${this.#attempts} more attempts`
    }

    static GetEndMessage(end){
        return `You ${end}. Number was ${this.GetTheNumber()}`;
    }

    static SetCheckEnableStatus(status){
        document.querySelector('.check').disabled = status;
    }

    static SetInputEnableStatus(status){
        document.querySelector('.guess').disabled = status;
    }

    static ChangeBackgroundColor(color){
        document.querySelector('body').style.backgroundColor = color;
    }

    static InputClamp(event, minLimit, maxLimit){
        // const input = document.querySelector('.guess');
        const check = document.querySelector('.check');
        const value = event.target.value;

        if(value > this.maxLimit) check.disabled = true; // input.value = this.maxLimit;
        else check.disabled = value < this.minLimit;
    }
}

Game.RunGame();
