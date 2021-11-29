const refs = {
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),  
    timerId: null,
}

refs.start.addEventListener('click', onStartBtnClick);
refs.stop.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

function onStartBtnClick(){
    refs.start.setAttribute('disabled', true);
    timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
}, 1000);
console.log(timerId);
};
    
function onStopBtnClick() {
    clearInterval(timerId);
    refs.stop.removeAttribute('disabled')  
    };
