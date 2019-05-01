/// <reference path="../TSDef/p5.global-mode.d.ts" />

//The Axiom-Array, "+F--F--F"
let kochSnowFlake = "+F--F--F".split("");
let segmentLength = 200;
let minimalSegmentLength = 1;
let theta = 60;

function setup() {
  createCanvas(650, 650, P2D);
  background(0);
  stroke(0, 255, 0);
  strokeWeight(1);
  angleMode(DEGREES);
}

let createCurve = setInterval(() => {
  console.log(segmentLength);

  if (segmentLength > minimalSegmentLength) {
    background(0);
    drawKochSnowFlake(segmentLength);
    calculateKochSnowFlake();
  }
  else {
    segmentLength = 500;
    kochSnowFlake = "+F--F--F".split("");
  }
}, 2000);

function calculateKochSnowFlake() {

  //Create a temporary curve to do all the calculations
  let kochSnowFlakeTemp = [];

  //We step through each element of the array
  //and apply the rules to it
  kochSnowFlake.forEach(function (element) {

    //When we hit a "F"....
    if (element === "F") {
      //...we create a temporary array, and it's elements are
      //the characters returned by the string.split operation
      let tempRuleArray = "F+F--F+F".split("");
      tempRuleArray.forEach(function (element1) {
        //Then we append the contents of tempRuleArray to kochSnowFlakeTemp
        kochSnowFlakeTemp.push(element1);
      });

    }
    //If the currently checked element is "+" or "-" we just append it
    else if (element === "+") kochSnowFlakeTemp.push(element);
    else if (element === "-") kochSnowFlakeTemp.push(element);

    kochSnowFlake = kochSnowFlakeTemp.slice(0);
    console.log(kochSnowFlake);
  });
}

function drawKochSnowFlake(length) {

  translate(80, 170);

  if (length > minimalSegmentLength) {

    push();

    //Draws the actual curve
    for (let i = 0; i < kochSnowFlake.length; i++) {
      const element = kochSnowFlake[i];

      if (element === "F") {
        line(0, 0, length, 0);
        translate(length, 0);
      }
      //-theta = turn left, theta = turn right
      else if (element === "+") {
        rotate(theta);
      }
      else if (element === "-") {
        rotate(-theta);
      }
    }
    pop();

    //Shorten segments for next iteration
    segmentLength *= 0.335;
  }
}

function draw() {
}