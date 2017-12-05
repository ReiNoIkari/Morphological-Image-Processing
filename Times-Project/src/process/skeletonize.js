//Skeletonize
//
//algorithm (to be enhanced) :
// 1/ edge detection
// 2/ pixels to be removed ? (true if existing non-edge pixels)
// 3/ thinning (removing pixels around non-edge pixels)
//needed : edge detection, selecting pixels to be removed (must not select end-of-line pixels).
//			thinning method, based on the hit and miss algorithm?


const skeletonize = function (img,copy=true) {
	let output =  T.Raster.from(img,copy);
	return output;
};














/**
 * Display uint8 images
 */
let img0 = new T.Image('uint8',500,500);
img0.setPixels(b_image2);
let win0 = new T.Window('Skeletonize');
let view0 = T.view(img0.getRaster());
// Create the window content from the view
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');
// SKELETONIZE

let img1 = skeletonize(img0);

let win1 = new T.Window('output');
let view1 = T.view(img1.getRaster());
// Create the window content from the view
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace');
