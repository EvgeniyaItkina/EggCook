const addTimeButton = document.getElementById('add-seconds');
const buttonSoftEgg = document.querySelector('.soft-boiled-egg');
const buttonMediumEgg = document.querySelector('.medium-boiled-egg');
const buttonHardEgg = document.querySelector('.hard-boiled-egg');
const timer = document.querySelector('.timer');
const startButton = document.getElementById('start');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal');
const alarmSound = document.getElementById('alarm-sound');

//variablel to stop the timer
let countdown;
//variable to check if the timer was reset manually
let manualReset = false;

//change time on button click
buttonSoftEgg.addEventListener('click', () => setTime("00:03:00"));
buttonMediumEgg.addEventListener('click', () => setTime("00:05:00"));
buttonHardEgg.addEventListener('click', () => setTime("00:10:00"));

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

// one function to update timer
function updateTimer(hours, minutes, seconds) {
    if (seconds < 0) {
        if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
        } else {
            seconds = 0;
        }
    }

    // transform to format 00:00:00
    if (seconds >= 60) {
        minutes += Math.floor(seconds / 60);
        seconds = seconds % 60;
    }

    if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;
    }

    // Обновляем таймер
    timer.innerHTML = 
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds;
}


//add 15 seconds to timer
addTimeButton.addEventListener('click', () => {
    let [hours, minutes, seconds] = timer.innerHTML.split(':').map(Number);
    updateTimer(hours, minutes, seconds + 15);
});

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

        updateTimer(hours, minutes, seconds - 1);
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
