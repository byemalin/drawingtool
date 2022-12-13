
var angle = 0.0;

let slider;

var spiral = true;
var waves = false;
var terrain = false;

let c = 0;



function setup() {
  //Create Canvas and Set BG Colour
  let c = createCanvas(1500, 900);
  background(color("#FFFFFF"));

  //Create Colour Pickers

  fillColorPicker = createColorPicker("#FFD25A");
  fillColorPicker.position(30, 200);
  strokeColorPicker = createColorPicker("#191919");
  strokeColorPicker.position(30, 280);

  //Create Buttons

  let activecolor = color(255, 103, 0);
  let passivecolor = color(239, 239, 239);

  saveBtn = createButton("Save Drawing");
  saveBtn.mousePressed(saveToFile);
  saveBtn.position(30, 360);
  saveBtn.style('background-color', passivecolor);

  clearBtn = createButton("Clear");
  clearBtn.mousePressed(clearFile);
  clearBtn.position(30, 440);
  clearBtn.style('background-color', red);

  bgBtn = createButton("BG");
  bgBtn.mousePressed(bgFile);
  bgBtn.position(30, 120);
  bgBtn.style('background-color', passivecolor);


  //Buttons for tool selection

  spiralBtn = createButton("Spiral");
  spiralBtn.mousePressed(spiralFile);
  spiralBtn.position(30, 600);
  spiralBtn.style('background-color', activecolor);

  wavesBtn = createButton("Waves");
  wavesBtn.mousePressed(wavesFile);
  wavesBtn.position(30, 680);
  wavesBtn.style('background-color', passivecolor);

  terrainBtn = createButton("Terrain");
  terrainBtn.mousePressed(terrainFile);
  terrainBtn.position(30, 760);
  terrainBtn.style('background-color', passivecolor);



  //Create Slider

  slider = createSlider(10, 90, 40, 20);
  slider.position(25, 50);
  slider.style('width', '80px');

  //perlin draw variable setup
  t = 0;
  c = 0;
}

function draw() {

  //console.log(c);

  let activecolor = color(255, 103, 0);
  let passivecolor = color(239, 239, 239);


  //Set active/passive colors for tool buttons 
  if (spiral == true) {
    spiralBtn.style('background-color', activecolor);

  } else {
    spiralBtn.style('background-color', passivecolor);
  }

  if (waves == true) {
    wavesBtn.style('background-color', activecolor);

  } else {
    wavesBtn.style('background-color', passivecolor);
  }

  if (terrain == true) {
    terrainBtn.style('background-color', activecolor);

  } else {
    terrainBtn.style('background-color', passivecolor);
  }

  //console.log(square);

  if (mouseIsPressed && spiral == true) {

    //set slider value to local variable
    let slider_val = slider.value();

    //move drawing starting point to mouse
    translate(mouseX, mouseY);
    rotate(angle); //rotate each loop of the draw function

    //set colours of drawn squares
    stroke(strokeColorPicker.color());
    fill(fillColorPicker.color());

    rect(-1 * slider_val, -1 * slider_val, slider_val * 2, slider_val * 2);
    angle += 0.1;

  }



  //draw function for the waves tool
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
  }

  //Draw function for the terrain tool

  if (terrain == true && mouseIsPressed == true) {

    noFill();
    stroke(strokeColorPicker.color());


    translate(mouseX - 750, mouseY - 450)
    var s = width * noise(c + 0.01);
    var u = height * noise(c - 0.01);
    translate(s, u)

    beginShape();


    for (var i = 0; i < 200; i++) {
      // make above and below value the sae to reset
      var ang = map(i, 0, 200, 0, TWO_PI);
      var rad = 600 * noise(i * 0.01, t * 0.005);
      var x = rad * cos(ang);
      var y = rad * sin(ang);

      if (keyIsPressed) {
        var r = 255 * noise(c + 10);
        var g = 255 * noise(c + 15);
        var b = 255 * noise(c + 20);
        stroke(r, g, b);
      }



      //stroke(0);
      curveVertex(x, y);
    }
    endShape(CLOSE);

    t += 1;
    c += 0.001

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
  if (spiral == true) {
    spiral = false;

  } else {
    spiral = true;
    waves = false;
    terrain = false;
  }
}

function wavesFile() {

  if (waves == true) {
    waves = false;

  } else {
    waves = true;
    spiral = false;
    terrain = false;
  }
}

function terrainFile() {

  if (terrain == true) {
    terrain = false;

  } else {
    terrain = true;
    spiral = false;
    waves = false;
  }
}
