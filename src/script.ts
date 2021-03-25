/* eslint-disable @typescript-eslint/ban-ts-comment */

// buttons
const playButtonEle = document.getElementById('playIcon');
let playing = false;
let intervalId: number;

function playButton() {
	playButtonEle?.classList.toggle('highlight');
	playing = !playing;

	if (playing) {
		count();
		intervalId = setInterval(count, 1000);
	} else {
		clearInterval(intervalId);
	}
}

// handle clock
const clockEle = document.getElementById('clock');
let time: string;

function getTime(time: string) {
	time = clockEle?.innerText || '1:00';
	console.log(time);
	timeToNum(time);
}

// @ts-ignore don't understand function overloading yet?
clockEle?.addEventListener('keyup', getTime);

let hour = 0;
let minute = 0;
let second = 60;

function timeToNum(time: string) {
	const timeSplit = time.split(':');
	// @ts-ignore type void oof
	hour = parseInt(timeSplit[0]);
	minute = parseInt(timeSplit[1]);

	if (hour >= 1) {
		minute += hour * 60;
	}

	console.log(minute);
}

function count() {
	if (second === 1) {
		second = 60;
		if (minute === 0) return;
		minute -= 1;
	} else {
		second -= 1;
	}

	if (minute > 60) {
		hour = Math.trunc(minute / 60);
		minute -= hour * 60;
	}

	clockEle!.innerText = `${hour}:${minute}:${second}`;
}



