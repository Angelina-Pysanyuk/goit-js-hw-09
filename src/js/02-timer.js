import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let timerId = null;
let time = 0;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(date) {
    const dateSet = Date.parse(date[0]);
    const dateNow = Date.parse(new Date());
    if (dateSet < dateNow) {
      Notiflix.Notify.warning('Please choose a date in the future', {
        timeout: 2000,
      });
    } else {
      startBtn.disabled = false;
      time = dateSet - dateNow;
    }
  },
};

flatpickr(input, options);

const onStartBtnClick = () => {
  timerId = setInterval(() => {
    time -= 1000;
    const converter = convertMs(time);
    days.innerText = addLeadingZero(converter.days);
    hours.innerText = addLeadingZero(converter.hours);
    minutes.innerText = addLeadingZero(converter.minutes);
    seconds.innerText = addLeadingZero(converter.seconds);
    if (time <= 0) clearInterval(timerId);
  }, 1000);
};

startBtn.addEventListener('click', onStartBtnClick);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const toString = String(value);
  return toString.padStart(2, '0');
}
