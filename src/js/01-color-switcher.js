const $startButton = document.querySelector('button[data-start');
const $stopButton = document.querySelector('button[data-stop');
const $body = document.querySelector('body');
let timerID = null;

$startButton.disabled = false;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const settingRandomBackgroundColor = targetName => {
  targetName.style.backgroundColor = getRandomHexColor();
};

$startButton.addEventListener('click', () => {
  $startButton.disabled = true;
  timerID = setInterval(() => settingRandomBackgroundColor($body), 1000);
});
$stopButton.addEventListener('click', () => {
  clearInterval(timerID);
});
