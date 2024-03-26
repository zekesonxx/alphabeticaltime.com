'use strict';
const hours_table = [8, 11, 5, 4, 9, 1, 7, 6, 10, 3, 12, 2];
const hours_table_24 = [8, 18, 11, 15, 5, 4, 14, 9, 19, 1, 7, 17, 6, 16, 10, 13, 3, 12, 20, 21, 23, 22, 2, 0];
const minutes_table = [
    8, 18, 11, 15, 58, 55, 54, 59, 51, 57, 56, 53,
   52, 50,  5,  4, 14, 48, 45, 44, 49, 41, 47, 46,
   43, 42, 40,  9, 19,  1,  7, 17,  6, 16, 10, 13,
   38, 35, 34, 39, 31, 37, 36, 33, 32, 30,  3, 12,
   28, 25, 24, 29, 21, 27, 26, 23, 22, 20,  2,  0
];

function swap12Hour() {
    if (is24Hour) {
        is24Hour = false;
        document.getElementById("cadetkelly").innerText = "12h";
        window.location.hash = '12hour';
    } else {
        is24Hour = true;
        document.getElementById("cadetkelly").innerText = "24h";
        window.location.hash = '24hour';
    }
    updateClock();
}


var is24Hour = false;

function updateClock() {
    let time = new Date();
    let minutes = time.getMinutes();
    let hours = time.getHours();

    let hour;
    let minute = minutes_table[minutes];
    if (is24Hour) {
        hour = hours_table_24[hours];
        var clock = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    } else {
        let ampm = (hours >= 12) ? "PM" : "AM";
        if (hours > 12) { hours -= 12; }
        hour = hours_table[hours];
        var clock = `${hour.toString()}:${minute.toString().padStart(2, "0")}<span id="ampm">${ampm}</span>`;
    }
    document.getElementById("clock").innerHTML = clock;
    document.getElementById("error_hour").innerText = Math.abs(hours-hour);
    document.getElementById("error_hour_s").innerText = Math.abs(hours-hour) == 1 ? "" : "s";
    document.getElementById("error_min").innerText = Math.abs(minutes-minute);
    document.getElementById("error_min_s").innerText = Math.abs(minutes-minute) == 1 ? "" : "s";
}

var lastMin = new Date().getMinutes();

setInterval(function() {
    let min = new Date().getMinutes();
    if (min != lastMin) {
        lastMin = min;
        updateClock();
    }
}, 500);

window.addEventListener('load', function() {
    if (this.location.hash.indexOf('12') != -1) {
        is24Hour = false;
    } else if (this.location.hash.indexOf('24') != -1) {
        is24Hour = true;
    }
    updateClock();
});