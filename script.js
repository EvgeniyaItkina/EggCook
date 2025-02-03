const buttonSoftEgg = document.querySelector('.soft-boiled-egg');
const buttonMediumEgg = document.querySelector('.medium-boiled-egg');
const buttonHardEgg = document.querySelector('.hard-boiled-egg');
const timer = document.querySelector('.timer');
const startButton = document.querySelector('.egg-timer');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal');
const alarmSound = document.getElementById('alarm-sound');
let countdown;
let manualReset = false;

//set time
function setTime(time) {
    if (countdown) {
        clearInterval(countdown);
        countdown = null;
    }
    manualReset = false;
    timer.innerHTML = time;
    closeModal();
}

//change time on button click
buttonSoftEgg.addEventListener('click', () => setTime("00:03:00"));
buttonMediumEgg.addEventListener('click', () => setTime("00:05:00"));
buttonHardEgg.addEventListener('click', () => setTime("00:10:00"));

//start timer
startButton.addEventListener('click', function () {
    if (countdown) {
        clearInterval(countdown);
    }
    manualReset = false;

    countdown = setInterval(function () {
        let [hours, minutes, seconds] = timer.innerHTML.split(':').map(Number);

        if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(countdown);
            countdown = null;
            if (!manualReset) {
                showModal();
                playAlarm();
            }
            return;
        }

        if (seconds === 0) {
            if (minutes === 0) {
                hours--;
                minutes = 59;
            } else {
                minutes--;
            }
            seconds = 59;
        } else {
            seconds--;
        }

        let formattedTime =
            (hours < 10 ? '0' : '') + hours + ':' +
            (minutes < 10 ? '0' : '') + minutes + ':' +
            (seconds < 10 ? '0' : '') + seconds;

        timer.innerHTML = formattedTime;
    }, 1000);
});

//show modal window
function showModal() {
    modal.style.display = "flex";
    setTimeout(() => {
        modal.style.opacity = "1";
    }, 10);
}

closeModalButton.addEventListener('click', function () {
    closeModal();
});

// close modal window
function closeModal() {
    modal.style.opacity = "0";
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
    stopAlarm();
}

// play alarm sound
function playAlarm() {
    alarmSound.currentTime = 0; // start sound from the beginning
    alarmSound.loop = true; // loop the sound
    alarmSound.play();
}

// stop alarm sound
function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

document.addEventListener('click', (event) => {
    const isButtonClick = event.target.matches('.soft-boiled-egg, .medium-boiled-egg, .hard-boiled-egg, .egg-timer');
    closeModal();
    if (!isButtonClick && countdown) {
        clearInterval(countdown);
        countdown = null;
        manualReset = true;
        timer.innerHTML = "00:00:00";
        
    }
});
