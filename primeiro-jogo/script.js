const canvas = document.getElementById("jogoCanvas");
const ctx = canvas.getContext('2d');
let gravidade = 0.5
let perdeu = false
let pontos = 0;

document.addEventListener("keypress", (e) =>{
    if (e.code == "Space"){
        if(personagem.pulando == false && perdeu == false){
            personagem.velocidadey = -15;
            personagem.pulando = true;
        }
    }
})

document.addEventListener("click", (e) => {
    if(perdeu == true){
        location.reload()
    }
})

function desenhaPersonagem(){
    ctx.fillStyle = 'black';
    ctx.fillRect(personagem.posx, personagem.posy, personagem.tamx, personagem.tamy);
}


const personagem = {
    posx: 50,
    posy: canvas.height - 50,
    tamx: 50,
    tamy: 50,
    velocidadey: 0,
    pulando:false,
    parado:true,
}
const obstaculo = {
    posx: canvas.width - 100,
    posy: canvas.height - 100,
    tamx: 50,
    tamy: 100,
    velocidade: 5,
}

function atualizaPersonagem() {
    if(personagem.pulando == true){
        personagem.velocidadey += gravidade
        personagem.posy += personagem.velocidadey
        
        if(personagem.posy >= canvas.height - 50 && personagem.pulando == true){
            personagem.velocidadey = 0;
            personagem.pulando = false;
        }   
    }
}

function desenhaObstaculo(){
    ctx.fillStyle = 'red';
    ctx.fillRect(obstaculo.posx, obstaculo.posy, obstaculo.tamx, obstaculo.tamy )
}

function atualizaObstaculo(){
    if(obstaculo.posx + obstaculo.tamx < 0){
        obstaculo.posx = canvas.width
        pontos += (obstaculo.velocidade * 10)
        document.getElementById('pontos').innerHTML = `Pontuação: ${pontos.toFixed()}`
        obstaculo.velocidade *= 1.1
    }else{
        obstaculo.posx -= obstaculo.velocidade
    }
}

function verificaColisao(){
    if(
        personagem.posx <= obstaculo.posx + obstaculo.tamx &&
        personagem.posx >= obstaculo.posx - obstaculo.tamx &&
        personagem.posy <= obstaculo.posy + obstaculo.tamy &&
        personagem.posy >= obstaculo.posy - obstaculo.tamy
    ){
        gameOver();
    }
}

function gameOver(){
    perdeu = true;
    obstaculo.velocidade = 0
    personagem.velocidadey = 0
    gravidade = 0;
    atualizaObstaculo();
    ctx.fillStyle = 'red';
    ctx.fillRect((canvas.width / 2) - 200, (canvas.height / 2) - 70, 400, 100);
    ctx.fillStyle = 'black';
    ctx.font = '50px Arial';
    ctx.fillText("GAME OVER", (canvas.width/2) - 150, (canvas.height/2))
}

function loop () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    desenhaPersonagem();
    atualizaPersonagem();
    desenhaObstaculo();
    atualizaObstaculo();
    verificaColisao();
    requestAnimationFrame(loop);
}

loop();