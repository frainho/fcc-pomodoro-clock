//Define default values of session and break
var sessionM = 25;
var breakM = 5;
var stop = false;
var secs = 0;
var breakS = 0;
var timerInterv;
var outMins, outSecs;
var breakInterv;
var audio = new Audio('https://s0.vocaroo.com/media/download_temp/Vocaroo_s0mjFIESkpa2.mp3');
audio.playbackRate = 2; 
audio.loop = false;
//write the defaul values of session and break to the page to serve as reference
document.getElementById("breakM").innerHTML = breakM + " m";
document.getElementById("sessionM").innerHTML = sessionM + " m";
document.getElementById("clock").innerHTML = sessionM + "m " + 0 + "s ";

//decrease break minutes, do not allow it to go below 1
document.getElementById("lessB").addEventListener("click", function() {
  if (breakM = 1) {
    document.getElementById("breakM").innerHTML = breakM + " m";
  } else {
    breakM--;
    document.getElementById("breakM").innerHTML = breakM + " m";
  }
});

//increase break minutes
document.getElementById("moreB").addEventListener("click", function() {
  breakM++;
  document.getElementById("breakM").innerHTML = breakM + " m";
});

//decrease session minutes, do not allow it to go below 1
document.getElementById("lessS").addEventListener("click", function() {
  if (sessionM = 1) {
    document.getElementById("breakM").innerHTML = breakM + " m";
  } else {
    sessionM--;
    document.getElementById("sessionM").innerHTML = sessionM + " m";
    document.getElementById("clock").innerHTML = sessionM + "m " + 0 + "s ";
  }
});
//increase session minutes
document.getElementById("moreS").addEventListener("click", function() {
  sessionM++;
  document.getElementById("sessionM").innerHTML = sessionM + " m";
  document.getElementById("clock").innerHTML = sessionM + "m " + 0 + "s ";
});

//When the play button is clicking set some falues and call the function with 1s interval
document.getElementById("play").addEventListener("click", function() {
  document.getElementById("clock").className = "clockRot clock";
  stop = false;
  document.getElementById("play").disabled = true;
  secs = sessionM * 60;
  breakS = breakM * 60;
  timerInterv = setInterval(doCountDown, 1000);
  document.getElementById("clock").innerHTML = sessionM + "m " + 0 + "s ";
});

//actual counter function
function doCountDown() {
  //if the reset button is pressed, it exits the function
  if (stop) {
    return;
  } else {
    if (!pause) {
      //check if pause is false so it does nothing despite the function is still running
      //if not, we decrement the seconds and write it on the page
      secs--;
      if (secs <= 0) {
        // if the seconds finish, we sound the alarm, display the final value, reset the values so there is no interference and call the break function with 1s interval
        audio.playbackRate = 4; 
        audio.loop = false;
        audio.play();
        document.getElementById("clock").innerHTML = 0 + "m " + 0 + "s ";
        reset();
        breakInterv = setInterval(doBreakCDown, 1000);
        return;
      }
      outMins = parseInt(secs / 60);
      outSecs = secs % 60;
      document.getElementById("clock").innerHTML =
        outMins + "m " + outSecs + "s ";
    }
  }
}

function doBreakCDown() {
  if (stop) {
    
    return;
  } else {
    if (!pause) {
      //check if pause is false so it does nothing despite the function is still running
      breakS--;
      if (breakS <= 0) {
     // if the seconds finish, we sound the alarm, display the final value, reset the values so there is no interference and call the countdown function with 1s interval
        audio.playbackRate = 4; 
        audio.loop = false;
        audio.play();
        document.getElementById("clock").innerHTML = 0 + "m " + 0 + "s ";
        reset();
        timerInterv = setInterval(doCountDown, 1000);
        return;
      }
      outMins = parseInt(breakS / 60);
      outSecs = breakS % 60;
      document.getElementById("clock").innerHTML =
        outMins + "m " + outSecs + "s ";
    }
  }
  
  
  

}
//pause/resume functions with eventlistners
var pause = false;

document.getElementById("pause").addEventListener("click", function() {
  document.getElementById("clock").className = "clock";
  pause = true;
});
document.getElementById("resume").addEventListener("click", function() {
  document.getElementById("clock").className = "clockRot clock";
  pause = false;
});

//reset function

function reset() {
  clearInterval(timerInterv);
  clearInterval(breakInterv);
  secs = sessionM * 60;
  breakS = breakM * 60;
  outMins = outSecs = 0;
}

//Upon button pressed, we call the above reset function and reset default values

document.getElementById("reset").addEventListener("click", function() {
  reset();
  document.getElementById("clock").innerHTML = sessionM + "m " + 0 + "s "
  document.getElementById("play").disabled = false;
  document.getElementById("clock").className = "clock";
});