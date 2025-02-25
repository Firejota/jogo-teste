import { Objeto, Personagem, Obstaculo } from "./classes";

const personagem = new Personagem({posicaoX: 50, posicaoY: canvas.height - 50, tamanhoX: 50, tamanhoY: 50,})
const obstaculo = new Obstaculo({posicaoX: canvas.width - 100, posicaoY: canvas.height - 100, tamanhoX: 50, tamanhoY: 100,})


function verificaColisao(){
    if(
        personagem.posicaoX <= obstaculo.posicaoX + obstaculo.tamanhoX &&
        personagem.posicaoX >= obstaculo.posicaoX - obstaculo.tamanhoX &&
        personagem.posicaoY <= obstaculo.posicaoY + obstaculo.tamanhoY &&
        personagem.posicaoY >= obstaculo.posicaoY - obstaculo.tamanhoY
    ){
        Objeto.gameOver(ctx);
    }
}
function loop () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    personagem.desenhar(ctx, 'black');
    personagem.atualizar();
    obstaculo.desenhar(ctx, 'red');
    obstaculo.atualizar();
    verificaColisao();
    requestAnimationFrame(loop);
}

export {verificaColisao, loop}