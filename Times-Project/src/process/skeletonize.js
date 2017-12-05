//Skeletonize
//
//algorithm (to be enhanced) :
// 1/ edge detection
// 2/ pixels to be removed ? (true if existing non-edge pixels)
// 3/ thinning (removing pixels around non-edge pixels)
//needed : edge detection, selecting pixels to be removed (must not select end-of-line pixels).
//			thinning method, based on the hit and miss algorithm?

//Returning Raster or Image ?
const skeletonize = function (img,copy=true) {
	let output = img;
	let r_output = output.getRaster();
	for (let x=0;x<r_output.width;x++){
		for(let y=0;y<r_output.height;y++) {
			if (r_output.getPixel(x,y)!=255) {
				r_output.setPixel(x,y,255);
			}
		}
	}
	output.setRaster(r_output);
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
