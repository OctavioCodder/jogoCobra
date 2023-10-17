const playBoard = document.querySelector(".play-game");
const contadorPontos = document.querySelector(".pontos");
const melhorContadorPontos = document.querySelector(".melhor-pontuacao");
const controles = document.querySelectorAll(".controles i");

let gameOver = false;
let foodX, foodY;
let cobraX = 5, cobraY = 10;
let corpoCobra = [];
let velocidadeX = 0, velocidadeY = 0;
let interromperGameOver;
let pontos = 0;

let melhorPontuacao = localStorage.getItem("high-score") || 0;
melhorContadorPontos.innerText = `Melhor Pontuação: ${melhorPontuacao}`;


const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const mensagemGameOver = () => {
    clearInterval(interromperGameOver);
    alert("Game Over! Para jogar novamente precione em 'Ok'")
    location.reload();
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocidadeY != 1) {
        velocidadeX = 0;
        velocidadeY = -1;
    } else if(e.key === "ArrowDown" && velocidadeY != -1) {
        velocidadeX = 0;
        velocidadeY = 1;
    }else if(e.key === "ArrowLeft" && velocidadeX != 1) {
        velocidadeX = -1;
        velocidadeY = 0;
    }else if(e.key === "ArrowRight" && velocidadeX != -1) {
        velocidadeX = 1;
        velocidadeY = 0;
    }
}

controles.forEach(key => {
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));
});

const initGame = () => {
    if(gameOver) return mensagemGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(cobraX === foodX && cobraY === foodY) {
        changeFoodPosition();
        corpoCobra.push([foodX, foodY]);
        console.log(corpoCobra);
        pontos++;

        melhorPontuacao = pontos >= melhorPontuacao ? pontos : melhorPontuacao;
        localStorage.setItem("high-score", melhorPontuacao);
        contadorPontos.innerText = `Pontos: ${pontos}`;
        melhorContadorPontos.innerText = `Melhor Pontuação: ${melhorPontuacao}`;



    }

    for (let i = corpoCobra.length -1; i > 0; i--) {
        corpoCobra[i] = corpoCobra[i - 1];        
    }

    corpoCobra[0] = [cobraX, cobraY];
    
    cobraX += velocidadeX;
    cobraY += velocidadeY;

    if(cobraX <= 0 || cobraX > 30 || cobraY <= 0 || cobraY > 30) {
        gameOver = true;
    }
    
    for (let i = 0; i < corpoCobra.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${corpoCobra[i][1]} / ${corpoCobra[i][0]}"></div>`;
        if(i !== 0 && corpoCobra[0][1] === corpoCobra[i][1] && corpoCobra[0][0] === corpoCobra[i][0]){
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
interromperGameOver = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);