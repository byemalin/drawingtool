
var angle = 0.0;

let slider;

var spiral = true;
var waves = false;
var perlin2 = false;



function setup() {
  //Create Canvas and Set BG Colour
  let c = createCanvas(1500, 900);
  background(color("#FFFFFF"));

  //Create Colour Pickers

  fillColorPicker = createColorPicker("#FFD25A");
  fillColorPicker.position(30, 400);
  strokeColorPicker = createColorPicker("#191919");
  strokeColorPicker.position(30, 480);

  //Create Buttons

  let activecolor = color(255, 103, 0);
  let passivecolor = color(235, 235, 235, 50);

  saveBtn = createButton("Save Drawing");
  saveBtn.mousePressed(saveToFile);
  saveBtn.position(30, 560);
  saveBtn.style('background-color', passivecolor);

  clearBtn = createButton("Clear");
  clearBtn.mousePressed(clearFile);
  clearBtn.position(width + 150, 450);
  clearBtn.style('background-color', passivecolor);

  bgBtn = createButton("BG");
  bgBtn.mousePressed(bgFile);
  bgBtn.position(30, 320);
  bgBtn.style('background-color', passivecolor);


  //Buttons for tool selection

  spiralBtn = createButton("Spiral");
  spiralBtn.mousePressed(spiralFile);
  spiralBtn.position(30, 660);
  spiralBtn.style('background-color', activecolor);

  wavesBtn = createButton("Waves");
  wavesBtn.mousePressed(wavesFile);
  wavesBtn.position(30, 760);
  wavesBtn.style('background-color', passivecolor);


  //Create Slider

  slider = createSlider(10, 90, 40, 20);
  slider.position(25, 250);
  slider.style('width', '80px');

  //perlin draw variable setup
  t = 0;
}

function draw() {

  //console.log(square);

  if (mouseIsPressed && spiral == true) {

    //set slider value to local variable
    let slider_val = slider.value();

    //move drawing starting point to mouse
    translate(mouseX, mouseY);
    rotate(angle); //rotate each loop of the draw function

    //set colours of drawn squares
    fill(fillColorPicker.color());
    stroke(strokeColorPicker.color());
    rect(-1 * slider_val, -1 * slider_val, slider_val * 2, slider_val * 2);
    angle += 0.1;

  }



  //draw function for the perlin noise prototype
  if (mouseIsPressed && waves == true) {

    noFill();
    stroke(strokeColorPicker.color());

    translate(mouseX - 750, mouseY - 450)

    var x1 = width * noise(t + 15);
    var x2 = width * noise(t + 25);
    var x3 = width * noise(t + 35);
    var x4 = width * noise(t + 45);
    var y1 = height * noise(t + 55);
    var y2 = height * noise(t + 65);
    var y3 = height * noise(t + 75);
    var y4 = height * noise(t + 85);

    bezier(x1, y1, x2, y2, x3, y3, x4, y4);

    t += 0.005;

    //clear the background every 1000 frames using mod (%) operator
    // if (frameCount % 1000 == 0) {
    //   background(255)
    // }
  }

  if (spiral == "true") {
    console.log('Square is active');
    rect(40, 40, 50);
  }



}


function saveToFile() {
  saveCanvas('MyDrawingByemalin', 'png')
}

function clearFile() {
  clear()
}

function bgFile() {
  background(color(random(255), random(255), random(255)));
}

function spiralFile() {
  let activecolor = color(255, 103, 0);
  let passivecolor = color(235, 235, 235, 50);

  if (spiral == true) {
    spiral = false;
    spiralBtn.style('background-color', passivecolor);

  } else {
    spiral = true;
    wavesFile();
    spiralBtn.style('background-color', activecolor);
  }
}

function wavesFile() {
  let activecolor = color(255, 103, 0);
  let passivecolor = color(235, 235, 235, 50);

  if (waves == true) {
    waves = false;
    wavesBtn.style('background-color', passivecolor);

  } else {
    waves = true;
    spiralFile();
    wavesBtn.style('background-color', activecolor);
  }
}
