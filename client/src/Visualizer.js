import React, { useState, useEffect } from 'react'
import Sketch from 'react-p5';
import 'p5/lib/addons/p5.sound';

//IMPORTANT: Each array has a length of 5, the order is treble, lowmid, mid, highmid, bass

// W key = Reverse direction of where the diamonds are currently going
//A key = increases the top speed of diamonds when a song is playing by a set amount
//S key = decreases the top speed of diamonds when a song is playing by a set amount
// Enter key = Cycles through colors! 

// react-p5 has this so we can use p5 methods outside of draw, and set up.
const myp5 = new window.p5()
//to get access to the fft function in setup, I needed to get the prototype of this instance of P5 constructor, dont ask me why.
const P5 = Object.getPrototypeOf(myp5).constructor

let currentSound;
let fft;
//if you try to make this one variable, they will all move in unison, we dont want that.
let angles = [45, 45, 45, 45, 45]
let selectedPalette = 0
let selectedSpeed = 2
  
// Circle's radius
let radius = 100;
//stretches out the placements of the circles
const radiusMultiplier = [1, 1.5, 2,2.5,3]
const numOfCircles = 5
//if its 1, it will go right, -1 it will go left.
const directions = [-1, 1, -1, 1, -1]
let windowWidth = myp5.windowWidth
let windowheight = myp5.windowHeight


//color palette 
const colors = [
//Considering setting the ones thats not the base to be color templates based on the tempo of the song, ex: engergetic, slow.. Not sure. Feel free to play around with them -GS
  //Base - I ll fight over this one
  ['#ffbe0b','#fb5607','#ff006e','#8338ec','#3a86ff'],

  //Something random
  ['#0d3b66','#faf0ca','f4d35e','#ee964b','#f95738'],

  //Earthy somewhat
  ['#264653','#2a9d8f','#e9c46a','#f4a261','#e76f51'],

  //Not sold on this one
  ['#231942','#5e548e','#9f86c0','#be95c4','#e0b1cb'],

  //Cotton Candy
  ["#cdb4db","#ffc8dd",'#ffafcc', '#bde0fe', '#a2d2ff']
]

const topSpeeds = [
  //slowest
  [1.4, 0.6, 0.8, 1, 0.6],
  //slower
  [2, 0.8, 1.4, 1.4, 0.8],
  //normal - this is the default speed before the cycle
  [2.6, 1.0, 2, 1.8, 1.0],
  //faster
  [3.2, 1.2, 2.6, 2.4, 1.2],
  //fastest
  [3.8, 1.4, 3.2, 2.8, 1.4]
]


const getCurrentSpeed = () => {
  if (selectedSpeed === 0) return 'slowest'
  if (selectedSpeed === 1) return 'slower'
  if (selectedSpeed === 2) return 'normal'
  if (selectedSpeed === 3) return 'faster'
  if (selectedSpeed === 4) return 'fastest'
  // return 'normal'
}
 
const Visualizer = () => {
  const [audio, setAudio] = useState('')
  const [currentSpeed, setCurrentSpeed] = useState(getCurrentSpeed())

  // function that is passed to the sketch component as a prop
  const setup = (p, canvasParentRef) => {
    p.createCanvas(windowWidth, windowheight).parent(canvasParentRef)
    fft = new P5.FFT()
    p.frameRate(120)
  }

    //function that is passed to the sketch component as a prop
  const draw = (p) => {
    //sets the background color of canvas
    p.background("black")

    //moves canvas to center
    p.translate(p.width/2, p.height/2)
    
    // This is what catches the pitches
  fft.analyze();

  // Get the volumes of different frequency ranges
  const treble  = fft.getEnergy("treble");
  const lowMid = fft.getEnergy("lowMid")
  const mid     = fft.getEnergy("mid"); 
  const highMid = fft.getEnergy("highMid")
  const bass    = fft.getEnergy("bass");
  
  //for rotation speed of diamonds
  const trebleSpeed = p.map(treble, 0, 255, 0.3, topSpeeds[selectedSpeed][0])
  //second slowest
  const lowMidSpeed = p.map(lowMid, 0, 255, 0.3, topSpeeds[selectedSpeed][1])
  const midSpeed = p.map(mid, 0, 255, 0.3, topSpeeds[selectedSpeed][2])
  const highMidSpeed = p.map(highMid, 0, 255, 0.3, topSpeeds[selectedSpeed][3])
  //slowest
  const bassSpeed = p.map(bass, 0, 255, 0.3, topSpeeds[selectedSpeed][4])
  
  //array of speeds
  const speeds = [trebleSpeed, lowMidSpeed, midSpeed, highMidSpeed, bassSpeed]
  
  //takes the volume of the frequencies and sets them the size of a variable 
  const sizeTreble = p.map(treble, 0, 255, 15, 45)
  const sizeLowMid = p.map(lowMid , 0 , 255, 15, 60)
  const sizeMid = p.map(mid, 0, 255, 15, 45)
  const sizeHighMid = p.map(highMid , 0 , 255, 15, 45)
  const sizeBass = p.map(bass, 0, 255, 15, 60)

  //then we shove it in this array
  const sizes = [sizeTreble, sizeLowMid, sizeMid, sizeHighMid, sizeBass]

  //each diamond has a position based on x and y coordinates, and angle they are placed set at, and a size, color and speed that can vary.
    class Diamond {
      constructor(x, y, a, size, color, speed) {
        this.pos = p.createVector(x,y)
        this.angle = a
        this.color = color
        this.size = size
        this.speed = speed
      }
  
      draw() {
        p.push()
        //sets angle placed on circle, prevents other diamonds from being on top of each other
          p.rotate(this.angle)
        //moves to set position on circle, will be centered in canvas otherwise.
          p.translate(this.pos.x, this.pos.y)
          //current color
          p.fill(this.color)
          //sets the outline of diamonds to black
          p.stroke(0)
          //gives the black outline
          p.strokeWeight(1)
          //draws the diamond shape depending on the size passed when new instance was created.
          p.beginShape();
            p.vertex(0, this.size);
            p.vertex(this.size, 0);
            p.vertex(0, -this.size);
            p.vertex(-this.size, 0);
          p.endShape(p.CLOSE);
        p.pop()
      }
    }

  //sets the circle rings..that you cant see!
  for (let j = 1; j <= numOfCircles; j++){
    let current = j-1
  //once upon a time there was circles being drawn here

  //polar to cartesian coordinates, basically..this is where our diamond drawing will begin and how it moves around!
    const x = (radius * radiusMultiplier[current]) * p.cos(angles[current])
    const y = (radius * radiusMultiplier[current]) * p.sin(angles[current])

    //for every 2 degrees moved place a diamond 
    for (let a = 0; a < p.radians(12); a+=p.radians(2)) {
      //Makes diamonds instances 
      const diamond = new Diamond(x,y,a, sizes[current], p.color(colors[selectedPalette][current]), speeds[current], directions[current])
      //this is what draws the diamonds
      diamond.draw(a)
    }

  //if the diamonds of the current circle being drawn have a direction of one, go one way, else go the other way
  angles[j-1] += directions[current] === 1 ? p.radians(speeds[current]): p.radians(-speeds[current])
  }
}

  //sets the currentSound to the audio
  const preload = () => {
    currentSound = myp5.loadSound(audio)
  }
  
    //any time audio is changed, run preload
  useEffect(() => {
    //if there is a song playing, turn it off before we set the new song
    if(currentSound) {
      if(currentSound.isPlaying() === true) {
        currentSound.stop()
      }
    }
    preload()
  },[audio])

    const keyPresses = () => {
      // adds speed, press a 
      if(myp5.keyCode === 65) {
        //if you are at the max speed, chill out!
        if(selectedSpeed === 4) return;
        selectedSpeed++
        setCurrentSpeed(getCurrentSpeed())
      }

      //decreases speed, press s
      if(myp5.keyCode === 83) {
        //if you are at the bottom and its still too much...I suck at adjusting speed lol
        if(selectedSpeed === 0) return;
        selectedSpeed--
        setCurrentSpeed(getCurrentSpeed())
      }

    //Reverses direction on W key, at the moment
       if(myp5.keyCode === 87) {
        for (let i = 0; i < directions.length; i++) {
          directions[i] *= -1
        }    
       }
       
       // Cycles color palette by pressing enter key
      if (myp5.keyCode === 13) {   
        //if we are on the last palette
        if(selectedPalette === 4)  {
          //reset the cycle
          selectedPalette = 0;
          return;
        }          
          selectedPalette++
      }
      return false; 
    }

    //if the window was set one way, this will readjust the drawing when it is changed.
   const windowResized = () => {
    myp5.resizeCanvas(myp5.windowWidth, myp5.windowHeight);
  }

  //Pause / Play feature
  const mouseClicked = () => {
     if (currentSound.isPlaying()) {
       if(currentSound) {
        currentSound.pause()
       }
     }
        else {
          currentSound.play()  
       }
  }    

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
      <h1>{currentSpeed}</h1>
      <div>
        <Sketch setup={setup} draw={draw} preload={preload} mouseClicked={mouseClicked} windowResized={windowResized} keyPressed={keyPresses}/>
      </div>

      <div style={{display: 'flex', justifyContent:'space-around'}}>
        <input type="file" name="file" accept="audio/*" onChange={(event) => {
          setAudio(event.target.files[0])}
        }/>
        <button> Play </button>
      </div>
    </div>
    ) 
}

export default Visualizer