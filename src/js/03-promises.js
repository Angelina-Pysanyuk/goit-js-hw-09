import Notiflix from 'notiflix';

const submitBtn = document.querySelector('button');
const firstDelay = document.querySelector('input[name=delay]');
const stepDelay = document.querySelector('input[name=step]');
const amount = document.querySelector('input[name=amount]');

const createPromise = (position, delay) => {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

function onclick(e) {
  e.preventDefault();
  for (let i = 1; i <= amount.value; i++) {
    const afterFirst = +firstDelay.value + stepDelay.value * (i - 1);
    createPromise(i, i === 1 ? firstDelay.value : afterFirst)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

submitBtn.addEventListener('click', onclick);
