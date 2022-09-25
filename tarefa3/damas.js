const tamanhoCelula = 40;
let pecaId = 0;
let aux=false;
document.body.append(criaTabuleiro());

function criaTabuleiro() {
    const tamanho = 8;
    let tabela = document.createElement('table');

    tabela.style.borderStyle = 'solid';
    tabela.style.borderSpacing = 0;
    tabela.style.margin = 'auto';

    for (let i = 0; i < tamanho; i++) {
        let linha = document.createElement('tr');
        tabela.append(linha);
        for (let j = 0; j < tamanho; j++) {
            let celula = document.createElement('td');
            linha.append(celula);

            celula.style.width = `${tamanhoCelula}px`;
            celula.style.height = `${tamanhoCelula}px`;
            if (i % 2 == j % 2) {
                celula.style.backgroundColor = 'black';
                celula.addEventListener('dragover',allowDrop);
                celula.addEventListener('drop',drop);
                if (i * 8 + j <= 24) {
                    const imagem = criaPeca('black')
                    celula.append(imagem);
                    imagem.setAttribute('draggable','false');
                } else if (i * 8 + j >= 40) {
                    celula.append(criaPeca('red'));
                }
            } else {
                celula.style.backgroundColor = 'white';
            }
        }
    };
    return tabela;
}
var elementosBlack = document.getElementsByClassName('black');
var elementosRed = document.getElementsByClassName('red');
//var h1 = document.getElementsByTagName("span");
function criaPeca(cor) {
    let imagem = document.createElement('img');
    imagem.setAttribute('src', `img/${cor}.png`);
    imagem.setAttribute('width', `${tamanhoCelula-4}px`);
    imagem.setAttribute('height', `${tamanhoCelula-4}px`);
    imagem.id='pecaId'+pecaId++;
    imagem.className=''+cor;
    imagem.addEventListener('dragstart',drag);
    //imagem.addEventListener('drag',drag);
    //imagem.addEventListener('dragend',drop);
    return imagem;
}
// const imagem=document.querySelectorAll('img');
//     imagem.forEach(img=>{
//     imagem.addEventListener('dragstart',dragstart);
//     imagem.addEventListener('drag',drag);
//     imagem.addEventListener('dragend',dragend);
// })
function allowDrop(ev) {
    ev.preventDefault();
}

function dragstart(){
    console.log('> Start Dragging')
}

function drag(ev){
    //console.log(ev.target.id);
    ev.dataTransfer.setData("pecaId", ev.target.id);
    console.log(ev.dataTransfer.getData("pecaId"));
}

function dragend(){
    console.log('> Stoped Dragging')
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("pecaId");
    ev.target.appendChild(document.getElementById(data));

    //Alterando Jogadores
    for(var i = 0; i < elementosRed.length; i++) {
        elementosRed[i].setAttribute('draggable',''+aux);
    }
    aux=!aux;
    for(var i = 0; i < elementosBlack.length; i++) {
        elementosBlack[i].setAttribute('draggable',''+aux);
    }
    if (aux==true){
        let turno = document.getElementById('turno');
        turno.innerHTML = 'Preto';
        turno.style.color='black';

        //console.log(document.getElementById('turno'));
        // console.log(h1[0]);
        // console.log(h1);
        // h1.innerHTML="Preto";
        // console.log(h1[0]);
        // console.log(h1);
        //h1[0]='<span id="turno" style="color: black;">Preto</span>';
        //h1[0].setAttribute('outerHTML',"'<span id=\"turno\" style=\"color: red;\">Vermelho</span>'");
        //h1.innerText="Preto";
    }
    else {
        let turno = document.getElementById('turno');
        turno.innerHTML = 'Vermelho';
        turno.style.color='red';
    }
}
