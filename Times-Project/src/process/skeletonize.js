//Skeletonize
//
//algorithm (to be enhanced) :
// 1/ edge detection
// 2/ pixels to be removed ? (true if existing non-edge pixels)
// 3/ thinning (removing pixels around non-edge pixels)
//needed : edge detection, selecting pixels to be removed (must not select end-of-line pixels).
//			thinning method, based on the hit and miss algorithm?


//takes a 8-bit binary img ( 0/255) returns a 0/1 image
const convert_process = function(img,undo=false,copy=true) {
	let output = img;
	let r_output = output.getRaster();
	for (let x=0;x<r_output.width;x++){
		for(let y=0;y<r_output.height;y++) {
			if (undo == false) {
				if (r_output.getPixel(x,y)==255) {
					r_output.setPixel(x,y,1);
				}
			}
			else {
				if (r_output.getPixel(x,y)!=0) {
					r_output.setPixel(x,y,255);
				}
			}
		}
	}
	output.setRaster(r_output);
	return output;
}

//takes a 0/1 T.image, returns a 0/1/2 edge image (1 being edges)
const edge_detection = function(img,copy=true) {
	let output = img;
	let r_output = output.getRaster();
	for (let x=0;x<r_output.width;x++){
		for(let y=0;y<r_output.height;y++) {
			//DO SOMETHING 
			;
		}
	}
	output.setRaster(r_output);
	return output;
}

//skeletonize a binary image, returns skeletonized binary image
const skeletonize = function (img,copy=true) {
	let output = img;
	let r_output = output.getRaster();
	//TO DO : LOOPING THE PROCESS UNTIL SKELETONIZED, THINNING, EDGE DETEC
	output = edge_detection(convert_process(output)); // converts into 0/1 -> then edge detect
	output = convert_process(output,true); // re processes into 0/255
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
