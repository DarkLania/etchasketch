let nr=16;
let nc=16;
let grey=0;
let rainbow=0;
let toggle='on';
let choice=document.querySelector('#black');
bindBtns();
document.querySelector('#new').addEventListener('click',newGrid);
makeGrid(nr,nc);

function makeGrid(nr,nc){
    let grid=document.querySelector('#grid');
    for(let i=0;i<nr;i++){
        let row=document.createElement('div');
        row.classList.add('row');
        grid.appendChild(row);
        for(let i=0;i<nc;i++){
            let col=document.createElement('div');
            col.classList.add('col');
            row.appendChild(col);
        }
    }
    let dots=document.querySelectorAll('.col');
    dots.forEach(dot=>{
        dot.addEventListener('click',toggleDots);
    });
}

function toggleDots(e){
    if(toggle==='on'){
        toggle='off';
        enableDots(e);
    }
    else{
        toggle='on';
        disableDots();
    }
}

function enableDots(e){
    let dots=document.querySelectorAll('.col');
    dots.forEach(dot => {
        dot.removeEventListener('click',enableDots);
        dot.addEventListener('mouseover',paint);
        paint(e);
    });
}

function disableDots(){
    let dots=document.querySelectorAll('.col');
    dots.forEach(dot => {
        dot.removeEventListener('click',disableDots);
        dot.removeEventListener('mouseover',paint);
    });
}

function paint(e){
    switch(choice.id){
        case 'black':
            e.target.style.backgroundColor='black';
            break;
        case 'rgb':
            let a=parseInt(Math.random()*255);
            let b=parseInt(Math.random()*255);
            let c=parseInt(Math.random()*255);
            e.target.style.backgroundColor=
                `rgb(${a},${b},${c})`;
            break;
        case 'grey':
            e.target.style.backgroundColor=
                `rgb(${198-grey},${198-grey},${198-grey})`;
            grey=grey+22;
            if(grey>198) grey=0;
            break;
        case 'rainbow':
            switch(rainbow){                
                case 0: 
                    e.target.style.backgroundColor='rgb(148,0,211';
                    break;
                case 1:
                    e.target.style.backgroundColor='rgb(75,0,130)';
                    break;
                case 2:
                    e.target.style.backgroundColor='rgb(0,0,255)';
                    break;
                case 3:
                    e.target.style.backgroundColor='rgb(0,255,0)';
                    break;
                case 4:
                    e.target.style.backgroundColor='rgb(255,255,0)';
                    break;
                case 5:
                    e.target.style.backgroundColor='rgb(255,127,0)';
                    break;
                case 6:
                    e.target.style.backgroundColor='rgb(255,0,0)';
                    break;
            }
            rainbow++;
            if(rainbow>6) rainbow=0;
            break;
        case 'erase':
            e.target.style.backgroundColor='white';
            break;
        case 'custom':
            let custom=choice.childNodes[1].value;
            e.target.style.backgroundColor=custom;
            break;
    }
}

function bindBtns(){
    let btns=document.querySelectorAll('.btn');
    btns[1].classList.add('active-btn');
    for(let i=1;i<btns.length;i++){
        btns[i].addEventListener('click',mode,{capture:true});
    }

}

function mode(e){
    btnReset();
    choice=e.target;
    if(choice.id==='color')  choice=document.querySelector('#custom');
    choice.classList.add('active-btn');
}

function btnReset(){
    let btns=document.querySelectorAll('.btn');
    for(let i=1;i<btns.length;i++){
        if(btns[i].classList.contains('active-btn')){
            btns[i].classList.remove('active-btn');
        }
    }
}

function newGrid(){
    let c=0;
    while(c===0){
        nr=(prompt('Set the number of rows between 16-100: '));
        nc=(prompt('Set the number of columns between 16-100: '));
        if(nr===null || nc===null) c=1;
        else{
            nr=parseInt(nr);
            nc=parseInt(nc);
            if(nr>100||nr<16||isNaN(nr)||isNaN(nc)||nc<16||nc>100){
                alert('Your rows and columns must be bewteen 16 and 100 integer values.');
            }
            else{
                document.querySelector('#grid').textContent='';
                makeGrid(nr,nc);
                c=1;
            }
        }
    }
    toggle='on';
}