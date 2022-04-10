import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const $input = document.querySelector('#datetime-picker');
const $days = document.querySelector('span[data-days]');
const $hours = document.querySelector('span[data-hours]');
const $minutes = document.querySelector('span[data-minutes]');
const $seconds = document.querySelector('span[data-seconds]');
const $startButton = document.querySelector('button[data-start]');
const $divTimer = document.querySelector('div.timer');
const $classField = document.querySelectorAll('.field');
const $classValue = document.querySelectorAll('.value');
let timerID = null;

$divTimer.style.display = 'flex';
$divTimer.style.margin = '30px';

$classField.forEach(el => {
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.alignItems = 'center';
  el.style.paddingRight = '15px';
});

$classValue.forEach(el => {
  el.style.fontSize = '45px';
});

$startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const selectedDateInMs = selectedDate.getTime();
    const today = new Date();
    if (selectedDate <= today) {
      $startButton.disabled = true;
      Notify.warning('Please choose a date in the future');
    } else {
      $startButton.disabled = false;
      localStorage.setItem('selectedDayByUser', selectedDateInMs);
    }
  },
};

flatpickr($input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  const text = value.toString();
  const textWithNumberBefore = text.padStart(2, 0);
  return textWithNumberBefore;
};

const convertUserMsToObject = () => {
  const today = new Date();
  const selectedDateFromLocaleStorage = localStorage.getItem('selectedDayByUser');
  const timeToSelectedDate = selectedDateFromLocaleStorage - today;
  if (timeToSelectedDate < 0) {
    return clearInterval(timerID);
  }

  const objectToReturn = convertMs(timeToSelectedDate);
  return objectToReturn;
};

const addDateToHtml = () => {
  const startCountingDate = convertUserMsToObject();
  if ( startCountingDate !== undefined){
  $days.innerHTML = addLeadingZero(startCountingDate.days);
  $hours.innerHTML = addLeadingZero(startCountingDate.hours);
  $minutes.innerHTML = addLeadingZero(startCountingDate.minutes);
  $seconds.innerHTML = addLeadingZero(startCountingDate.seconds);
  }
  console.log("hello");
};

const countingDown = () => {
  timerID = setInterval(() => {
    addDateToHtml();
  }, 1000);
};

$startButton.addEventListener('click', countingDown);
