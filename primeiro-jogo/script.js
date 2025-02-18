const canvas = document.getElementById("jogoCanvas");
const ctx = canvas.getContext('2d');



function desenhaPersonagem(){
    ctx.fillStyle = 'black';
    ctx.fillRect(personagem.posx, personagem.posy, personagem.tamx, personagem.tamy);
}

const personagem = {
    posx: 50,
    posy: canvas.height - 50,
    tamx: 50,
    tamy: 50,
}

const obstaculo = {
    posx: canvas.width - 100,
    posy: canvas.height - 100,
    tamx: 50,
    tamy: 100,
    velocidade: 3,
}

function desenhaObstaculo(){
    ctx.fillStyle = 'red';
    ctx.fillRect(obstaculo.posx, obstaculo.posy, obstaculo.tamx, obstaculo.tamy )
}

function atualizaObstaculo(){
    obstaculo.posx -= obstaculo.velocidade
}

function verificaColisao(){
    if(
        personagem.posx <= obstaculo.posx + obstaculo.tamx &&
        personagem.posx >= obstaculo.posx - obstaculo.tamx
    ){
        gameOver();
    }
}

function gameOver(){
    document.addEventListener("click", (e) => {
        location.reload()
    })
    obstaculo.velocidade = 0;
    atualizaObstaculo();
    ctx.fillStyle = 'red';
    ctx.fillRect((canvas.width / 2) - 200, (canvas.height / 2) - 50, 400, 100);
    ctx.fillStyle = 'black';
    ctx.font = '50px Arial';
    ctx.fillText("GAME OVER", (canvas.width/2) - 150, (canvas.height/2))
}

function loop () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    desenhaPersonagem();
    desenhaObstaculo();
    atualizaObstaculo();
    verificaColisao();
    requestAnimationFrame(loop);
}

loop();