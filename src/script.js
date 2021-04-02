"use strict";
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
function oldCode() {
    // NOTE: Woo spaghetti code! :)
    // Need to work on simplifying and refactoring, 
    // everything has become way more complex than necessary.
    // play button
    var playButtonEle = document.getElementById('playIcon');
    var playing = false;
    var intervalId;
    function playButton() {
        playButtonEle === null || playButtonEle === void 0 ? void 0 : playButtonEle.classList.toggle('highlight');
        playing = !playing;
        if (playing) {
            if (hour === 0 && minute === 0 && second === 0)
                return;
            count();
            intervalId = setInterval(count, 1000);
        }
        else {
            audio.pause();
            clearInterval(intervalId);
        }
    }
    // handle clock
    var clockEle = document.getElementById('clock');
    var timeCheck;
    function getTime(time) {
        time = (clockEle === null || clockEle === void 0 ? void 0 : clockEle.innerText) || '1:0';
        timeToNum(time);
        timeCheck = time;
    }
    // @ts-ignore don't understand function overloading yet?
    clockEle === null || clockEle === void 0 ? void 0 : clockEle.addEventListener('keyup', getTime);
    function resetButton() {
        console.log(timeCheck);
        clockEle.innerText = timeCheck;
        // timeToNum(timeCheck);
    }
    var hour = 0;
    var minute = 0;
    var second = 60;
    function timeToNum(time) {
        // console.log(time);
        var timeSplit = time.split(':');
        // @ts-ignore type void oof
        hour = parseInt(timeSplit[0]);
        minute = parseInt(timeSplit[1]);
        if (hour >= 1) {
            minute += hour * 60;
        }
        // console.log(minute);
    }
    var audio = new Audio('alarm beep 1.mp3');
    audio.loop = true;
    function playAlarm() {
        // audio.load();
        audio.play();
    }
    // NOTE: counting function should be simplified so that the same logic (y === (1-60) then y -= 1, y === 0 then x -= 1 and reset x) can be used for seconds, minutes and hours, and can easily be reverse to count-up or count-down
    function count() {
        if (second === 0) {
            second = 59;
            if (minute > 0) {
                minute -= 1;
            }
        }
        else {
            second -= 1;
        }
        if (minute > 60) {
            hour = Math.trunc(minute / 60);
            minute -= hour * 60;
        }
        clockEle.innerText = hour + ":" + minute;
        document.documentElement.style.cssText = "--secondsPseudo: ':" + second + "'";
        if (hour === 0 && minute === 0 && second === 0) {
            playAlarm();
            clearInterval(intervalId);
        }
    }
}
// toolbox
function matchy(str, regex) {
    if (str.match(regex) !== null) {
        return str.match(regex)[0];
    }
    else {
        return '';
    }
}
// setup page
document.getElementById('clock').innerText = '0:00';
document.documentElement.style.cssText = '--secondsPseudo: \':00\'';
// get local time
// NOTE: for use in the future allowing one to see what time timers will end
// or for creating timers based on when you want them to end
// const currentDate = new Date();
// const localTime = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
// console.log(localTime);
// time object
var time = {
    hour: 0,
    minute: 0,
    second: 0,
};
// get user inputted time
function getTime() {
    var input = document.getElementById('clock').innerText;
    if (input === null || input === '')
        return;
    if (input.search(':') !== -1) {
        time.hour = parseInt(matchy(input, /\d+(?=:)/)) || 0;
        time.minute = parseInt(matchy(input, /(?<=:)\d+/)) || 0;
    }
    else {
        time.hour = 0;
        time.minute = parseInt(matchy(input, /\d+/)) || 0;
    }
    time.second = 0;
}
// play button
var playing = false;
var simplifiedTime;
var intervalId;
function playButton() {
    var _a;
    if (simplifiedTime === undefined) {
        simplifiedTime = time.hour * 3600 + time.minute * 60 + time.second;
    }
    (_a = document.getElementById('playIcon')) === null || _a === void 0 ? void 0 : _a.classList.toggle('highlight');
    playing = !playing;
    if (playing) {
        intervalId = setInterval(countUp, 1000);
    }
    else {
        clearInterval(intervalId);
    }
}
// playButton() countDown() variation
// function playButton() {
// 	simplifiedTime = time.hour * 3600 + time.minute * 60 + time.second;
// 	if (simplifiedTime === 0) { return; }
// 	document.getElementById('playIcon')?.classList.toggle('highlight');
// 	playing = !playing;
// 	if (playing) { 
// 		intervalId = setInterval(countDown, 1000);
// 	} else { 
// 		clearInterval(intervalId); 
// 	}
// }
// reset button
function resetButton() {
    if (playing) {
        playButton();
    }
    simplifiedTime = 0;
    updater();
}
// counting 
function countDown() {
    if (simplifiedTime === 0) {
        playButton();
        return;
    }
    simplifiedTime -= 1;
    updater();
}
function countUp() {
    simplifiedTime += 1;
    updater();
}
// time formatter
var timeFormatted = {
    num: {
        hour: 0,
        minute: 0,
        second: 0,
    },
    str: {
        hour: '0',
        minute: '0',
        second: '0',
    }
};
function formatZeroes(str) {
    return str.length === 1 ? "0" + str : str;
}
function formatter() {
    var totalSeconds = simplifiedTime;
    timeFormatted.num.hour = totalSeconds / 3600 >= 1 ? Math.floor(totalSeconds / 3600) : 0;
    totalSeconds -= timeFormatted.num.hour * 3600;
    timeFormatted.num.minute = totalSeconds / 60 >= 1 ? Math.floor(totalSeconds / 60) : 0;
    totalSeconds -= timeFormatted.num.minute * 60;
    timeFormatted.num.second = totalSeconds;
    timeFormatted.str.hour = timeFormatted.num.hour.toString();
    timeFormatted.str.minute = formatZeroes(timeFormatted.num.minute.toString());
    timeFormatted.str.second = formatZeroes(timeFormatted.num.second.toString());
}
// update GUI
function updater() {
    formatter();
    document.getElementById('clock').innerText = timeFormatted.str.hour + ":" + timeFormatted.str.minute;
    document.documentElement.style.cssText = "--secondsPseudo: ':" + timeFormatted.str.second + "'";
}
