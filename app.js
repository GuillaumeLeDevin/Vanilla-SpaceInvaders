const container = document.querySelector('.grid');
const display = document.querySelector('h3');
let result = 0;
let allDivs;
let alienInvaders = [];
let shooterPosition = 229;
let direction = 1;
let width = 20;

function gridAndAliensBuilder() {

    let indexAttr = 0;

    for(i = 0; i < 240; i++){

        if(indexAttr === 0) {
            const bloc = document.createElement('div');
            bloc.setAttribute('data-left', 'true');
            container.appendChild(bloc);
            indexAttr++;
        }
        else if(indexAttr === 19) {
            const bloc = document.createElement('div');
            bloc.setAttribute('data-right', 'true');
            container.appendChild(bloc);
            indexAttr = 0;
        }
        else {
            const bloc = document.createElement('div');
            container.appendChild(bloc);
            indexAttr++;
        }
    }

    for(i = 1; i < 53; i++){

        if(i === 13){
            i = 21;
            alienInvaders.push(i);
        } else if(i === 33) {
            i = 41;
            alienInvaders.push(i);
        } else {
            alienInvaders.push(i);
        }

    }

    allDivs = document.querySelectorAll('.grid div');
    alienInvaders.forEach(invader => {
        allDivs[invader].classList.add('alien');
    })

    allDivs[shooterPosition].classList.add('shooter');

}
gridAndAliensBuilder();

function moveShooter(e){

    allDivs[shooterPosition].classList.remove('shooter');

    if(e.keyCode === 37){
        if(shooterPosition > 220){
            shooterPosition--;
        }
    }
    if(e.keyCode === 39){
        if(shooterPosition < 239){
            shooterPosition++;
        }
    }
    allDivs[shooterPosition].classList.add('shooter');
}

document.addEventListener('keydown', moveShooter);

//move aliens
let downRight = true;
let downLeft = true;

function moveAliens(){

    for(let i = 0; i < alienInvaders.length; i++){
        if(allDivs[alienInvaders[i]].getAttribute('data-right') === 'true'){
            
            if(downRight){
                direction = 20;
                setTimeout(() => {
                    downRight = false;
                }, 50);
            }
            else if (downRight === false){
                direction = -1;
            }
            
            downLeft = true;

        } else if(allDivs[alienInvaders[i]].getAttribute('data-left') === 'true'){
            
            if(downLeft){
                direction = 20;
                setTimeout(() => {
                    downLeft = false;
                }, 50);
            }
            else if (downLeft === false){
                direction = 1;
            }
            downRight = true;
        }
    }

    for(let i = 0; i < alienInvaders.length; i++){
        allDivs[alienInvaders[i]].classList.remove('alien');
    }

    for(let i = 0; i < alienInvaders.length; i++){
        alienInvaders[i] += direction;
    }

    for(let i = 0; i < alienInvaders.length; i++){
        allDivs[alienInvaders[i]].classList.add('alien');
    }

    if(allDivs[shooterPosition].classList.contains('alien', 'shooter       ')){
        display.textContent = 'GAME OVER!!!';
        allDivs[shooterPosition].classList.add('boom');
        clearInterval(invaderId);
    }

    for(let i = 0; i < alienInvaders.length; i++){

        if(alienInvaders[i] > allDivs.length - width){
            display.textContent = 'GAME OVER!!!';
        clearInterval(invaderId);
        }
        
    }

}

invaderId = setInterval(moveAliens, 200);

//Laser

function shoot(e){

    let laserId;
    let currentLaser = shooterPosition;

    function moveLaser(){

        allDivs[currentLaser].classList.remove('laser');
        currentLaser -= width;
        allDivs[currentLaser].classList.add('laser');

        if(allDivs[currentLaser].classList.contains('alien')){
            allDivs[currentLaser].classList.remove('laser');
            allDivs[currentLaser].classList.remove('alien');
            allDivs[currentLaser].classList.add('boom');

            alienInvaders = alienInvaders.filter(el => el !== currentLaser)

            setTimeout(() => allDivs[currentLaser].classList.remove('boom'), 250)
            clearInterval(laserId);

            result++;
            if(result === 36){
                display.textContent = "Well done, you win!!!";
                clearInterval(invaderId);
            } else {
                display.textContent = `Score: ${result}`;
            }
        }

        if(currentLaser < width){
            clearInterval(laserId);
            setTimeout(() => {
                allDivs[currentLaser].classList.remove('laser')
            }, 100)
        }

    }

    if(e.keyCode === 32){
        laserId = setInterval(() => {
            moveLaser();
        }, 100);
    }

}

document.addEventListener('keyup', shoot);