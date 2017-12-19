//Watershed
//


//x,y= coordinates of processed point.
//x1,y1= coordinates of the neighbor point.
//rast=raster containing the pixelData.
//dist=score added to the neighbor depending on the window type (see distance_map)
const check = function(x,y,x1,y1,dist,rast){
    //background check
    //do not process if the pixel is background ( =0 )
    if (rast.getPixel(x,y)==0) {
	return;
    }
    //boundary check
    //If y1 or x1 is out of boundaries, the x,y pixel is considered background
    if (x1<0 || y1<0 || x1 > rast.width || y1 > rast.height) {
	rast.setPixel(x,y,0);
    }
    else {
	//let's determinate the distance score (d) of the neighbor :
	let d = (rast.getPixel(x1,y1)+dist);
	//is the processed pixel's score greater than his neighbor's score(according to the window_type) ?
	if (rast.getPixel(x,y) > d) {	
	    //console.log("Setting pixel "+x,y+" value :"+d);
	    //update current pixel's distance
	    rast.setPixel(x,y,d);
	}
    }
}

//processes the raster and returns the gray-level distance map of the raster
//this distance map algorithm is based on the Borgefors’ Chamfer distance algorithm (CDA)
//might be updated to the DRA if I have the time ( more accurate, little more process time)
//rast = raster of the image containing the pixelData
//window_type = the type of window to apply for the distance map ( soon : CDA 3x3, chessboard, city block)
const distance_map = function(rast,window_type,copy=true) {
    //todo : switch window_type
    let dxy=4;
    let dx=3;
    let dy=3;
    //forward scan
    for (let y=0;y<=rast.height;y++){
	for(let x=0;x<=rast.width;x++) {
	    check(x,y,x-1,y-1,dxy,rast); //checking top-left neighbor
	    check(x,y,x,y-1,dy,rast); //checking top neighbor
	    check(x,y,x+1,y-1,dxy,rast); //checking top-right neighbor
	    check(x,y,x-1,y,dx,rast); // checking left neighbor
	}
    }
    //backward scan
    for (let y=rast.height;y>=0;y--){
	for(let x=rast.width;x>=0;x--) {
	    check(x,y,x-1,y+1,dxy,rast); //checking bottom-left neighbor
	    check(x,y,x,y+1,dy,rast); //checking bottom neighbor
	    check(x,y,x+1,y+1,dxy,rast); //checking bottom-right neighbor
	    check(x,y,x+1,y,dx,rast); // checking right neighbor
	}
    }
    return rast;
}

//Finds and returns the nearest max value
const nearestMaxValue = function (rast,x,y,processed) {
    for (i=-1;i<2;i++){
	for (j=-1;j<2;j++){
	    ;
	}
    }
    return rast.getPixel(x,y);
}

//takes a gray-level raster and returns the 8-bit binary raster segmented
const segmentation = function(rast,copy=true) {
    for (let y=0;y<=rast.height;y++){
	for(let x=0;x<=rast.width;x++) {
	    rast.setPixel(x,y,nearestMaxValue(rast,x,y));	    	    
	    }
	}
    return rast;
}

//watershed transform on a binary image, returns a copy of the segmented image
const watershed = function (img,window_type="CDA",copy=true) {
    let temp = new T.Image('uint8',img.width,img.height);
    temp.setRaster(T.Raster.from(img.getRaster(),copy));
    //watershed segmentation : how to process ?
    let r_output = segmentation(distance_map(temp.getRaster(),window_type));
    temp.setRaster(r_output);
    return temp;
};


/**
 * Display uint8 images
 */
let img0 = new T.Image('uint8',446,446);
img0.setPixels(b_image3);
let win0 = new T.Window('Original');
let view0 = T.view(img0.getRaster());
// Create the window content from the view
win0.addView(view0);
// Add the window to the DOM and display it
win0.addToDOM('workspace');

// WATERSHED
let img1 = watershed(img0);
let win1 = new T.Window('Output');
let view1 = T.view(img1.getRaster());
// Create the window content from the view
win1.addView(view1);
// Add the window to the DOM and display it
win1.addToDOM('workspace');

//New display code? examples/adaptativeTest.js
