//////////////////////////////////////////////////////////////
/////////////////////////configs//////////////////////////////
// variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

// velocidade da bolinha  
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variaveis minha raquete
let xRaquete = 5;
let yRaquete = 163;
let raqueteComprimento = 7.5;
let raqueteAltura = 75;
let velocidadeRaquete = 10;

// variaveis raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 163;
let velocidadeYOponente;
let chanceDeErrar = 35;

// variavel colisao
let colidiu = false;

// placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;

/////////////////////////configs//////////////////////////////
//////////////////////////////////////////////////////////////

function preload() {
  trilha = loadSound("sons/trilha.mp3");
  ponto = loadSound("sons/ponto.mp3");
  raquetada = loadSound("sons/raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  
  movimentaBolinha();
  
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  
  movimentaMinhaRaquete();
  movimentaRaqueteOpenente();
  
  verificaColisaoRaquete(xRaquete, yRaquete);  
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente); 
  mostraPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *=-1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *=-1;
  } 
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    if (podeSeMoverUp()) {
      yRaquete -= velocidadeRaquete;
    }
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (podeSeMoverDown()) {
      yRaquete += velocidadeRaquete;
    }
  }
}

function podeSeMoverUp() {
  return yRaquete > 0
  ;
}

function podeSeMoverDown() {
  return yRaquete < 320;
}

function verificaColisaoRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  
  if (colidiu) {
      velocidadeXBolinha *=-1;
      raquetada.play();
  }
}

function movimentaRaqueteOpenente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 50;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
}

function mostraPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(72,61,139))
  rect(130, 10, 40, 20, 20);
  rect(430, 10, 40, 20, 20);
  
  fill(255);
  text(meusPontos, 150, 26);
  text(pontosOponente, 450, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
      ponto.play();
  }
  
  if (xBolinha < 10) {
    pontosOponente += 1;
      ponto.play();
    }
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 57) {
    chanceDeErrar = 58
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

