import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  forma: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
}

refs.forma.addEventListener('submit', onFormSubmit)

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() =>{
      if (shouldResolve) {
        resolve({position, delay})
        return
      }
        reject({position, delay})
      }, delay)
    })
};

const onGeneratePromises = () => {
  const referral = {
    delay: Number(refs.delay.value),
    delayStep: Number(refs.step.value),
    amount: Number(refs.amount.value),
  }
    for (let i = 1; i <= referral.amount; i += 1) {
      createPromise(i, referral.delay)
        .then(({ position, delay }) => {
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
      referral.delay += referral.delayStep;
    }
}

function onFormSubmit (e) {
  e.preventDefault();
  onGeneratePromises()
  e.currentTarget.reset()
}



