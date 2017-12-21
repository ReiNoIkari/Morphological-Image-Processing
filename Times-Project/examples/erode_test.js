
//1st window :original 

// let img0 = new T.Image('uint8',500,500);
// img0.setPixels(b_image2);
// let win0 = new T.Window('Original');
// let view0 = T.view(img0.getRaster());
// // Create the window content from the view
// win0.addView(view0);
// // Add the window to the DOM and display it
// win0.addToDOM('workspace');

let img0 = new T.Image('uint8',250,250);
img0.setPixels(b_250_250);
let win0 = new T.Window('Original');
let view0 = T.view(img0.getRaster());
//Create the window content from the view
win0.addView(view0);
//Add the window to the DOM and display it
win0.addToDOM('workspace');

// let img0 = new T.Image('uint8',446,446);
// img0.setPixels(b_image3);
// let win0 = new T.Window('Original');
// let view0 = T.view(img0.getRaster());
// // Create the window content from the view
// win0.addView(view0);
// // Add the window to the DOM and display it
// win0.addToDOM('workspace');


// let img4 = new T.Image('uint8',446,446);
// img4.setPixels(b_image3);


let img3 = new T.Image('uint8',3,3);
img3.setPixels(mask3by3Star);
let win3 = new T.Window('Structuring element');
let view3 = T.view(img3.getRaster());
//Create the window content from the view
win3.addView(view3);
//Add the window to the DOM and display it
win3.addToDOM('workspace');


// let img3 = new T.Image('uint8',45,41);
// img3.setPixels(struc_cross);
// let win3 = new T.Window('Structuring element');
// let view3 = T.view(img3.getRaster());
// //Create the window content from the view
// win3.addView(view3);
// //Add the window to the DOM and display it
// win3.addToDOM('workspace');

//3rd window :result 

let img1 = erode(img0,img3);
let win1 = new T.Window('Eroded');
let view1 = T.view(img1.getRaster());
// Create the window content from the view
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace');

let img7 = erode(erode(erode(erode(erode(img0,img3),img3),img3),img3),img3);
let win7 = new T.Window('Eroded 5 times');
let view7 = T.view(img1.getRaster());
// Create the window content from the view
win7.addView(view7);
// Add the window to the DOM and display it
win7.addToDOM('workspace');
