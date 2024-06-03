var img;

// To retrieve the file, we used function preload()
function preload() {
img = loadImage("Heart.jpeg") // image file is stored in variable images
}

function setup () {
createCanvas (400,400);
background(0);
}

function draw() {
background(0);
img.resize(400,450); // it fits image to given screen
image(img, 0, 0); // position of the image
var v = map(mouseX, 0, width, 2, 20); // when mouse is moved from left to right, it gradually changes to clear image. when mouse is moved from right to left, it gradually changes to posterize filter
filter(POSTERIZE, v);
}
