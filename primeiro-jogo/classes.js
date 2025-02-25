const canvas = document.getElementById("jogoCanvas");
const ctx = canvas.getContext('2d');
class Objeto {
    #velocidade;
    #gravidade;
    constructor(propriedades){
        this.posicaoX = propriedades.posX;
        this.posicaoY = propriedades.posY;
        this.tamanhoX = propriedades.tamX;
        this.tamanhoY = propriedades.tamY;
        this.#velocidade = 0;
        this.#gravidade = 0.5;
        this.perdeu = false;
        this.pontos = 0;
    };
    desenhar = function (ctx, cor) {
        ctx.fillStyle = cor;
        ctx.fillRect(this.posicaoX, this.posicaoY, this.tamanhoX, this.tamanhoY);
    };
    atualizar = function() {
        //adicionar nos filhos
    };
    parar = function () {
        this.velocidade = 0; 
    }
    colisao = function () {
        this.perdeu = true;
        this.gravidade = 0;
    }
    gameOver = function(ctx) {
        Objeto.colisao();
        Obstaculo.parar();
        Personagem.parar();
        ctx.fillStyle = 'red';
        ctx.fillRect((canvas.width / 2) - 200, (canvas.height / 2) - 70, 400, 100);
        ctx.fillStyle = 'black';
        ctx.font = '50px Arial';
        ctx.fillText("GAME OVER", (canvas.width/2) - 150, (canvas.height/2))
    };
}
class Obstaculo extends Objeto{
    constructor(propriedades){
        super(propriedades);
        this.velocidade = 5;
    }
    atualizar = function (){
        if(this.posicaoX + this.tamanhoX < 0){
            this.posicaoX = canvas.clientWidth;
            pontos += (this.velocidade * 10);
            document.getElementById('pontos').innerHTML = `Pontuação: ${pontos.toFixed()}`;
            this.velocidade *= 1.1;
        }else{
            this.posicaoX -= this.velocidade
        }
    }
}
class Personagem extends Objeto{
    constructor(propriedades){
        super(propriedades);
        this.pulando = false;
        this.parado = true;
    }
    atualizar = function (){
        if(this.pulando == true){
            this.velocidade += gravidade;
            this.posicaoY += this.velocidade
            if(this.posicaoY >= canvas.height - 50 && this.pulando == true){
                this.velocidade = 0;
                this.pulando = false;
            }
        }
    }
    isPersonagemPulando = function (){
        return this.pulando
    }
}
export {Objeto, Obstaculo, Personagem};