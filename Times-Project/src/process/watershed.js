//Watershed
//
//Distance map using chessboard method ( all neighbors weight 1 )

//processes the raster and returns the gray-level distance map of the raster
const distance_map = function(rast,copy=true) {
	let r_output = T.Raster.from(rast,copy);
	for (let x=0;x<=rast.width;x++){
		for(let y=0;y<=rast.height;y++) {
			;
			}
		}
	}

	return r_output;
}
//takes a gray-level raster and returns the 8-bit binary raster segmented
const segmentation = function(rast,copy=true) {
	return rast;
}

//watershed transform on a binary image, returns a copy of the segmented image
const watershed = function (img,copy=true) {
	let temp = new T.Image('uint8',img.width,img.height);
	temp.setRaster(T.Raster.from(img.getRaster(),copy));
	//distance map : using chessboard? multiple choices?
	//watershed segmentation : how to process ?
	r_output = segmentation(distance_map(temp.getRaster()));
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
let img1 = watershed(img0);
let win1 = new T.Window('Output');
let view1 = T.view(img1.getRaster());
// Create the window content from the view
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace');

//New display code? examples/adaptativeTest.js