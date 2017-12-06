//Skeletonize
//
//algorithm (to be enhanced) :
// 1/ edge detection
// 2/ pixels to be removed ? (true if existing non-edge pixels)
// 3/ thinning (removing pixels around non-edge pixels)
//needed : edge detection, selecting pixels to be removed (must not select end-of-line pixels).
//			thinning method, based on the hit and miss algorithm?

//takes a 8-bit binary raster ( 0/255) and converts it to a 0/1 raster
const convert_process = function(rast,undo=false,copy=true) {
	for (let x=0;x<rast.width;x++){
		for(let y=0;y<rast.height;y++) {
			if (undo == false) {
				if (rast.getPixel(x,y)==255) {
					rast.setPixel(x,y,1);
				}
			}
			else {
				if (rast.getPixel(x,y)==1) {
					rast.setPixel(x,y,255);
				}
				if (rast.getPixel(x,y)==2) {
					rast.setPixel(x,y,125);
				}
			}
		}
	}
	return rast;
}

//returns true if a foreground pixel (1) is surrounded by 4 foreground pixels
const is_interior = function(x,y,raster) {
	if (raster.getPixel(x,y) != 0){
		if (x-1 >= 0 && raster.getPixel(x-1,y) == 1 && x+1 <= raster.width && raster.getPixel(x+1,y) == 1 
			&& y-1 >= 0 && raster.getPixel(x,y-1) == 1 && y+1 <= raster.height && raster.getPixel(x,y+1) == 1 ) {
			return true
		}
	}
	return false
}

//takes a 0/1 T.Raster, returns a 0/1/2 edge raster copy (1 being edges)
const edge_detection = function(rast,copy=true) {
	let initial_raster = rast;
	let r_output = T.Raster.from(rast,copy);
	for (let x=0;x<initial_raster.width;x++){
		for(let y=0;y<initial_raster.height;y++) {
			if (is_interior(x,y,initial_raster)) {
				r_output.setPixel(x,y,2);
			}
		}
	}
	return r_output;
}

//skeletonize a binary image, returns a copy of the image skeletonized
const skeletonize = function (img,copy=true) {
	let temp = new T.Image('uint8',img.width,img.height);
	temp.setRaster(T.Raster.from(img.getRaster(),copy));
	//TO DO : LOOPING THE PROCESS UNTIL SKELETONIZED, THINNING, EDGE DETEC
	r_output = edge_detection(convert_process(temp.getRaster())); // converts into 0/1 -> then edge detect
	r_output = convert_process(r_output,true); // re processes into 0/255 ( temporary : in order to visualize, re processes "interior" pixels into grey (125))
	temp.setRaster(r_output);
	return temp;
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

//TODO : Figure why original image doesn't display normally
/*//test original image
let img2 = new T.Image('uint8',500,500);
img2.setRaster(img0.getRaster());
let win2 = new T.Window('test');
let view2 = T.view(img2.getRaster());
// Create the window content from the view
win1.addView(view2);
// Add the window to the DOM and display it
win1.addToDOM('workspace');*/