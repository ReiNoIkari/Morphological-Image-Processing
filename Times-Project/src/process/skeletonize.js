//Skeletonize
//
//algorithm (to be enhanced) :
// 1/ edge detection
// 2/ remove edge pixels ( if next to interior pixel )
// 3/ test end of thinning (else return to 1/)
//needed : 
//			thinning method, based on the hit and miss algorithm?

//takes a 8-bit binary raster ( 0/255) and converts it to a 0/1 raster
const convert_process = function(rast,undo=false,copy=true) {
	for(let y=0;y<=rast.height;y++) {
		for (let x=0;x<=rast.width;x++){
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

//returns true if a foreground pixel (=1) is surrounded by 4 foreground(=1) pixels
const is_interior = function(x,y,raster) {
	if (raster.getPixel(x,y) != 0){
		if (x-1 >= 0 && raster.getPixel(x-1,y) != 0 && (x+1) <= raster.width && raster.getPixel(x+1,y) != 0 
			&& y-1 >= 0 && raster.getPixel(x,y-1) != 0 && (y+1) <= raster.height && raster.getPixel(x,y+1) != 0 ) {		
			return true
		}
	}
	return false
};

//returns true if the x,y pixelis an exterior (=1) pixel next to an interior(=2) pixel (north, south ,east ,west)
const is_removable = function(x,y,raster) {
	//is the pixel exterior?
	if (raster.getPixel(x,y) == 1){
		//is the exterior pixel next to an interior pixel? 
		if ((x-1 >= 0 && raster.getPixel(x-1,y) == 2) || ((x+1) <= raster.width && raster.getPixel(x+1,y) == 2) 
			|| (y-1 >= 0 && raster.getPixel(x,y-1) == 2) || ((y+1) <= raster.height && raster.getPixel(x,y+1) == 2) ) {
			//the x,y pixel is an edge pixel, removable, not a skeleton pixel)
			return true;
		}
	}
	return false;

}

//takes a 0/1 T.Raster, returns a 0/1/2 edge raster copy (1 being edges)
const edge_removal = function(rast,copy=true) {
	let r_output = T.Raster.from(rast,copy);
	//edge detection (background = 0, edge = 1, interior =2)
	for(let y=0;y<=rast.height;y++) {
		for (let x=0;x<=rast.width;x++){
			if (is_interior(x,y,rast)) {
				r_output.setPixel(x,y,2);
			}
		}
	}

	//removing all edge pixel in contact with an interior pixel
	for(let y=0;y<=rast.height;y++) {
		for (let x=0;x<=rast.width;x++){
			if (is_removable(x,y,r_output)) {
				r_output.setPixel(x,y,0);
			}
		}
	}

	//turning back all non-background pixels to 1
	for(let y=0;y<=rast.height;y++) {
		for (let x=0;x<=rast.width;x++){
			if (r_output.getPixel(x,y) !=0) {
				r_output.setPixel(x,y,1);
			}
		}
	}
	if (rast.pixelData.length==r_output.pixelData.length && rast.pixelData.every((v,i)=> v === r_output.pixelData[i])){
		return r_output;
	}
	else {
		return edge_removal(r_output);
	}
};

//skeletonize a binary image, returns a copy of the image skeletonized
const skeletonize = function (img,copy=true) {
	let temp = new T.Image('uint8',img.width,img.height);
	temp.setRaster(T.Raster.from(img.getRaster(),copy));
	//TO DO : LOOPING THE PROCESS UNTIL SKELETONIZED, THINNING, EDGE DETEC
	let r_output = edge_removal(convert_process(temp.getRaster())); // converts into 0/1 -> then edge detect
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
let win1 = new T.Window('Skeletonize');
let view1 = T.view(img1.getRaster());
// Create the window content from the view
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace');

//New display code? examples/adaptativeTest.js
