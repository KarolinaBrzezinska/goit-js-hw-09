import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const $input = document.querySelector('#datetime-picker');
const $days = document.querySelector('span[data-days]');
const $hours = document.querySelector('span[data-hours]');
const $minutes = document.querySelector('span[data-minutes]');
const $seconds = document.querySelector('span[data-seconds]');
const $startButton = document.querySelector('button[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const selectedDateInMs = selectedDate.getTime();
    const today = new Date();
    if (selectedDate < today) {
      window.alert('Please choose a date in the future');
    }
    localStorage.setItem('selectedDayByUser', selectedDateInMs);
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
  const objectToReturn = convertMs(timeToSelectedDate);
  return objectToReturn;
};

const addDateToHtml = () => {
  const startCountingDate = convertUserMsToObject();

  $days.innerHTML = addLeadingZero(startCountingDate.days);
  $hours.innerHTML = addLeadingZero(startCountingDate.hours);
  $minutes.innerHTML = addLeadingZero(startCountingDate.minutes);
  $seconds.innerHTML = addLeadingZero(startCountingDate.seconds);
};

const countingDown = () => {
  setInterval(() => {
    addDateToHtml();
  }, 1000);
};

$startButton.addEventListener('click', countingDown);
