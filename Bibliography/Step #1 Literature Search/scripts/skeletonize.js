//Skeletonize
//
//algorithm (to be enhanced) :
// 1/ edge detection
// 2/ pixels to be removed ? (true if existing non-edge pixels)
// 3/ thinning (removing pixels around non-edge pixels)
//needed : edge detection, selecting pixels to be removed (must not select end-of-line pixels).
//			thinning method, based on the hit and miss algorithm?























/**
 * Display uint8 images
 */
let img0 = new T.Image('uint8',360,288);
img0.setPixels(boats_pixels);
let win0 = new T.Window('Boats');
let view0 = T.view(img0.getRaster());
// Create the window content from the view
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');