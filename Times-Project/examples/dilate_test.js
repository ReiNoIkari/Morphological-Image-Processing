
//1st window :original 

let img0 = new T.Image('uint8',250,250);
img0.setPixels(b_250_250);
let win0 = new T.Window('Original');
let view0 = T.view(img0.getRaster());
// Create the window content from the view
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');


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

//3nd window :result 

let img1 = dilate(img0,img3);
let win1 = new T.Window('Dilated');
let view1 = T.view(img1.getRaster());
// Create the window content from the view
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace');


let img5 = dilate(dilate(dilate(dilate(dilate(img0,img3),img3),img3),img3),img3);
let win5 = new T.Window('Dilated 5 times');
let view5 = T.view(img5.getRaster());
// Create the window content from the view
win5.addView(view5);
// Add the window to the DOM and display it
win5.addToDOM('workspace');

