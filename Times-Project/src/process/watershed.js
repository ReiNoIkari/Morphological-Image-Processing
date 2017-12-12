//Watershed
//

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
};

const distance_map = function(rast,copy=true) {
	return rast;
}
//watershed transform on a binary image, returns a copy of the segmented image
const watershed = function (img,copy=true) {
	let temp = new T.Image('uint8',img.width,img.height);
	temp.setRaster(T.Raster.from(img.getRaster(),copy));
	//TO DO : LOOPING THE PROCESS UNTIL SKELETONIZED, THINNING, EDGE DETEC
	r_output = distance_map(convert_process(temp.getRaster())); // converts into 0/1 -> then edge detect
	r_output = convert_process(r_output,true); // re processes into 0/255 ( temporary : in order to visualize, re processes "interior" pixels into grey (125))
	temp.setRaster(r_output);
	return temp;
};


/**
 * Display uint8 images
 */
let img0 = new T.Image('uint8',500,500);
img0.setPixels(b_image2);
let win0 = new T.Window('Original');
let view0 = T.view(img0.getRaster());
// Create the window content from the view
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');

// SKELETONIZE
let img1 = skeletonize(img0);
let win1 = new T.Window('Output');
let view1 = T.view(img1.getRaster());
// Create the window content from the view
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace');

//New display code? examples/adaptativeTest.js