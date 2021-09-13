//Distribuição das cartas no tabuleiro

const tabuleiro=document.querySelector("#tabuleiro");
const imagens= [
    'cloyster.png','gardevoir.png','ho-oh.png',
    'keldeo.png','leafon.png','lugia.png',
    'maractus.png','panpour.png'
];

$("#menu").hide();

let cardHTML = '';

imagens.forEach(img => {
    cardHTML += `
    <div class="carta" data-carta="${img}">
        <img class="frente" src="img/${img}">
        <img class="verso" src="img/pokeball.png">
    </div>
    `;
});

tabuleiro.innerHTML = cardHTML+cardHTML;

const cartas=document.querySelectorAll(".carta");

let primeiracarta, segundacarta;

//Lock faz com que o usuario não consiga virar mais de 2 cartas ao mesmo tempo 

let lock=false;

var count=0;

//Função para virar as cartas

function flipcard(){
    if(lock) return false;
    this.classList.add('flip');

    if(!primeiracarta){
        primeiracarta = this;
        return false;
    }

    segundacarta=this;

    check();
}

//Função para verificar se as duas cartas são iguais

function check(){
    let match = primeiracarta.dataset.carta == segundacarta.dataset.carta;

    !match ? disable() : reset(match);
}

//Função para desvirar as cartas

function disable(){
    lock=true;
    setTimeout(() =>{
    primeiracarta.classList.remove("flip");
    segundacarta.classList.remove("flip");
    reset();
    }, 1000);
}

//Função para embaralhar as cartas

(function shuffle(){
    cartas.forEach( carta => {
        let rand = Math.floor(Math.random()* 16);
        carta.style.order = rand;
    })
}())

//Função para resetar as variaveis

function reset(match=false){
    if(match){
        primeiracarta.removeEventListener("click", flipcard);
        segundacarta.removeEventListener("click", flipcard);

        count = count + 1;
//IF para mostrar a tela final
        if(count == 8){
            setTimeout(()=>{

                $("#b1").hide();
                $("#tabuleiro").hide();
                $("#menu").show();

            }, 1000);
            
        }
    }
    [primeiracarta, segundacarta, lock]=[null,null,false];
    
}

cartas.forEach(carta => carta.addEventListener('click', flipcard));