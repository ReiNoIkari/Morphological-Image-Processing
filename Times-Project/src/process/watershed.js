//Watershed
//


//x,y= coordinates of processed point.
//x1,y1= coordinates of the neighbor point.
//rast=raster containing the pixelData.
//dist=score added to the neighbor depending on the window type (see distance_map)
const check = function(x,y,x1,y1,dist,rast){
    //background check
    //do not process if the pixel is background ( ==0 )
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
const distance_map = function(rast,window_type="CDA",copy=true) {
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

//Finds and returns the nearest max value of a x,y pixel in a grayscale raster
//This methods isn't properly working, especially when neighbor pixels have the same value (stopping since no max is strictly > than actual value)
const nearestMaxValue = function (rast,x,y) {
    //finding the max value between 8 neighbors to x,y
	maxValue=Math.max(rast.getPixel(x-1,y),rast.getPixel(x,y-1),rast.getPixel(x+1,y),rast.getPixel(x,y-1),
		rast.getPixel(x-1,y-1),rast.getPixel(x+1,y+1),rast.getPixel(x-1,y+1),rast.getPixel(x+1,y-1))
    for (i=-1;i<2;i++){
		for (j=-1;j<2;j++){
			//Boundary check
			if (x+i >=0 && y+j >= 0 && x+i <= rast.width && y+j <= rast.height){
				//if new max
			    if (rast.getPixel(x+i,y+j) == maxValue && rast.getPixel(x+i,y+j) > rast.getPixel(x,y)){
				//find max next to neighbor's neighbors
				return nearestMaxValue(rast,x+i,y+j);
				}
			}
		}
	}
	//return max value if x,y is max neighbor
    return rast.getPixel(x,y);
}

//takes a rast from a flooded grayscale image
//returns true if one of the 4 neighbors is from an other flood level)
const isFloodLimit = (rast,x,y,xy_value) => {
	return ((rast.getPixel(x-1,y) != xy_value && rast.getPixel(x-1,y) !=0) ||
		(rast.getPixel(x,y-1) != xy_value && rast.getPixel(x,y-1) !=0) ||
		(rast.getPixel(x+1,y) != xy_value && rast.getPixel(x+1,y) !=0) ||
		(rast.getPixel(x,y+1) != xy_value && rast.getPixel(x,y+1) !=0))
}

//takes a gray-level raster and returns a grayscale raster segmented
const segmentation = function(rast,copy=true) {
	let r_output = T.Raster.from(rast,copy);
	//flooding the items to the nearest max value
    for (let y=0;y<=rast.height;y++){
    	for(let x=0;x<=rast.width;x++) {
    		if (rast.getPixel(x,y) != 0) {
    			r_output.setPixel(x,y,nearestMaxValue(rast,x,y));
    		}
	    }
	}
	//cutting pixels in contact with multiple pools (different flood levels)
	//This loops doesn't test edge pixels ( cannot be between 2 flood levels since edge pixels = 0)
	//this part is mainly doing oversegmentation due to flooding method issues (see nearestMaxValue)
    for (let y=1;y<rast.height;y++){
    	for(let x=1;x<rast.width;x++) {
    		if (r_output.getPixel(x,y)!=0 && isFloodLimit(r_output,x,y,r_output.getPixel(x,y))){
    			r_output.setPixel(x,y,0);
    		}
	    }
	}
	//returning the raster back to binary raster (0/255 pixels)
    for (let y=1;y<rast.height;y++){
    	for(let x=1;x<rast.width;x++) {
    		if(r_output.getPixel(x,y) != 0) {
    			r_output.setPixel(x,y,255);
    		}
    		else {
    			r_output.setPixel(x,y,0);

    		}
	    }
	}
    return r_output;
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
