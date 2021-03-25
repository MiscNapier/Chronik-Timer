"use strict";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// buttons
var playButtonEle = document.getElementById('playIcon');
var playing = false;
var intervalId;
function playButton() {
    playButtonEle === null || playButtonEle === void 0 ? void 0 : playButtonEle.classList.toggle('highlight');
    playing = !playing;
    if (playing) {
        count();
        intervalId = setInterval(count, 1000);
    }
    else {
        clearInterval(intervalId);
    }
}
// handle clock
var clockEle = document.getElementById('clock');
var time;
function getTime(time) {
    time = (clockEle === null || clockEle === void 0 ? void 0 : clockEle.innerText) || '1:00';
    console.log(time);
    timeToNum(time);
}
// @ts-ignore don't understand function overloading yet?
clockEle === null || clockEle === void 0 ? void 0 : clockEle.addEventListener('keyup', getTime);
var hour = 0;
var minute = 0;
var second = 60;
function timeToNum(time) {
    var timeSplit = time.split(':');
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
        if (minute === 0)
            return;
        minute -= 1;
    }
    else {
        second -= 1;
    }
    if (minute > 60) {
        hour = Math.trunc(minute / 60);
        minute -= hour * 60;
    }
    clockEle.innerText = hour + ":" + minute + ":" + second;
}
