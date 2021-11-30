import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

new flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0].getTime() < new Date().getTime()){
            Notify.failure('Please choose a date in the future');
            refs.startBtn.setAttribute('disabled', true)
            return;
        }
        refs.selectedTime = selectedDates[0].getTime()
        refs.startBtn.removeAttribute('disabled')  
    },
 }); 

 const refs = {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
    startBtn: document.querySelector('button[data-start]'),
    clockface: document.querySelector('#datetime-picker'),
    selectedTime: null,
}

class Timer {
    constructor({onTick}){
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;


    this.init();
    
    }
    
    init(){
    const time = this.getTimeComponents(0);
    this.onTick(time);
    }
    start(){
        if (this.isActive){
            return;
        }
    
        const startTime = refs.selectedTime;
        this.isActive = true;

        this.intervalId = setInterval(() =>{
           

            const currentTime = new Date().getTime(); 
            const deltaTime = startTime - currentTime;

            if(deltaTime <= 0) {
                clearInterval(this.intervalId); 
                return;
            }
            
            const time = this.getTimeComponents(deltaTime);
        
            this.onTick(time);
            
            
        }, 1000);
        
    
    }
    
    

    addLeadingZero(value){
        return String(value).padStart(2, '0')
    }
    
    getTimeComponents(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
    
}

const timer = new Timer({
    onTick: updateClockfase,

});

refs.startBtn.addEventListener('click', timer.start.bind(timer));

function updateClockfase({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
}

