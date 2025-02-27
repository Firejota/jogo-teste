const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')
let gameOver = false
let pontos = 0;
let jaPontuou = false;
let indexObstaculo = 0;
let pontuacaoMaxima = localStorage.getItem('pontuacaoMaxima') ? parseInt(localStorage.getItem('pontuacaoMaxima')) : 0

document.getElementById('pontuacaoMaxima').innerHTML = `Pontuação Máxima: ${pontuacaoMaxima}`;

class Entidade {
    #gravidade
    constructor(x,y,largura,altura){
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura=altura
        this.#gravidade=0.5
    }
    desenhar = function (ctx, cor) {
        ctx.fillStyle = cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
    atualizar = function(){
        //modificar esta entidade para atualizar posição do objeto na tela
        console.log('atualizar posiçao da entidade na tela')
    }
    getGravidade() {
        return this.#gravidade;
    }
    setGravidade() {
        this.#gravidade = 0;
    }
    atualizaPontuacao = function (){    
        if(personagem.x > obstaculos[indexObstaculo].x && gameOver == false && jaPontuou == false){
            pontos += (obstaculos[indexObstaculo].getVelocidadeX() * 10)
            console.log((obstaculos[indexObstaculo].getVelocidadeX() * 5))
            document.getElementById('pontuacao').innerHTML = `Pontos: ${parseInt(pontos)}`
            if(pontos > pontuacaoMaxima){
                localStorage.setItem('pontuacaoMaxima', pontos)
            }
            jaPontuou = true;
        }
    }
}
class Personagem extends Entidade{
    #velocidadey
    #pulando
    constructor(x,y,largura,altura){
        super(x,y,largura,altura);
        this.#velocidadey=0
        this.#pulando = false
    }
    saltar = function(){
        this.#velocidadey -= 15
        this.#pulando = true
    }
    isPersonagemPulando = function(){
        return this.#pulando
    }
    atualizar = function(){
        if(this.#pulando == true){
            this.#velocidadey += this.getGravidade()
            this.y += this.#velocidadey
            if(this.y>=canvas.height-50){
                this.#velocidadey = 0
                this.#pulando=false
            }
        }
    }
    verificarColisao = function(obstaculo){
        if(
            this.x < obstaculo.x + obstaculo.largura &&
            this.x + this.largura > obstaculo.x &&
            this.y < obstaculo.y + obstaculo.altura &&
            this.y + this.altura > obstaculo.y
        ){  
            this.#houveColisao(obstaculo)
        }
    }
    #houveColisao = function (obstaculo){
        personagem.pararPersonagem()
        personagem.setGravidade()
        obstaculo.pararObstaculo()
        ctx.fillStyle='red'
        ctx.fillRect((canvas.width/2)-200,(canvas.height/2)-70,400,100)
        ctx.fillStyle='black'
        ctx.font="50px Arial"
        ctx.fillText("GAME OVER",(canvas.width/2)-150,(canvas.height/2))
        gameOver=true
    }
    pararPersonagem = function (){
        this.#velocidadey = 0;
    }

}
class Obstaculo extends Entidade{
    #velocidadex
    constructor(x,y,largura,altura){
        super(x,y,largura,altura);
        this.#velocidadex=4
    }
    getVelocidadeX = function () {
        return this.#velocidadex
    }
    atualizar = function(){
        this.x -= this.getVelocidadeX()
        if (this.x <= 0-this.largura){
            indexObstaculo = Math.floor(Math.random() * 3)
            jaPontuou = false;
            this.x = canvas.width-100
            this.#velocidadex += 0.5
        }
    }
    pararObstaculo = function () {
        this.#velocidadex = 0
    }
}

const obstaculos = [];
obstaculos.push(new Obstaculo(canvas.width-100,canvas.height-120,50,120))
obstaculos.push(new Obstaculo(canvas.width-100,canvas.height-160,50,80))
obstaculos.push(new Obstaculo(canvas.width-100,canvas.height-60,100,60))

const personagem = new Personagem(50, canvas.height-50, 50, 50)

document.addEventListener("click", (e) => {
    if (gameOver==true){
        location.reload()
    }
})

document.addEventListener('keypress', (e) =>{
    if (e.code == 'Space' && personagem.isPersonagemPulando() == false && gameOver == false){
        // personagem.velocidadey = -15
        // personagem.pulando = true
        personagem.saltar()
    }
})

function loop () {
    document.getElementById('pontuacaoMaxima').innerHTML = `Pontuação Máxima: ${parseInt(localStorage.getItem('pontuacaoMaxima'))}`
    ctx.clearRect(0,0,canvas.width, canvas.height)
    obstaculos[indexObstaculo].desenhar(ctx, 'red')
    personagem.desenhar(ctx, 'white')
    personagem.verificarColisao(obstaculos[indexObstaculo])
    obstaculos[indexObstaculo].atualizar()
    personagem.atualizar()
    obstaculos[indexObstaculo].atualizaPontuacao();
    requestAnimationFrame(loop)
}

loop()
// aplicar polimorfismo para mudar o desenho do personagem