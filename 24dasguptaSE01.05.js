//header comment

//declare variables
let colorPicker; //variable used to access the ColorPicker control
let clearButton; //variable used to access the Button control
let saveButton; //variable used to access the Button control
let shapeSelector; //variable used to access the dropdown Select control
let sizeSlider; //variable used to access the Slider control
let transSlider;
let sliderPercent; 
let imageSelector; //variable used to access a Select dropdown control for images
let controlsContainer; //this is an html section in the index.html file!
let controlsContainer2;
let controlsContainer3;
let sliderValue; //this is the value of the slider which sets the paintbrush size
let currentShape = "draw"; //variable to decide the shape of the paintbrush
let images = []; //collection of images that you can draw on
let currentImage; //the image selected to draw on
let selectedImage; //currently selected image
let currentColor;
let colorPicker2;
let colorPicker3;

//create an array of objects with two fields, file and description 
//#0.1 enter the following array code into *AI* to have it explain it to you
//#0.2 Find 5 images for your theme and load them into the assets folder
let imageFiles = [
  { file: 'flapper.jpeg', 
   description: 'Flapper Outfit' },
  {file: 'gown.webp',
  description: 'Gown Outfit'},
   { file: 'fur.png',
  description: 'Furry Dress Outfit' },
  {file: 'ruffle.png',
  description: 'Ruffle Dress Outfit'},
  ]; 
//preload images for asynchronous web
//#1.1 enter the following code into *AI* to explain it to you
function preload() {
  for (let file of imageFiles){
    images.push(loadImage(file.file)); //load each image
  }
} //end function preload()

//initialize variables and setup program
function setup() {
  currentColor = color(0,0,0,0);
  //update the title in the index.html file from Processing!
  let bannerDiv = select('#app-header');
  bannerDiv.html('Fashion Colorator'); //#2 Change to your themed title
  
  let canvas = createCanvas(windowWdith, windowHieght-200);
  let canvasContainer = select("#canvasContainer");
  canvas.parent("canvasContainer");
  
   controlsContainer = select("#controlsContainer"); //look in the index.html file
   controlsContainer2 = select("#controlsContainer2");
  controlsContainer3 = select("#controlsContainer3");
  background(255);

  //create a color picker
  colorPicker = createColorPicker("black"); //#3.1 Change the default color
  colorPicker.parent(controlsContainer);
  
  colorPicker2 = createColorPicker("darkgrey");
  colorPicker2.parent(controlsContainer);
  
  colorPicker3 = createColorPicker("lightgray");
  colorPicker3.parent(controlsContainer);
  
  
  colorPicker.mousePressed(() => {
    currentColor=colorPicker.color();
  } );
  
  colorPicker.input(() => {
    currentColor=colorPicker.color();
  } );
  
  //colorPicker 2
  colorPicker2.mousePressed(() => {
    currentColor=colorPicker2.color();
  } );
  
   colorPicker2.input(() => {
    currentColor=colorPicker2.color();
  } );
  
  // colorpicker 3
  colorPicker3.mousePressed(() => {
    currentColor=colorPicker3.color();
  } );
  
   colorPicker3.input(() => {
    currentColor=colorPicker3.color();
  } );
  

  
  //create a clear button
  clearButton = createButton("Clear").parent(controlsContainer);
  clearButton.mousePressed(clearCanvas); //assign a function
  
  saveButton = 
    createButton("save image").parent(controlsContainer3);
  saveButton.mousePressed(saveDrawing);

  //create a shape selector dropdown
  //*** createSelect() ***//
  shapeSelector = createSelect().parent(controlsContainer);
  //add the dropdown options!
  shapeSelector.option("draw");
  shapeSelector.option("circle");
  shapeSelector.option("square");
  shapeSelector.option("triangle");
  shapeSelector.option("diamond");
  shapeSelector.option("semicircle");

  //create a size slider
  sizeSlider = createSlider(1, 100, 5).parent(controlsContainer2);
  sizeSlider.style('4px');
  
  //create a paragraph for slider value display
  sliderValueDisplay = createSpan("size: " + sizeSlider.value()).parent(
    controlsContainer2
  );
  sliderValueDisplay.style("margin-left", "10px"); //add margin for spacing
  sliderValueDisplay.style("flex-shrink", "0"); //prevent the span from shrinking

  //*** getting value from slider to label ***//
  sizeSlider.input(() => {
    sliderValueDisplay.html("size: " + sizeSlider.value());
  });
   
transSlider = createSlider(1,255).parent(controlsContainer2);
  transSlider.style('4px');
  
  sliderPercentDisplay = createSpan("transparency: " + transSlider.value()).parent(controlsContainer2);
  
  sliderPercentDisplay.style("margin-top-right","10px");
  sliderPercentDisplay.style("flex-shrink","0");
  transSlider.input(() => {sliderPercentDisplay.html("transparency:" + transSlider.value());});

  //create an image selector dropdown
  imageSelector = createSelect().parent(controlsContainer3);
  //populate image selector (assuming you have an array of image names)
  //populate the selector with options using descriptions
  imageFiles.forEach((file, index) => {
    imageSelector.option(file.description, index.toString());
  });

  imageSelector.changed(onImageSelect); //event handler for selection

} //end function setup()

//use variables to have fun
function draw() {
  if (mouseIsPressed) {
    drawShape();
  }
  currentColor.setAlpha(transSlider.value());
} //end function draw()

//draw the selected shape
//*** drawShape() ***//
function drawShape() {
  let size = sizeSlider.value();
  //tint(transSlider.value());
  fill(color(currentColor));
  noStroke();
  print(transSlider.value());
  
  //*** switch ***// 
  switch (shapeSelector.value()) {
    case "draw":
      stroke(currentColor);
      strokeWeight(size);
      line(pmouseX, pmouseY, mouseX, mouseY);
      break;
    case "circle":
      ellipse(mouseX, mouseY, size, size);
      break;
    case "square":
      rect(mouseX, mouseY, size, size);
      break;
    case "triangle":
      triangle(
        mouseX, mouseY,
        mouseX + size, mouseY,
        mouseX + size / 2, mouseY - size
      );
      break;
    case "diamond":
      quad(
        mouseX, mouseY - size / 2,
        mouseX + size / 2, mouseY,
        mouseX, mouseY + size / 2,
        mouseX - size / 2, mouseY
      );
      break;
  }
} //end function drawShape()

//clear the canvas
function clearCanvas() {
  clear();
  background(255);
} //end function clearCanvas()

//function to handle image selection - this function is mapped to the control
function onImageSelect() {
  const selectedIndex = parseInt(imageSelector.value(), 10);
  selectedImage = images[selectedIndex];
  clearCanvas();
  //displaying the image at width, height below changes the image. 
  //build an algorithm to set the height or width in the resize function.
  image(selectedImage, 0, 0, width, height);
}//end function onImageSelect()

function saveDrawing(){
  save("Picture.png");
}
